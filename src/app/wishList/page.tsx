import { Box, Container, SxProps, Typography } from "@mui/material";
import { ListGames } from "../components/main/recommendations/recommendationsModule";
import { getAccessToken } from "../utils/sessionTokenAccessor";
import { CSSProperties } from "react";
import { WishlistGamesResponse } from "../types/types";

async function getAllGamesInCart() {
  const url = `${process.env.URL}wishlist`;

  let access_token = await getAccessToken();

  const resp = await fetch(url, {
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token,
    },
  });

  if (resp.ok) {
    const data = await resp.json();
    return data;
  }

  throw new Error("Failed to fetch data. Status: " + resp.status);
}
export default async function WishList() {
  const allGamesInCart: WishlistGamesResponse = await getAllGamesInCart();

  return (
    <main style={mainStyle}>
      <Container sx={{ marginTop: "20px", width: "950px" }}>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Typography fontSize={"28px"} fontWeight={"600"}>
            WISHLIST
          </Typography>
        </Box>
      </Container>
      <ListGames
        data={allGamesInCart}
        width="900px"
        height="auto"
        isCart={true}
      />
    </main>
  );
}

const mainStyle: CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginTop: "120px",
  flexDirection: "column",
};
