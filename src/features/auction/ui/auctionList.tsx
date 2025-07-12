import { useAuctionList } from "../model/use-auction-list-state";
import AuctionItem from "./auctionItem";

const AuctionList = () => {
  const { items } = useAuctionList();

  if (!items || items.length === 0) {
    return (
      <div className="flex items-center justify-center w-full h-full">
        <p className="text-gray-500">Нет доступных лотов</p>
      </div>
    );
  }
  return (
    <ul className="flex flex-col gap-3 w-full max-w-full">
      {items.map((item) => (
        <AuctionItem {...item} key={item.id} />
      ))}
    </ul>
  );
};

export default AuctionList;
