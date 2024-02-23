import { edenFetch } from "@elysiajs/eden";
import { addWebsocketInstance, getWebsocketInstance } from "../redis/wsRedis";

const fetch = edenFetch(process.env.CLIENT_URL);

export const setUserActive = (data) => {
  fetch(`/api/user/setActive`, {
    method: "post",
    body: data,
  });
};

export const joinUser = async (ws, data) => {
  const { userId } = data;

  if (!ws.data.userId) {
    ws.data.userId = userId;
    addWebsocketInstance(userId, ws);
  }
};

export const sendMessage = async (data) => {
  const websocket = await getWebsocketInstance(data.participants.recieverId);
  console.log(websocket);
  //websocket.send(data.message);
};
