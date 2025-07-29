import { useWheelState } from "../model/use-wheel-state";
import { useWheelPageState } from "../model/use-wheelPage-state";
import Wheel from "./wheel";
import WheelItems from "./wheelItems";
import WheelSettings from "./wheelSettings";

export const WheelPage = () => {
  useWheelPageState();
  const { canvasRef, handleRotate } = useWheelState();

  return (
    <div className="flex items-center justify-between">
      <WheelItems />
      <Wheel customRef={canvasRef} />
      <WheelSettings handleRotate={handleRotate} />
    </div>
  );
};
