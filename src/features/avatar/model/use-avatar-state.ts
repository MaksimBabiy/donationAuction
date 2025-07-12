import { getProfileData } from "@/shared/api/queries";
import { useAuthStore } from "@/shared/store/authStore";
import { useDonationStore } from "@/shared/store/donationStore";
import type { ProfileData, ProfileDataDto } from "@/shared/types";
import { useQuery } from "@tanstack/react-query";

export const useAvatarState = () => {
  const token = useAuthStore((store) => store.token);
  const setWebsoketToken = useDonationStore((store) => store.setToken);
  if (!token) {
    throw new Error("Token is not available");
  }

  const { data } = useQuery<ProfileDataDto, Error, ProfileData>({
    queryKey: ["profile"],
    queryFn: () => getProfileData(token),
    select: (data) => data.data,
  });
  if (data) setWebsoketToken(data?.socket_connection_token);

  return {
    data,
  };
};
