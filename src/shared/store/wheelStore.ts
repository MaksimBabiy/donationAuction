import { create } from "zustand";
import { devtools, persist, createJSONStorage } from "zustand/middleware";
import type { AuctionItemType } from "../types";
import { getColor } from "../utils";

type WheelItem = AuctionItemType & {
  color: string;
};

type AuthStore = {
  items: WheelItem[] | null;
  setItems: (items: AuctionItemType[]) => void;
  wheelInterval: number;
  setWheelInterval: (interval: number) => void;
};

export const useWheelStore = create<AuthStore>()(
  devtools(
    persist(
      (set) => ({
        items: null,
        setItems: (items: AuctionItemType[]) =>
          set({ items: items.map((item) => ({ ...item, color: getColor() })) }),
        setWheelInterval: (interval: number) =>
          set({ wheelInterval: interval }),
        wheelInterval: 0,
      }),
      {
        name: "wheel-storage",
        storage: createJSONStorage(() => localStorage),
      }
    )
  )
);
