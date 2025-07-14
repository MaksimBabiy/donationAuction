import { Button } from "@/shared/ui/button";
import { useDownloadState } from "../model/use-download-state";

const DownloadButton = () => {
  const { handleDownload } = useDownloadState();
  return (
    <Button
      type="button"
      variant={"default"}
      onClick={handleDownload}
      className="absolute bottom-4 right-4 cursor-pointer"
    >
      Download Data
    </Button>
  );
};

export default DownloadButton;
