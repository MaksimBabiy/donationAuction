import { useAuctionStore } from "@/shared/store/auctionStore";
import type { AuctionItemType } from "@/shared/types";
import { useState } from "react";

export const useAuctionItemState = () => {
  const [addedPrice, setAddedPrice] = useState<number>(0);
  const deleteItem = useAuctionStore((state) => state.deleteItem);
  const editItem = useAuctionStore((state) => state.editItem);
  const refineTotalPrice = useAuctionStore((state) => state.refineTotalPrice);

  const handleAddPrice = (item: AuctionItemType, price: number) => {
    editItem(item, price);
    refineTotalPrice();
  };
  return {
    deleteItem,
    addedPrice,
    setAddedPrice,
    handleAddPrice,
  };
};
