import express from "express";
import {
  getAllPlayers,
  getPlayerById,
  calculatePerformanceRating
} from "./services/playerService";

const app = express();
app.use(express.json());

app.get("/api/v1/health", (req, res) => {
  return res.json({
    status: "OK",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    version: "1.0.0"
  });
});

app.get("/api/v1/players", (req, res) => {
  return res.json(getAllPlayers());
});

app.get("/api/v1/players/:id", (req, res) => {
  const id = Number(req.params.id);
  const player = getPlayerById(id);

  if (!player) {
    return res.status(404).json({ error: "Player not found" });
  }

  return res.json(player);
});

app.get("/api/v1/players/:id/rating", (req, res) => {
  const id = Number(req.params.id);
  const player = getPlayerById(id);

  if (!player) {
    return res.status(404).json({ error: "Player not found" });
  }

  return res.json(calculatePerformanceRating(player));
});

export default app;
