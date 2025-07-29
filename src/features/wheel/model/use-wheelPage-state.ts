import { useAuctionStore } from "@/shared/store/auctionStore";
import { useWheelStore } from "@/shared/store/wheelStore";
import { useEffect } from "react";

export const useWheelPageState = () => {
  const setWheelItems = useWheelStore((state) => state.setItems);
  const auctionItems = useAuctionStore((state) => state.items);
  const wheelItems = useWheelStore((state) => state.items);

  useEffect(() => {
    // if (wheelItems) return;
    if (auctionItems) setWheelItems(auctionItems);
  }, [auctionItems]);

  return {};
};
