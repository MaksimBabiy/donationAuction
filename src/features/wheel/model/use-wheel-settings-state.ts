import { useState } from "react";

export const useWheelSettingsState = () => {
  const [duration, setDuration] = useState<number>(4000);

  return {
    duration,
    setDuration,
  };
};
