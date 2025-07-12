import { getDonations } from "@/shared/api/queries";
import { useAuctionStore } from "@/shared/store/auctionStore";
import { useAuthStore } from "@/shared/store/authStore";
import { useQuery } from "@tanstack/react-query";

export const useAuctionState = () => {
  const token = useAuthStore((store) => store.token);
  const totalPrice = useAuctionStore((store) => store.totalPrice);

  if (!token) {
    throw new Error("Token is not available");
  }

  const { data, isPending } = useQuery({
    queryKey: ["donations"],
    queryFn: () => getDonations(token),
  });
  return {
    data,
    isPending,
    totalPrice,
  };
};
