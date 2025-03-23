const express = require("express");
const cors = require("cors");
const routes = require("./routes/index");

const app = express();
const PORT = 3000;

// Enable CORS for all routes
app.use(cors());

// Endpoint: /film-json
app.use("/", routes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
