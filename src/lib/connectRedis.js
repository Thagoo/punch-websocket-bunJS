import { createClient } from "redis";

export const connectRedis = async () => {
  const client = createClient();
  await client.connect();
  client.on("error", () => console.log("Redis Client Connected"));
  client.on("error", (err) => console.log("Redis Client Error", err));
  return client;
};
