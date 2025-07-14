import axios from "axios";
import { useAuthStore } from "../store/authStore";
import { useDonationStore } from "../store/donationStore";

export const createSocket = (newToken: string): WebSocket => {
  const ws = new WebSocket(
    "wss://centrifugo.donationalerts.com/connection/websocket"
  );
  ws.onopen = () => {
    ws.send(
      JSON.stringify({
        params: {
          token: newToken,
        },
        id: 1,
      })
    );
  };
  ws.onmessage = async (event) => {
    const data = JSON.parse(event.data);

    if (data.id === 1 && data.result?.client) {
      const centrifugoClientId = data.result.client;

      // get channel token
      const response = await axios.post(
        "https://www.donationalerts.com/api/v1/centrifuge/subscribe",
        {
          channels: [`$alerts:donation_${1418624}`],
          client: centrifugoClientId,
        },
        {
          headers: {
            Authorization: `Bearer ${useAuthStore.getState().token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const connectionToken = response?.data?.channels[0]?.token;

      // subscribe to the channel
      ws.send(
        JSON.stringify({
          params: {
            channel: `$alerts:donation_${1418624}`,
            token: connectionToken,
          },
          method: 1,
          id: 2,
        })
      );
    } else if (data.result?.data?.data?.amount) {
      console.log(data.result.data.data);

      useDonationStore.getState().setItem({
        id: data.result.data.data.id,
        price: data.result.data.data.amount_in_user_currency,
        title: data.result.data.data.message,
        author: data.result.data.data.name,
      });
    }
  };

  ws.onerror = (err) => {
    console.error("WebSocket error:", err);
  };

  ws.onclose = () => {
    console.log("WebSocket closed");
  };

  return ws;
};
