
"use client"
import { Container, Stack, Typography, useMediaQuery } from "@mui/material";
import React from "react";
import { IRecommendationsProps } from "../types/Response";
import { Items } from "../../shared/Item/items";

const Recommendations: React.FC<IRecommendationsProps> = ({ data, title }) => {
  const matches = useMediaQuery('(min-width:1200px)');
  const marginLeft = !matches ? "10px" : "100px"
  return (
    <Container sx={{ marginLeft: marginLeft, marginTop: "20px",  }} >
      <Typography variant="h5" pb={"5px"} fontWeight={"600"}>
        {title}
      </Typography>
      <Stack
        direction={"row"}
        spacing={"0"}
        sx={{ flexWrap: "wrap" }}
      >
        {data &&
          data.map((game) => {
            return <Items key={game.id} game={game}  />;
          })}
      </Stack>
    </Container>
  );
};
export { Recommendations };
