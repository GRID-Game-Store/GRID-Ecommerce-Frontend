"use client";
import { Container, Stack, Typography, useMediaQuery } from "@mui/material";
import React from "react";
import { IRecommendationsProps } from "../types/Response";
import { Items } from "../../shared/Item/items";
import { AllGamesInAccountResponse, RandomResponse } from "@/app/types/types";

const Recommendations: React.FC<IRecommendationsProps> = ({ data, title }) => {
  const matches = useMediaQuery("(min-width:1200px)");
  const marginLeft = !matches ? "10px" : "100px";
  return (
    <Container sx={{ marginLeft: marginLeft, marginTop: "20px" }}>
      <Typography variant="h5" pb={"5px"} fontWeight={"600"}>
        {title}
      </Typography>
      <Stack direction={"row"} spacing={"0"} sx={{ flexWrap: "wrap" }}>
        {title === "My games"
          ? data.map((game: AllGamesInAccountResponse[0]) => {
              return game.game && <Items key={game.game.id} game={game.game} />;
            })
          : data.map((game: RandomResponse[0]) => {
              return <Items key={game.id} game={game} />;
            })}
      </Stack>
    </Container>
  );
};
export { Recommendations };
