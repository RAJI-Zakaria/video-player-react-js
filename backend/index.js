const express = require("express");
const path = require("path");
const fs = require("fs");
const cors = require("cors");

const app = express();
const PORT = 3000;

// Enable CORS for all routes
app.use(cors());

// Endpoint: /film-json
app.get("/film-json", (req, res) => {
  const filePath = path.join(__dirname, "data.json");

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading data.json:", err);
      return res.status(500).json({ error: "Failed to load film data" });
    }

    try {
      const jsonData = JSON.parse(data);
      res.json(jsonData);
    } catch (parseError) {
      console.error("Invalid JSON format:", parseError);
      res.status(500).json({ error: "Invalid JSON format" });
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
