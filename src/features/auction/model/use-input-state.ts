import { useAuctionStore } from "@/shared/store/auctionStore";
import { useState } from "react";

export const useInputState = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const setItem = useAuctionStore((state) => state.setItem);

  const handleAddItem = () => {
    if (!title || !price) {
      return;
    }
    setItem({
      id: crypto.randomUUID(),
      title,
      price: Number(price) || 0,
    });
  };

  return {
    title,
    setTitle,
    price,
    setPrice,
    handleAddItem,
  };
};
