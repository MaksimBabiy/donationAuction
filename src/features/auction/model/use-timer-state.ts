import { useTimerStore } from "@/shared/store/timerStore";
import { useEffect } from "react";
import { toast } from "sonner";
export const useTimerState = () => {
  const seconds = useTimerStore((store) => store.seconds);
  const setSeconds = useTimerStore((store) => store.setTimer);
  const status = useTimerStore((store) => store.status);
  const setStatus = useTimerStore((store) => store.setStatus);

  useEffect(() => {
    if (seconds === null || seconds <= 0) return;
    const interval = setInterval(() => {
      if (status === "running")
        setSeconds(useTimerStore.getState().seconds - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [seconds, setSeconds, status]);

  useEffect(() => {
    if (seconds === 0 && status === "running") {
      setStatus("idle");
      toast.success("Время вышло!");
    }
  }, [seconds, setStatus, status]);

  const handleTimer = () => {
    if (status === "running") {
      setStatus("paused");
    } else if (status === "paused") {
      setStatus("running");
    } else if (status === "idle") {
      setStatus("running");
      setSeconds(seconds);
    }
  };
  const handleReset = () => {
    setStatus("idle");
    setSeconds(0);
  };
  const handlePlus = (value: number) => {
    if (seconds === null) {
      setSeconds(value);
      return;
    }

    if (seconds <= 0) {
      setSeconds(value);
      return;
    }

    setSeconds(seconds + value);
  };
  const handleMinus = (value: number) => {
    if (seconds === null || seconds <= 0) {
      return;
    }
    if (seconds - value <= 0) return;
    setSeconds(seconds - value);
  };

  const isDisabled = (sec: number) => {
    return seconds === null || seconds - sec <= 0;
  };

  return {
    status,
    handleTimer,
    handleReset,
    handleMinus,
    handlePlus,
    isDisabled,
    seconds,
  };
};
