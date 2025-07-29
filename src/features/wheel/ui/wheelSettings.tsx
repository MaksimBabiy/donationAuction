import { Button } from "@/shared/ui/button";
import { useWheelSettingsState } from "../model/use-wheel-settings-state";

const WheelSettings = ({
  handleRotate,
}: {
  handleRotate: (duration: number) => void;
}) => {
  const { duration, setDuration } = useWheelSettingsState();
  return (
    <div>
      <input
        type="number"
        placeholder="seconds"
        onChange={(e) => setDuration(Number(e.target.value) * 1000)}
      />
      <Button variant={"default"} onClick={() => handleRotate(duration)}>
        Spin
      </Button>
    </div>
  );
};

export default WheelSettings;
