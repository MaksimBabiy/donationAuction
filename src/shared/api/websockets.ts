import axios from "axios";
import { useAuthStore } from "../store/authStore";

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

    console.log(data);

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
      console.log("New donation received:", data.result.data);
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
