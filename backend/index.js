const express = require("express");
const cors = require("cors");
const http = require("http");
const routes = require("./routes/index");
const { initWebSocketServer } = require("./websocket/websocketServer");

const app = express();
const PORT = 3000;

// Enable CORS for all routes
app.use(cors());

// Mount routes (e.g., /film-json)
app.use("/", routes);

// Create HTTP server
const server = http.createServer(app);

// Initialize WebSocket server on the same HTTP server
initWebSocketServer(server);

// Start both HTTP & WebSocket server
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
