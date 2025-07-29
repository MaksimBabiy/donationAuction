import { useWheelStore } from "@/shared/store/wheelStore";

export const useWheelItemsState = () => {
  const items = useWheelStore((store) => store.items);

  return { items };
};
