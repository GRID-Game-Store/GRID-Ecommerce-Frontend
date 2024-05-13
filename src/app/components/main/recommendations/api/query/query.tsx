import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getAllFilters, getAllGamesBySorting } from "../getGames";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { AllFiltersByNameResponse } from "@/app/types/types";

const getNextPageParam = (lastPage: any) => {
  return lastPage &&  lastPage.currentPage < lastPage.totalPages // Here I'm assuming you have access to the total number of pages
    ? lastPage.currentPage + 1
    : undefined; // If there is not a next page, getNextPageParam will return undefined and the hasNextPage boolean will be set to 'false'
};

const useScrollView = () => {
  return useInView({
    /* Optional options */
    threshold: 0,
    rootMargin: "-200px 0px 0px 0px",
  });
};

export const useInfiniteScrollQuery = (searchParams: URLSearchParams) => {
  const { ref, inView } = useScrollView();
  const { data, fetchNextPage, hasNextPage, refetch } = useInfiniteQuery({
    queryKey: ["params"],
    queryFn: async ({ pageParam }) =>
      getAllGamesBySorting(
        { pageParam },
        decodeURI(searchParams.toString().replaceAll("%2C", ",")),
      ),
    getNextPageParam: (lastPage) => getNextPageParam(lastPage),
    initialPageParam: 0,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);
  return { ref, data, refetch };
};

export const useGetGamesBySortingQuery = (sortBy: string) => {
  return useQuery<AllFiltersByNameResponse, Error>({
    queryKey: [sortBy, null],
    queryFn: () => getAllFilters(sortBy),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    staleTime: 120000,
  });
};
