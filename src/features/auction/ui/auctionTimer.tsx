import { formatTime } from "@/shared/utils";
import React from "react";
import { useTimerState } from "../model/use-timer-state";
import { Button } from "@/shared/ui/button";

const AuctionTimer: React.FC = () => {
  const {
    seconds,
    handleTimer,
    handleReset,
    handleMinus,
    handlePlus,
    isDisabled,
    status,
  } = useTimerState();
  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex flex-col items-center gap-4">
        <div className="inline-flex items-center gap-3 px-8 py-4 bg-gray-100 rounded-xl text-5xl font-mono text-primary font-bold shadow">
          <span>⏰</span>
          <span>{formatTime(seconds)}</span>
        </div>
        <div className="flex gap-2 mt-2 flex-wrap justify-center">
          <Button
            type="button"
            variant={"default"}
            disabled={isDisabled(60)}
            onClick={() => handleMinus(60)}
          >
            -1 мин
          </Button>

          <Button
            type="button"
            variant={"default"}
            onClick={() => handlePlus(60)}
          >
            +1 мин
          </Button>
          <Button type="button" onClick={() => handlePlus(300)}>
            +5 мин
          </Button>
          <Button
            type="button"
            onClick={() => handleMinus(300)}
            disabled={isDisabled(300)}
          >
            -5 мин
          </Button>

          <Button
            type="button"
            variant={"outline"}
            onClick={handleTimer}
            disabled={seconds === 0}
          >
            {status === "running"
              ? "Пауза"
              : status === "paused"
              ? "Продолжить"
              : "Запустить"}
          </Button>
          <Button type="button" variant="destructive" onClick={handleReset}>
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AuctionTimer;
