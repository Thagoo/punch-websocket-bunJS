import { connectRedis } from "../lib/connectRedis";

const client = await connectRedis();

export function addWebsocketInstance(userId, ws) {
  return new Promise((resolve, reject) => {
    client.exists(userId, (err, exists) => {
      if (err) {
        reject(err);
        return;
      }

      if (exists) {
        reject(new Error("Key already exists"));
      } else {
        client.set(userId, ws, (err, reply) => {
          if (err) {
            reject(err);
          } else {
            resolve(reply);
          }
        });
      }
    });
  });
}

export async function getWebsocketInstance(userId) {
  const value = await client.get(userId);
  const res = JSON.parse(value);
  return res;
}
