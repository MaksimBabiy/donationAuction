import type { AuctionItemType } from "@/shared/types";
import { Button } from "@/shared/ui/button";
import { useAuctionItemState } from "../model/use-auction-item-state";

const AuctionItem = (item: AuctionItemType) => {
  const { deleteItem, addedPrice, setAddedPrice, handleAddPrice } =
    useAuctionItemState();
  return (
    <li className="flex items-center justify-between bg-white rounded-lg shadow p-4 hover:bg-gray-50 transition w-full">
      <div className="flex items-center gap-4 w-2/3 min-w-0">
        <div className="min-w-fit px-2 flex items-center justify-center w-14 h-14 bg-gray-100 rounded text-primary font-bold text-lg shrink-0">
          {item.percent ? item.percent : 0}%
        </div>
        <span className="font-medium text-gray-900 text-base truncate">
          {item.title}
        </span>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-primary font-semibold text-lg">
          {item.price} ₴
        </span>

        <input
          type="number"
          value={addedPrice}
          onChange={(e) => setAddedPrice(Number(e.target.value))}
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary text-base max-w-[100px]"
        />
        <Button
          type="button"
          variant="default"
          title="Edit item"
          onClick={() => handleAddPrice(item, addedPrice)}
        >
          Add Price
        </Button>
        <Button
          type="button"
          variant="destructive"
          title="Удалить лот"
          onClick={() => deleteItem(item)}
        >
          Удалить
        </Button>
      </div>
    </li>
  );
};

export default AuctionItem;
