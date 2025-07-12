import { create } from "zustand";
import { devtools, persist, createJSONStorage } from "zustand/middleware";

type DonationStore = {
  webSocket_token: string | null;
  setToken: (token: string | null) => void;
};

export const useDonationStore = create<DonationStore>()(
  devtools(
    persist(
      (set) => ({
        webSocket_token: null,
        setToken: (token: string | null) => set({ webSocket_token: token }),
      }),
      {
        name: "donations-storage",
        storage: createJSONStorage(() => localStorage),
      }
    )
  )
);
