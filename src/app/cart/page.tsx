import { Box, Container, Typography } from "@mui/material";
import { ListGames } from "../components/main/recommendations/recommendationsModule";
import { AllItemsInCartResponse } from "../types/types";
import { ActionsButtons } from "./components/actionsButton";
import { getAccessToken } from "../utils/sessionTokenAccessor";

async function getAllGamesInCart() {
  const url = `${process.env.URl}cart`;

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

export type Game = Array<{
  id?: number | undefined;
  title?: string | undefined;
  description?: string | undefined;
  price?: number | undefined;
  coverImageUrl?: string | undefined;
}>;
export default async function Home() {
  const allGamesInCart: AllItemsInCartResponse = await getAllGamesInCart();
  const allGamesInfoInCart: Game = [];
  const allCartsIds: number[] = [];
  allGamesInCart.cartItems?.map((item) => {
    item.cartId && allCartsIds.push(item.cartId);
    allGamesInfoInCart.push(item.game);
  });

  return (
    <main
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "120px",
        flexDirection: "column",
      }}
    >
      <Container sx={{ marginTop: "20px", width: "950px" }}>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Typography fontSize={"28px"} fontWeight={"600"}>
            SHOPPING CART
          </Typography>
          {allGamesInCart.totalCost && allGamesInCart.totalCost > 0 ? (
            <ActionsButtons
              cost={allGamesInCart.totalCost}
              mode="all"
              allGamesInfoInCart={allGamesInfoInCart}
              allCartsIds={allCartsIds}
            />
          ) : null}
        </Box>
      </Container>
      <ListGames
        data={allGamesInfoInCart}
        cartsIds={allCartsIds}
        width="900px"
        height="auto"
        isCart={true}
      />
    </main>
  );
}
