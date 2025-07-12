import { createSocket } from "@/shared/api/websockets";
import { useDonationStore } from "@/shared/store/donationStore";
import { useEffect, useRef } from "react";

export const useDonationsListState = () => {
  const token = useDonationStore((s) => s.webSocket_token);
  const socketRef = useRef<any>(null);

  if (token) socketRef.current = createSocket(token);

  return { socket: socketRef.current };
};
