export interface Player {
  id: number;
  name: string;
  wins: number;
  losses: number;
  totalScore: number;
}

export interface PlayersResponse {
  count: number;
  players: Player[];
}

export interface RatingResponse {
  id: number;
  name: string;
  rating: number;
  gamesPlayed: number;
}

const players: Player[] = [
  { id: 1, name: "ShadowStrike", wins: 15, losses: 5, totalScore: 28500 },
  { id: 2, name: "NoobMaster", wins: 3, losses: 12, totalScore: 4200 },
  { id: 3, name: "ProGamer99", wins: 0, losses: 0, totalScore: 0 }
];

export const getAllPlayers = (): PlayersResponse => {
  return {
    count: players.length,
    players
  };
};

export const getPlayerById = (id: number): Player | null => {
  return players.find(p => p.id === id) ?? null;
};

export const calculatePerformanceRating = (player: Player): RatingResponse => {
  const totalGames = player.wins + player.losses;

  if (totalGames === 0) {
    return {
      id: player.id,
      name: player.name,
      rating: 0,
      gamesPlayed: 0
    };
  }

  const rating = Number(
    (
      (player.wins / totalGames) * 100 +
      player.totalScore / totalGames
    ).toFixed(2)
  );

  return {
    id: player.id,
    name: player.name,
    rating,
    gamesPlayed: totalGames
  };
};
