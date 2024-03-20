"use client";
import React, { useEffect, useState } from "react";
import { ErrorUILayer } from "@/app/error";
import { FullInfoResponse, RandomResponse } from "@/app/types/types";
import { Box, Container, Stack, Tab, Tabs, useMediaQuery } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

import { Filters } from "../../shared/Filters/filters";
import { Items } from "../../shared/Item/items";
import { getGameFullInfo, getGamesOfferByTab } from "./api/getGames";
import { useRouter, useSearchParams } from "next/navigation";
import {
  useGetGamesBySortingQuery,
  useInfiniteScrollQuery,
} from "./api/query/query";

interface IListGames {
  isCart?: boolean;
  data?: RandomResponse;
  // eslint-disable-next-line no-unused-vars
  setActiveHover?: (id: number) => void;
  width?: string;
  height?: string;
  cartsIds?: number[];
  scroll?: boolean;
}

export const ListGames: React.FC<IListGames> = ({
  data,
  setActiveHover,
  width = "500px",
  height = "650px",
  isCart = false,
  cartsIds,
  scroll = false,
}) => {
  const { push } = useRouter();

  const overflowY = scroll ? "scroll" : "";
  const heightForWrapper = data && data?.length <= 3 ? "max-content" : height;
  return (
    <Box
      width={width}
      height={heightForWrapper}
      bgcolor={"#0a0a0adb"}
      overflow={"hidden"}
      pt={"20px"}
      borderRadius={"5px"}
      sx={{ cursor: "pointer", overflowY: overflowY }}
    >
      <Stack direction={"column"} spacing={"0"}>
        {data &&
          data.map((game: RandomResponse[0], i: number) => {
            return (
              <Items
                key={game.id}
                cartId={cartsIds && cartsIds[i]}
                game={game}
                variant={"column"}
                isCart={isCart}
                setActiveHover={() =>
                  game.id && setActiveHover && setActiveHover(game.id)
                }
              />
            );
          })}

        {isCart && data?.length === 0 && (
          <Box
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            textAlign={"center"}
            height={"100vh"}
            flexDirection={"column"}
          >
            <ErrorUILayer
              message={"There is nothing in the cart"}
              buttonTitle={"Go to the store"}
              buttonCallback={() => push("/")}
            />
          </Box>
        )}
      </Stack>
    </Box>
  );
};

const tabs = [
  {
    forReq: "release date",
    forUI: "New",
  },
  {
    forReq: "sales",
    forUI: "Specials",
  },
  {
    forReq: "discount",
    forUI: "Top Sellers",
  },
];

interface IRecommendationsProps {
  data: RandomResponse;
}


const RecommendationsModule: React.FC<IRecommendationsProps> = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [activeHover, setActiveHover] = useState(1);
  const matches = useMediaQuery("(min-width:1200px)");
  const marginLeft = !matches ? "0px" : "100px";

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };
  const { data } = useQuery<RandomResponse, Error>({
    queryKey: ["tab", tabs[activeTab]],
    queryFn: () => getGamesOfferByTab(tabs[activeTab].forReq),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    staleTime: 120000,
  });

  const { data: fullInfo, isSuccess: isfullInfoSuccess } = useQuery<
    FullInfoResponse,
    Error
  >({
    queryKey: ["gamefullinfo", activeHover],
    queryFn: () => getGameFullInfo(activeHover),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    staleTime: 60000,
  });

  useEffect(() => {
    data && data[0] && data[0].id && setActiveHover(data[0].id);
  }, [data]);

  return (
    <Container sx={{ marginLeft: marginLeft, marginTop: "20px" }}>
      <Tabs value={activeTab} onChange={handleChange} aria-label="tabs">
        <Tab disableRipple sx={{ fontSize: "20px" }} label={tabs[0].forUI} />
        <Tab disableRipple sx={{ fontSize: "20px" }} label={tabs[1].forUI} />
        <Tab disableRipple sx={{ fontSize: "20px" }} label={tabs[2].forUI} />
      </Tabs>
      <Container disableGutters sx={{ display: "flex" }}>
        <ListGames data={data} setActiveHover={setActiveHover} />
        {isfullInfoSuccess && matches && (
          <Items variant="preview" game={fullInfo} />
        )}
      </Container>
    </Container>
  );
};

const RecommendationsModuleForFilterAndSorting: React.FC = () => {
  const searchParams = useSearchParams();
  const { data: AllTags } = useGetGamesBySortingQuery("tags");
  const { data: AllDevelopers } = useGetGamesBySortingQuery("developers");
  const { data: AllPlatforms } = useGetGamesBySortingQuery("platforms");
  const { data: AllGenres } = useGetGamesBySortingQuery("genres");
  const { data, refetch, ref } = useInfiniteScrollQuery(searchParams);
  const Lists = data?.pages.map((page, index) => {
    return (
      <Box sx={{ display: "flex", flexDirection: "column" }} key={index}>
        <ListGames data={page.games} width="900px" height="auto" />
      </Box>
    );
  });

  return (
    <Container
      sx={{
        marginTop: "20px",
        width: "1000px",
        flexDirection: "row",
        display: "flex",
      }}
    >
      <Box sx={{ display: "flex", width: "1000px", flexDirection: "column" }}>
        {Lists}
        <div ref={ref}></div>
      </Box>
      <Box>
        <Filters variant="slider" refetch={refetch} />
        <Filters
          variant="checkbox"
          refetch={refetch}
          tags={AllTags?.slice(0, 10)}
          name="tags"
        />
        <Filters
          variant="checkbox"
          refetch={refetch}
          tags={AllGenres?.slice(0, 4)}
          name="genres"
        />
        <Filters
          variant="checkbox"
          refetch={refetch}
          tags={AllDevelopers?.slice(0, 5)}
          name="developers"
        />

        <Filters
          variant="checkbox"
          refetch={refetch}
          tags={AllPlatforms?.slice(0, 10)}
          name="platforms"
        />
      </Box>
    </Container>
  );
};
export { RecommendationsModule, RecommendationsModuleForFilterAndSorting };
