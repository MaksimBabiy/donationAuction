import { QueryClient } from "@tanstack/react-query";
import axios from "axios";

export const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:3001/api";
export const queryClient = new QueryClient();
export const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
})