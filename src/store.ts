import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { dataset, type GameKey } from "./data/dataset";

type StoreState = Record<GameKey, string[]>;
type StoreAction = {
  addItem: (id: string, key: GameKey) => void;
  removeItem: (id: string, key: GameKey) => void;
  reset: (key: GameKey) => void;
};

const initialState: StoreState = Object.keys(dataset).reduce((acc, key) => {
  acc[key as GameKey] = [];
  return acc;
}, {} as StoreState);

export const useStore = create<StoreState & StoreAction>()(
  persist(
    (set) => ({
      ...initialState,
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

