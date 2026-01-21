import express, { Express } from "express";
import { getPlayerStats } from "./services/playerService";
import { getAllPlayers } from "./services/playerService";


// Initialize Express application
const app: Express = express();

// health check
app.get("/api/v1/health", (_req, res) => {
    res.json({
        status: "OK",
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        version: "1.0.0",
    });
});

// player search by id
app.get("/api/v1/players/:id", (req, res) => {
    const id = Number(req.params.id);

    const player = getPlayerStats(id);

    if (!player) {
        res.status(404).send("Player not found");
        return;
    }

    res.send(player);
});

// all player with count

app.get("/api/v1/players", (req, res) => {
  const result = getAllPlayers();
  res.send(result);
});

export default app;