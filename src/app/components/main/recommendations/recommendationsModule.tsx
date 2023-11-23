"use client";

import { Box, Button, Chip, Container, Stack, Tab, Tabs, Typography } from "@mui/material";
import React, { ReactNode, useEffect, useState } from "react";
import { IRecommendationsProps, ResponseGameRandom } from "../types/Response";
import { Items } from "../../shared/Item/items";
import { getData } from "@/app/page";
import axios from "axios";




interface IListGames {
  data?: Array<ResponseGameRandom>
}
type Props = {
  children: ReactNode
}



const ListGames: React.FC<IListGames>  = ({data}) => {
  return <Box
  width={"500px"}
  height={"700px"}
  bgcolor={"#0a0a0adb"}
  overflow={"hidden"}
  pt={"20px"}
  borderRadius={"5px"}
>
  <Stack direction={"column"} spacing={"0"}>
    {data &&
      data.map((game) => {
        return <Items key={game.id} game={game} variant={"column"} />;
      })}
  </Stack>
</Box>
} 


const RecommendationsModule: React.FC<IRecommendationsProps> = ({
  data
}) => {
  const [value, setValue] = useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  useEffect(()=> { 
    axios("http://grid-backend:8082/api/v1/genres").then(res => {
      console.log(res)
    })
  })
  return (
    <Container sx={{ marginLeft: "100px", marginTop: "20px" }}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="tabs"
      >
        <Tab disableRipple sx={{ fontSize: "20px" }} label="New" />
        <Tab disableRipple sx={{ fontSize: "20px" }} label="Specials" />
        <Tab disableRipple sx={{ fontSize: "20px" }} label="Top Sellers" />
      </Tabs>
      <Container disableGutters sx={{display:"flex"}}>
        <ListGames data={data}/>
        <Items variant="preview" game={data[0]}/>
      </Container>
    </Container>
  );
};
export { RecommendationsModule };

{
  /* <Typography variant="h5" pb={"5px"} fontWeight={"600"}>
        {title}
      </Typography> */
}

{
  /* <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={"0"}
        sx={{ flexWrap: "wrap", maxWidth: "1000px" }}
      >
        {data &&
          data.map((game) => {
            return <Items key={game.id} game={game} />;
          })}
      </Stack> */
}
