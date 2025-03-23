const { WebSocketServer } = require("ws");

let messages = [];

const initWebSocketServer = (server) => {
  const wss = new WebSocketServer({ server });

  wss.on("connection", (ws) => {
    console.log("New WebSocket connection established");

    // Send existing messages to newly connected client
    if (messages.length > 0) {
      ws.send(JSON.stringify(messages));
    }

    ws.on("message", (data) => {
      try {
        const message = JSON.parse(data.toString());
        messages.push(message);
        console.log("Received:", message);

        // Broadcast to all clients
        wss.clients.forEach((client) => {
          if (client.readyState === ws.OPEN) {
            client.send(JSON.stringify([message]));
          }
        });
      } catch (error) {
        console.error("Invalid WebSocket message:", error);
      }
    });

    ws.on("close", () => {
      console.log("WebSocket client disconnected");
    });
  });

  console.log("WebSocket server initialized");
};

module.exports = { initWebSocketServer };
