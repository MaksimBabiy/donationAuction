import { useAuctionStore } from "@/shared/store/auctionStore";
import { useDonationStore } from "@/shared/store/donationStore";
import type { AuctionItemType } from "@/shared/types";

export const useDonationItemState = () => {
  const setItem = useAuctionStore((state) => state.setItem);
  const deleteItem = useDonationStore((state) => state.deleteItem);
  const handleAddItem = (item: AuctionItemType) => {
    setItem(item);
    deleteItem(item);
  };

  return {
    handleAddItem,
  };
};
