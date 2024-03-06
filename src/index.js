import { Elysia } from "elysia";
import { joinUser, sendMessage, setUserActive } from "./controllers/chat";

const app = new Elysia();

app
  .ws("/chat", {
    open(ws) {
      console.log("Connection opened");
      const data = {
        type: "STATUS",
        connected: "true",
      };
      ws.send(data);
    },
    close(ws) {
      console.log("Connection closed");
      const data = {
        type: "STATUS",
        connected: "false",
      };
      ws.send(data);
    },
    message(ws, message) {
      switch (message.type) {
        case "JOIN": {
          setUserActive(message.data);
          joinUser(ws, message.data);
          break;
        }
        case "MESSAGE": {
          ws.send(message.data);
          sendMessage(message.data);
          break;
        }
        default: {
          console.error("message.type is not defined");
        }
      }
    },
  })
  .listen(8000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
