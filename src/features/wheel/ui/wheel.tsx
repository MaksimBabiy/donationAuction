import React from "react";

const Wheel = ({
  customRef,
}: {
  customRef: React.RefObject<HTMLCanvasElement | null>;
}) => {
  return (
    <div className="flex justify-center items-center p-4">
      <canvas ref={customRef} />
    </div>
  );
};

export default Wheel;
