
export const getGamesOfferByTab = async (tab: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL_CLIENT}games/offers?query=${tab}&qty=5`,
  );
  const game = res.json();
  return game;
};
export const getAllGamesBySorting = async (
  { pageParam = 0 },
  search: string,
) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL_CLIENT}games?page=${pageParam}&size=23&${search}`,
  );
  const game = res.json();
  return game;
};
export const getAllFilters = async (filterBy: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL_CLIENT}${filterBy}`);
  const game = res.json();
  return game;
};
export const getGameFullInfo = async (activeHover: number) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL_CLIENT}games/${activeHover}`);
  const game = res.json();
  return game;
};
