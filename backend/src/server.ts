import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
const PORT = 4000;

app.use(cors());

const EXTERNAL_BASE_URL =
  "https://wiremock.dev.eroninternational.com/api/movies/search";


app.get("/api/movies/search", async (req, res) => {
  const page = req.query.page || "1";

  try {
    const response = await fetch(`${EXTERNAL_BASE_URL}?page=${page}`);

    if (!response.ok) {
      return res
        .status(response.status)
        .json({ error: `Upstream error: ${response.status}` });
    }

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("Error fetching external API", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Backend listen on http://localhost:${PORT}`);
});
