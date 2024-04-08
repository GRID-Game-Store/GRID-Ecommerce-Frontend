import { TransactionGames, TransactionGamesDTO } from "../types/transactions";

const compareGameTitles = (transactionGames: TransactionGames) => {
  let gamesTitles: (string | undefined)[] = []
  transactionGames &&
    transactionGames.forEach((game: TransactionGamesDTO) => {
        game.games && gamesTitles.push(game.games.title);
    });

  return gamesTitles.join(", ");
};

export { compareGameTitles };

