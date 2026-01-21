import {
  getPlayerById,
  calculatePerformanceRating,
  Player
} from "../src/services/playerService";

describe("playerService", () => {
  describe("getPlayerById", () => {
    it("returns player when id exists", () => {
      const result = getPlayerById(1);
      expect(result).not.toBeNull();
      expect(result?.name).toBe("ShadowStrike");
    });

    it("returns null when id does not exist", () => {
      const result = getPlayerById(999);
      expect(result).toBeNull();
    });
  });

  describe("calculatePerformanceRating", () => {
    it("calculates rating for wins and losses", () => {
      const player: Player = {
        id: 10,
        name: "Test",
        wins: 2,
        losses: 2,
        totalScore: 100
      };

      const result = calculatePerformanceRating(player);

      expect(result.gamesPlayed).toBe(4);
      expect(result.rating).toBe(75);
    });

    it("returns 0 when no games played", () => {
      const player: Player = {
        id: 11,
        name: "Zero",
        wins: 0,
        losses: 0,
        totalScore: 0
      };

      const result = calculatePerformanceRating(player);

      expect(result.gamesPlayed).toBe(0);
      expect(result.rating).toBe(0);
    });

    it("handles only wins case", () => {
      const player: Player = {
        id: 12,
        name: "WinsOnly",
        wins: 5,
        losses: 0,
        totalScore: 500
      };

      const result = calculatePerformanceRating(player);

      expect(result.gamesPlayed).toBe(5);
      expect(result.rating).toBe(200);
    });

    it("rounds rating to two decimals", () => {
      const player: Player = {
        id: 13,
        name: "Round",
        wins: 1,
        losses: 3,
        totalScore: 1
      };

      const result = calculatePerformanceRating(player);

      expect(result.rating).toBe(Number(result.rating.toFixed(2)));
    });
  });
});
