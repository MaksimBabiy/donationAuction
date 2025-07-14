import { create } from "zustand";
import { devtools, persist, createJSONStorage } from "zustand/middleware";
import type { AuctionItemType } from "../types";

type DonationStore = {
  webSocket_token: string | null;
  setToken: (token: string | null) => void;
  items: AuctionItemType[] | null;
  setItem: (items: AuctionItemType) => void;
  deleteItem: (item: AuctionItemType) => void;
};

export const useDonationStore = create<DonationStore>()(
  devtools(
    persist(
      (set) => ({
        webSocket_token: null,
        items: null,
        setToken: (token: string | null) => set({ webSocket_token: token }),
        setItem: (item: AuctionItemType) =>
          set((state) => ({
            items: state.items ? [...state.items, item] : [item],
          })),
        deleteItem: (item: AuctionItemType) =>
          set((state) => ({
            items: state.items && state.items.filter((c) => c.id !== item.id),
          })),
      }),
      {
        name: "donations-storage",
        storage: createJSONStorage(() => localStorage),
      }
    )
  )
);
