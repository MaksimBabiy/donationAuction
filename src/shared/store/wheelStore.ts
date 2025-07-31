import { create } from "zustand";
import { devtools, persist, createJSONStorage } from "zustand/middleware";
import type { AuctionItemType } from "../types";
import { getColor } from "../utils";
import { getPercent } from "../utils/getPercent";

type WheelItem = AuctionItemType & {
  color: string;
};

type AuthStore = {
  items: WheelItem[] | null;
  setItems: (items: AuctionItemType[]) => void;
  wheelInterval: number;
  totalPrice: number;
  removeItem: (id: string) => void;
  setWheelInterval: (interval: number) => void;
  refinePercent: () => void;
  refineTotalPrice: () => void;
};

export const useWheelStore = create<AuthStore>()(
  devtools(
    persist(
      (set, get) => ({
        items: null,
        setItems: (items: AuctionItemType[]) =>
          set({ items: items.map((item) => ({ ...item, color: getColor() })) }),
        setWheelInterval: (interval: number) =>
          set({ wheelInterval: interval }),
        wheelInterval: 0,
        totalPrice: 0,
        removeItem: (id: string) => {
          set((state) => ({
            items: state.items && state.items.filter((item) => item.id !== id),
          }));
          get().refineTotalPrice();
          get().refinePercent();
        },
        refinePercent: () => {
          set((state) => ({
            items:
              state.items &&
              state.items.map((item) => ({
                ...item,
                percent: getPercent(state.totalPrice, item.price),
              })),
          }));
        },
        refineTotalPrice: () =>
          set((state) => ({
            totalPrice: state.items
              ? state.items.reduce((acc, item) => acc + (item.price || 0), 0)
              : 0,
          })),
      }),
      {
        name: "wheel-storage",
        storage: createJSONStorage(() => localStorage),
      }
    )
  )
);
