import { useWheelState } from "../model/use-wheel-state";
import WheelSettings from "./wheelSettings";

const NewWheel = () => {
  const { canvasRef, handleRotate } = useWheelState("new");
  return (
    <div className="flex justify-center items-center p-4">
      <canvas ref={canvasRef} />
      <WheelSettings handleRotate={handleRotate} />
    </div>
  );
};

export default NewWheel;
