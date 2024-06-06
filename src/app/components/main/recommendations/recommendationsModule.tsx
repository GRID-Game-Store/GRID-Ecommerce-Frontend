"use client";
import React, { useEffect, useState } from "react";
import { ErrorUILayer } from "@/app/error";
import { FullInfoResponse, RandomResponse } from "@/app/types/types";
import {
  Box,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";

import { Filters } from "../../shared/Filters/filters";
import { Items } from "../../shared/Item/items";
import { getGameFullInfo, getGamesOfferByTab } from "./api/getGames";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  useGetGamesBySortingQuery,
  useInfiniteScrollQuery,
} from "./api/query/query";
import { useSession } from "next-auth/react";
import { useQueryState } from "nuqs";
import {
  TitleFilterGroup,
  WrapperFilterGroup,
} from "../../shared/Filters/variants/filter";
import { useDebounce } from "use-debounce";

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
  const pathname = usePathname();
  const overflowY = scroll ? "scroll" : "";
  const heightForWrapper = data && data?.length <= 3 ? "max-content" : height;
  const page = pathname.split("/").at(-1)?.toLocaleLowerCase();
  return (
    <Box
      width={width}
      height={heightForWrapper}
      bgcolor={"#0a0a0adb"}
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
              message={`There is nothing in the ${page}`}
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
    forReq: "discount",
    forUI: "Specials",
  },
  {
    forReq: "sales",
    forUI: "Top Sellers",
  },
];

const RecommendationsModule: React.FC = () => {
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
          <Items variant="preview" game={fullInfo.game} />
        )}
      </Container>
    </Container>
  );
};

const Sorting = () => {
  const [sorting, setSorting] = useQueryState("sort", { shallow: false });

  const handleChange = (event: SelectChangeEvent) => {
    setSorting(event.target.value as string);
  };
  return (
    <WrapperFilterGroup>
      <TitleFilterGroup name={"Sort by"} />
      <FormControl
        sx={{ color: "white", mt: "20px", ml: "10px", mr: "10px" }}
        variant="standard"
      >
        <InputLabel id="demo-simple-select-label">Sort by</InputLabel>
        <Select
          MenuProps={{ disableScrollLock: true }} 
          sx={{ color: "white" }}
          value={sorting || ""} 
          label="Name"
          onChange={handleChange}
          
        >
          <MenuItem value={"discount,desc"}>Specials</MenuItem>
          <MenuItem value={"releaseDate,desc"}>Release date</MenuItem>
          <MenuItem value={"title,asc"}>Name</MenuItem>
          <MenuItem value={"price,desc"}>High price</MenuItem>
          <MenuItem value={"price,asc"}>Low price</MenuItem>
        </Select>
      </FormControl>
    </WrapperFilterGroup>
  );
};

const NotFoundGames = () => {
  return (
    <Box
      width={900}
      height={"100vh"}
      bgcolor={"#0a0a0adb"}
      pt={"20px"}
      borderRadius={"5px"}
      justifyContent={"center"}
      display={"flex"}
    >
      <Typography fontSize={"20px"} fontWeight={"600"}>
        NOT FOUND :(
      </Typography>
    </Box>
  );
};

const RecommendationsModuleForFilterAndSorting: React.FC = () => {
  const searchParams = useSearchParams();
  const { data: AllTags } = useGetGamesBySortingQuery("tags");
  const { data: AllDevelopers } = useGetGamesBySortingQuery("developers");
  const { data: AllPlatforms } = useGetGamesBySortingQuery("platforms");
  const { data: AllGenres } = useGetGamesBySortingQuery("genres");
  const [debouncedValue] = useDebounce(searchParams, 500);
  const { data, refetch, ref } = useInfiniteScrollQuery(debouncedValue);
  const [state, setState] = useQueryState("title", { shallow: false });
  

  const Lists = data?.pages.map((page, index) => {
    return (
      <Box sx={{ display: "flex", flexDirection: "column" }} key={index}>
        {page && <ListGames data={page.games} width="900px" height="auto" />}
        { !page && <NotFoundGames />}
      </Box>
    );
  });
  useEffect(() => {
    refetch();
  }, [debouncedValue.toString()]);

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
        <TextField
          value={state}
          onChange={(e) =>
            e.target.value ? setState(e.target.value) : setState(null)
          }
          sx={{ marginBottom: "20px" }}
          placeholder="Search game"
        />
        {Lists}
        <div style={{ width: "900px" }} ref={ref}></div>
      </Box>
      <Box>
        {data?.pages[0] && (
          <Filters
            maxPrice={data?.pages[0].maxPrice}
            variant="slider"
            refetch={refetch}
          />
        )}
        <Sorting />
        <Filters
          variant="checkbox"
          refetch={refetch}
          tags={AllTags}
          name="tags"
        />
        <Filters
          variant="checkbox"
          refetch={refetch}
          tags={AllGenres}
          name="genres"
        />
        <Filters
          variant="checkbox"
          refetch={refetch}
          tags={AllDevelopers}
          name="developers"
        />

        <Filters
          variant="checkbox"
          refetch={refetch}
          tags={AllPlatforms}
          name="platforms"
        />
      </Box>
    </Container>
  );
};
export { RecommendationsModule, RecommendationsModuleForFilterAndSorting };
