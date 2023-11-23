import { Container, Stack, Typography } from "@mui/material";
import React from "react";
import { IRecommendationsProps } from "../types/Response";
import { Items } from "../../shared/Item/items";

const Recommendations: React.FC<IRecommendationsProps> = ({ data, title }) => {
  return (
    <Container sx={{ marginLeft: "100px", marginTop: "20px" }}>
      <Typography variant="h5" pb={"5px"} fontWeight={"600"}>
        {title}
      </Typography>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={"0"}
        sx={{ flexWrap: "wrap", maxWidth: "1000px" }}
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
