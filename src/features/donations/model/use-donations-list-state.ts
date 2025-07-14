import { createSocket } from "@/shared/api/websockets";
import { useDonationStore } from "@/shared/store/donationStore";
import { useEffect, useRef } from "react";

export const useDonationsListState = () => {
  const token = useDonationStore((store) => store.webSocket_token);
  const items = useDonationStore((store) => store.items);
  const socketRef = useRef<WebSocket>(null);

  useEffect(() => {
    if (!token) return;
    const ws = createSocket(token);
    socketRef.current = ws;

    return () => {
      ws.close();
    };
  }, [token]);

  return { items };
};
