import axios from "axios";
import { useAuthStore } from "../store/authStore";
import { jwtDecode } from "jwt-decode";
let refreshPromise: Promise<string | null> | null = null;

export const refreshToken = async () => {
  const authStore = useAuthStore.getState();
  if (!authStore.token) return null;
  const exp = jwtDecode(authStore.token).exp;

  console.log("protected");
  if (exp && exp < Date.now() / 1000) {
    if (!refreshPromise) {
      refreshPromise = axios
        .post("/auth/refresh")
        .then((res) => {
          console.log(res);
          return res.data?.accessToken ?? null;
        })
        .then((newToken) => {
          if (newToken) {
            console.log(newToken);
            authStore.setToken(newToken);
            return newToken;
          } else {
            authStore.setToken("");
            return null;
          }
        })
        .finally(() => {
          refreshPromise = null;
        });
    }

    const newToken = await refreshPromise;

    if (newToken) {
      return newToken;
    } else {
      return null;
    }
  }

  return authStore.token;
};
