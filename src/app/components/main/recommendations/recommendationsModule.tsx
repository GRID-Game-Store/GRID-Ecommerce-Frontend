"use client";
import {
  Box,
  Checkbox,
  Container,
  Divider,
  FormControlLabel,
  Slider,
  Stack,
  Tab,
  Tabs,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useState } from "react";

import { Items } from "../../shared/Item/items";
import { useQuery } from "@tanstack/react-query";
import { getGameFullInfo, getGamesOfferByTab } from "./api/getGames";
import { Filters } from "../../shared/Filters/filters";
import { FullInfoResponse, RandomResponse } from "@/app/types/types";

interface IListGames {
  data?: RandomResponse;
  setActiveHover: (id: number) => void;
  width?: string;
  height?: string;
}

const ListGames: React.FC<IListGames> = ({
  data,
  setActiveHover,
  width = "500px",
  height = "650px",
}) => {
  return (
    <Box
      width={width}
      height={height}
      bgcolor={"#0a0a0adb"}
      overflow={"hidden"}
      pt={"20px"}
      borderRadius={"5px"}
      sx={{ cursor: "pointer" }}
    >
      <Stack direction={"column"} spacing={"0"}>
        {data &&
          data.map((game: RandomResponse[0]) => {
            return (
                  <Items
                    key={game.id}
                    game={game}
                    variant={"column"}
                    setActiveHover={() => game.id && setActiveHover(game.id)}
                  />
            );
          })}
      </Stack>
    </Box>
  );
};

const ListGamesFilters: React.FC = () => {
  return (
    <Box
      width={"200px"}
      height={"250px"}
      bgcolor={"#0a0a0adb"}
      overflow={"hidden"}
      pt={"5px"}
      mb={"12px"}
      ml={"20px"}
      borderRadius={"5px"}
      display={"flex"}
      flexDirection={"column"}
    >
      <Typography pl={"12px"} fontSize={"20px"} fontWeight={"600"}>
        Narrow by Price
      </Typography>

      <Divider />
      <Box p={"20px"} pb={"10px"}>
        <Slider
          aria-label="Temperature"
          defaultValue={30}
          valueLabelDisplay="auto"
          step={10}
          marks
          min={10}
          max={110}
        />
        <Typography textAlign={"center"} fontSize={"20px"} fontWeight={"300"}>
          300
        </Typography>
      </Box>
      <Divider />
      <FormControlLabel
        sx={{ pl: "10px" }}
        control={<Checkbox sx={{ width: "50px", height: "50px" }} />}
        label="Special offers"
      />
      <FormControlLabel
        sx={{ pl: "10px" }}
        control={<Checkbox sx={{ width: "50px", height: "50px" }} />}
        label="Hide free to paly games"
      />
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

const RecommendationsModule: React.FC<IRecommendationsProps> = ({}) => {
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

const RecommendationsModuleForFilterAndSorting = ({}) => {
  const [activeTab, setActiveTab] = useState(0);
  const [activeHover, setActiveHover] = useState(1);

  const { data } = useQuery<RandomResponse, Error>({
    queryKey: ["tab", tabs[activeTab]],
    queryFn: () => getGamesOfferByTab(tabs[activeTab].forReq),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    staleTime: 120000,
  });

  useEffect(() => {
    data && data[0] && data[0].id && setActiveHover(data[0].id);
  }, [data]);

  return (
    <Container sx={{ marginTop: "20px", width: "1000px" }}>
      <Box sx={{ display: "flex", width: "1000px" }}>
        <ListGames
          data={data}
          width="700px"
          height="auto"
          setActiveHover={setActiveHover}
        />
        <Box>
          <Filters variant="slider" />
          <Filters variant="checkbox" />
        </Box>
      </Box>
    </Container>
  );
};

export { RecommendationsModule, RecommendationsModuleForFilterAndSorting };
