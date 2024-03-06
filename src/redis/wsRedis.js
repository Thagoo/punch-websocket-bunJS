import { connectRedis } from "../lib/connectRedis";

const client = {};

export async function addWebsocketInstance(userId, ws) {
  try {
    client[userId] = ws;
  } catch (err) {
    console.log(err);
  }
}

export async function getWebsocketInstance(recieverId) {
  const res = client[recieverId];
  return res;
}
