import { useEffect, useState, useCallback, useRef } from "react";
import { ref, onValue, set, off } from "firebase/database";
import { db } from "@/lib/firebase";
import { useStore } from "@/store";

export interface TickerInfo {
  id: string;
  name: string;
}

export function useMultiplayer(initialRoomId: string | undefined) {
  const [isConnected, setIsConnected] = useState(false);
  const [roomId, setRoomIdState] = useState<string | undefined>(initialRoomId);
  const [userName, setUserName] = useState<string>(() => sessionStorage.getItem("icebreaker-username") || "");
  const [tickers, setTickers] = useState<Record<string, Record<string, TickerInfo>>>({});
  
  const addItem = useStore((state) => state.addItem);
  const reset = useStore((state) => state.reset);
  
  const isRemoteAction = useRef(false);

  useEffect(() => {
    if (userName) {
      sessionStorage.setItem("icebreaker-username", userName);
    }
  }, [userName]);

  useEffect(() => {
    if (!initialRoomId && !roomId) {
      const newId = Math.random().toString(36).substring(2, 9);
      setRoomIdState(newId);
      
      // Update URL without refresh to reflect room ID for the creator
      const url = new URL(window.location.href);
      url.searchParams.set("room", newId);
      window.history.replaceState({}, "", url.toString());
    } else if (initialRoomId && initialRoomId !== roomId) {
      setRoomIdState(initialRoomId);
    }
  }, [initialRoomId, roomId]);

  useEffect(() => {
    if (!roomId) return;

    const roomRef = ref(db, `rooms/${roomId}`);
    setIsConnected(true);

    const unsubscribe = onValue(roomRef, (snapshot) => {
      const data = snapshot.val();
      if (data && !isRemoteAction.current) {
        isRemoteAction.current = true;
        
        // Sync items
        const remoteItems = data.items || {};
        Object.keys(remoteItems).forEach((key) => {
          const remoteIds = remoteItems[key] || [];
          const localIds = (useStore.getState() as any)[key] || [];
          
          if (JSON.stringify(remoteIds) !== JSON.stringify(localIds)) {
            reset(key as any);
            remoteIds.forEach((id: string) => addItem(id, key as any));
          }
        });

        // Sync tickers
        setTickers(data.tickers || {});
        
        isRemoteAction.current = false;
      }
    });

    return () => {
      off(roomRef);
      unsubscribe();
      setIsConnected(false);
    };
  }, [roomId, addItem, reset]);

  const syncAction = useCallback(async (action: "add" | "remove" | "reset", id: string, key: string) => {
    if (!roomId || isRemoteAction.current) return;

    if (action === "reset") {
      await set(ref(db, `rooms/${roomId}/items/${key}`), []);
      await set(ref(db, `rooms/${roomId}/tickers/${key}`), null);
      return;
    }

    const roomRef = ref(db, `rooms/${roomId}/items/${key}`);
    const currentState = (useStore.getState() as any)[key] || [];
    await set(roomRef, currentState);

    if (action === "add" && userName) {
      const tickerRef = ref(db, `rooms/${roomId}/tickers/${key}/${id}`);
      await set(tickerRef, { id: userName, name: userName });
    } else if (action === "remove") {
      const tickerRef = ref(db, `rooms/${roomId}/tickers/${key}/${id}`);
      await set(tickerRef, null);
    }
  }, [roomId, userName]);

  return { roomId, isConnected, syncAction, userName, setUserName, tickers };
}
