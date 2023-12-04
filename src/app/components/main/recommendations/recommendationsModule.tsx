"use client";

import {
  Box,
  Button,
  Chip,
  Container,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import React, { ReactNode, useEffect, useState } from "react";
import {
  IRecommendationsProps,
  ResponseGameFullInfo,
  ResponseGameRandom,
} from "../types/Response";
import { Items } from "../../shared/Item/items";
import axios from "axios";

interface IListGames {
  data?: Array<ResponseGameRandom>;
  setActiveHover: (id: number) => void;
}

const ListGames: React.FC<IListGames> = ({ data, setActiveHover }) => {
  return (
    <Box
      width={"500px"}
      height={"650px"}
      bgcolor={"#0a0a0adb"}
      overflow={"hidden"}
      pt={"20px"}
      borderRadius={"5px"}
    >
      <Stack direction={"column"} spacing={"0"}>
        {data &&
          data.map((game : ResponseGameRandom) => {
            return (
              <Items
                key={game.id}
                game={game}
                variant={"column"}
                setActiveHover={() => setActiveHover(game.id)}
              />
            );
          })}
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

const RecommendationsModule: React.FC<IRecommendationsProps> = ({}) => {
  const [activeTab, setActiveTab] = useState(0);
  const [activeHover, setActiveHover] = useState(0);
  const [listGames, setListGames] = useState<Array<ResponseGameRandom>>();
  const [gameFullInfo, setGameFullInfo] = useState<ResponseGameFullInfo>();
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };
  //! migrations on react query
  useEffect(() => {
    axios(
      `${process.env.NEXT_PUBLIC_URL}games/offers?query=${tabs[activeTab].forReq}&qty=5`
    ).then((res) => {
      res.data[0] && setActiveHover(res.data[0].id)
      setListGames(res.data)
      });
  }, [setListGames, activeTab]);
  //! migrations on react query
  useEffect(() => {
    axios(`${process.env.NEXT_PUBLIC_URL}games/${activeHover}`).then((res) =>
      setGameFullInfo(res.data)
    );
  }, [activeHover]);
  
  return (
    <Container sx={{ marginLeft: "100px", marginTop: "20px" }}>
      <Tabs value={activeTab} onChange={handleChange} aria-label="tabs">
        <Tab disableRipple sx={{ fontSize: "20px" }} label={tabs[0].forUI} />
        <Tab disableRipple sx={{ fontSize: "20px" }} label={tabs[1].forUI} />
        <Tab disableRipple sx={{ fontSize: "20px" }} label={tabs[2].forUI}/>
      </Tabs>
      <Container disableGutters sx={{ display: "flex" }}>
        <ListGames data={listGames} setActiveHover={setActiveHover} />
        {gameFullInfo && <Items variant="preview" game={gameFullInfo} />}

        
      </Container>
    </Container>
  );
};
export { RecommendationsModule };
