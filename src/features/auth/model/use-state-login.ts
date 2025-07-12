import { useAuthStore } from "@/shared/store/authStore";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, useSearchParams } from "react-router";
import { ROUTES } from "@/shared/model/routes";
import { exchengeToken } from "@/shared/api/mutations";

export const useStateLogin = () => {
    const link = `https://www.donationalerts.com/oauth/authorize?client_id=${import.meta.env.VITE_CLIENT_ID}&redirect_uri=${import.meta.env.VITE_REDIRECT_URI}&response_type=code&scope=${import.meta.env.VITE_SCOPE}`
    const [searchParams] = useSearchParams();
    const code = searchParams.get("code");
    const navigate = useNavigate();
    const setToken = useAuthStore((store) => store.setToken);
    const useMutate = useMutation({
        mutationFn: (code: string) => exchengeToken(code),
        onSuccess: (data) => {
          setToken(data.access_token);
          navigate(ROUTES.HOME);
        }
    })

  return {
    code,
    mutate: useMutate.mutate,
    isPending: useMutate.isPending,
    link
  }
} 