import { api } from "../query-client";

export const exchengeToken = async (code: string) => {
    const res = await api.post("/exchange-token", {code}, {withCredentials: true});
    return res.data;
}