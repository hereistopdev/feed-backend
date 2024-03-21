const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");

const dataRoutes = require("./src/routes/dataRoutes");
const { connectToDb } = require("./src/config/db");

const app = express();
const PORT = 4000;

app.use(express.json({ limit: "50mb" }));
app.use(bodyParser.json());
app.use(express.urlencoded({ limit: "50mb", extended: true }));
// Enable CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // Replace '*' with the appropriate origin in production
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

app.use("/data", dataRoutes);

app.post("/api/data", async (req, res) => {
  const url = req.body.url;
  console.log(url);
  try {
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching data:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

connectToDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
    process.exit(1);
  });
