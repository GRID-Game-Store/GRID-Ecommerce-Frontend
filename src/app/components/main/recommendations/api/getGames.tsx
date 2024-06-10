import { useSession } from "next-auth/react";

export const getGamesOfferByTab = async (tab: string,) => {
 
  const res = await fetch(
    `api/games/offers?query=${tab}&qty=5`,
  );
  const game = await res.json();
  return game.data;
};
export const getAllGamesBySorting = async (
  { pageParam = 0 },
  search: string,
) => {
  const res = await fetch(
    `api/games?page=${pageParam}&size=23&${search}`,
  );
  const game = await res.json();
  return game.data ;
};
export const getAllFilters = async (filterBy: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_API}${filterBy}`);
  const game = res.json();
  return game;
};
export const getGameFullInfo = async (activeHover: number) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_API}games/${activeHover}`);
  const game = res.json();
  return game;
};
