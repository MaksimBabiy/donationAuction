import { useAuctionStore } from "@/shared/store/auctionStore";

export const useAuctionList = () => {
  const items = useAuctionStore((store) => store.items);
  const handleAddItem = useAuctionStore((store) => store.setItem);

  return {
    items,
    handleAddItem,
  };
};
