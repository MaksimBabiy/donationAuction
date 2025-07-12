import { useAuthStore } from "../store/authStore"

export const useIsAuthenticated = () => {
  const token = useAuthStore(store => store.token)

  if(!token) return false;
  return true
}