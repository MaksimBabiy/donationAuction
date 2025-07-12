import { create } from "zustand";
import { devtools, persist, createJSONStorage } from "zustand/middleware";
import type { AuctionItemType } from "../types";
import { getPercent } from "../utils/getPercent";

type AuctionSotore = {
  items: AuctionItemType[] | null;
  setItem: (item: AuctionItemType) => void;
  totalPrice: number;
  deleteItem: (item: AuctionItemType) => void;
  editItem: (item: AuctionItemType, price: number) => void;
  refineTotalPrice: () => void;
  refinePercent: () => void;
};

export const useAuctionStore = create<AuctionSotore>()(
  devtools(
    persist(
      (set, get) => ({
        items: null,
        totalPrice: 0,
        setItem: (item: AuctionItemType) => {
          set((state) => ({
            items: state.items && [...state.items, item],
          }));
          get().refineTotalPrice();
          get().refinePercent();
        },
        deleteItem: (item) => {
          set((state) => ({
            items: state.items && state.items.filter((c) => c.id !== item.id),
          }));
          get().refineTotalPrice();
          get().refinePercent();
        },
        editItem: (item, price) => {
          set((state) => ({
            items:
              state.items &&
              state.items.map((c) =>
                c.id === item.id ? { ...c, price: c.price + price } : c
              ),
          }));
          get().refineTotalPrice();
          get().refinePercent();
        },
        refineTotalPrice: () =>
          set((state) => ({
            totalPrice: state.items
              ? state.items.reduce((acc, item) => acc + (item.price || 0), 0)
              : 0,
          })),
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
      }),

      {
        name: "auth-storage",
        storage: createJSONStorage(() => localStorage),
      }
    )
  )
);
