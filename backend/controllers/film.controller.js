const fs = require("fs");
const path = require("path");

const getFilmInformation = (req, res) => {
  const filePath = path.join(__dirname, "../data.json");

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
};

module.exports = {
  getFilmInformation,
};
