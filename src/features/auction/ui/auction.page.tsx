import DonationList from "@/features/donations/ui/donationsList";
import { useAuctionState } from "../model/use-auction-state";
import AuctionInput from "./auctionInput";
import AuctionList from "./auctionList";
import AuctionTimer from "./auctionTimer";
import DownloadButton from "@/features/downloadActionData/ui/downloadButton";

const AuctionPage = () => {
  const { totalPrice } = useAuctionState();

  return (
    <div className="flex h-full p-10 gap-5 bg-gray-100">
      <div className="flex flex-col gap-5 flex-2">
        <AuctionInput />
        <AuctionList />
        <div>
          <span className="text-lg font-semibold text-gray-800">
            Общая стоимость:{" "}
            <span className="text-primary">{totalPrice} ₴</span>
          </span>
        </div>
      </div>
      <div className="flex-1 max-w-[400px] gap-5 flex flex-col">
        <AuctionTimer />
        <DonationList />
      </div>
      <DownloadButton />
    </div>
  );
};

export default AuctionPage;
