export const getGamesByTitle = async (value: string = "") => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL}games/search?title=${value}&qty=3`,
  );
  const game = res.json();
  return game;
};
