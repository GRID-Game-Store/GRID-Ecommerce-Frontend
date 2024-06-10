export const getGamesByTitle = async (value: string = "") => {
  const res = await fetch(`/api/games/search?title=${value}&qty=3`);
  const game = await res.json();
  return game.data;
};

//    `${process.env.NEXT_PUBLIC_CLIENT_URL_BACKEND}games/search?title=${value}&qty=3`,
