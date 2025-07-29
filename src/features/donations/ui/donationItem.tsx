import type { AuctionItemType } from "@/shared/types";
import { useDonationItemState } from "../model/use-donation-item-state";
import { Button } from "@/shared/ui/button";

const DonationItem = (item: AuctionItemType) => {
  const { handleAddItem } = useDonationItemState();
  return (
    <li className="flex items-center justify-between bg-white rounded-lg shadow p-4 mb-2">
      <div className="flex flex-col">
        <span className="font-semibold text-primary">{item.author}</span>
        <span className="text-gray-800">{item.title}</span>
        <span className="text-green-600 font-bold">{item.price} ₴</span>
      </div>
      <div className="flex gap-2">
        <Button
          onClick={() => handleAddItem(item)}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
        >
          Добавить
        </Button>
        <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition">
          Удалить
        </button>
      </div>
    </li>
  );
};

export default DonationItem;
