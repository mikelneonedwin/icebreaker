import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type GameKey = keyof typeof import("virtual:db");
type StoreState = Record<GameKey, string[]>;
type Action = (id: string, key: GameKey) => void;
type StoreAction = Record<"addItem" | "removeItem", Action> & {
  reset: (key: GameKey) => void;
};

export const useStore = create<StoreState & StoreAction>()(
  persist(
    (set) => ({
      most_likely_to: [] as string[],
      two_truths_and_a_lie: [] as string[],
      never_have_i_ever: [] as string[],
      how_well_do_you_know_me: [] as string[],
      deep_cuts: [] as string[],
      would_you_rather: [] as string[],
      hot_takes: [] as string[],
      rapid_fire: [] as string[],
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
