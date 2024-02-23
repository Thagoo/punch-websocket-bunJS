import { Elysia } from "elysia";
import { joinUser, sendMessage, setUserActive } from "./controllers/chat";

const app = new Elysia();

app
  .ws("/chat", {
    open(ws) {
      console.log("Connection opened");
    },
    close(ws) {
      console.log("Connection closed");
    },
    message(ws, message) {
      switch (message.type) {
        case "JOIN": {
          setUserActive(message.data);
          joinUser(ws, message.data);
          break;
        }
        case "MESSAGE": {
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
