import { useEffect } from "react";

export const useSetRecentGames = (id?: number) => {
  useEffect(() => {
    const recent = window.localStorage.getItem("recentGamesID");
    const recentGames = recent ? recent.split(",") : [];
    id && recentGames.push(id.toString());
    const recentGamesString = [...new Set(recentGames)].join(",");
    if (recent !== recentGamesString && recentGames.length < 5) {
      window.localStorage.setItem("recentGamesID", recentGamesString);
    } else if (recentGames.length > 5) {
      const reversedRecentGames = recentGames.toReversed();
      reversedRecentGames.pop();
      const normalRecentGames = reversedRecentGames.toReversed();
      window.localStorage.setItem(
        "recentGamesID",
        [...new Set(normalRecentGames)].join(",")
      );
    } else {
      window.localStorage.setItem("recentGamesID", recentGamesString);
    }
  }, [id]);
};
