import { useQuery } from "@tanstack/react-query";
import { getRecentGames } from "../api/getRecentGames";


export const useGetRecentGames = () => {
    return useQuery<any, Error>({
        queryKey: ["recent", null],
        queryFn: () => getRecentGames(),
        refetchOnWindowFocus: false,
      });
}