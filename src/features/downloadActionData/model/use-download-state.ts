import { useAuctionStore } from "@/shared/store/auctionStore";

export const useDownloadState = () => {
  const data = useAuctionStore((state) => state.items);
  const handleDownload = () => {
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "data.json";
    link.click();

    URL.revokeObjectURL(url);
  };

  return {
    handleDownload,
  };
};
