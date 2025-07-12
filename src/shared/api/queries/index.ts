
import { api } from "../query-client";

export const getProfileData = async (token: string) => {
  
    const res = await api.get("/user-info", {
        headers: {
            "Content-Type": "application/json",
            "token": token,
        },
    });
    return res.data;
}

export const getDonations = async (token: string) => {
    const res = await api.get("/donations", {
        headers: {
            "Content-Type": "application/json",
            "token": token,
        },
    });
    return res.data;
}