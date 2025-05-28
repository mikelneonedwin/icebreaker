import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import * as exports from "./store-export";

type GameKey = keyof typeof import("virtual:db");
type StoreState = Record<GameKey, string[]>;
type Action = (id: string, key: GameKey) => void;
type StoreAction = Record<"addItem" | "removeItem", Action> & {
  reset: (key: GameKey) => void;
};

export const useStore = create<StoreState & StoreAction>()(
  persist(
    (set) => ({
      ...exports,
      addItem: (id, key) =>
        set((state) => ({
          [key]: [...state[key], id],
        })),
      removeItem: (id, key) =>
        set((state) => ({
          [key]: state[key].filter((value) => value !== id),
        })),
      reset: (key) =>
        set({
          [key]: [],
        }),
    }),
    {
      name: "icebreaker-store",
      version: 1,
      storage: createJSONStorage(() => localStorage),
    }
  )
);
