export const getRecentGames = async (
  ) => {
    const recentGames = window.localStorage.getItem("recentGamesID");
    
    
    const res = await fetch(
      `/api/games?page=0&size=5&id=${recentGames}`,
    );
    const game = await res.json();
    return game.data;
  };