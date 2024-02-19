import { getServerSession } from "next-auth";

import { Box, Button, Chip, Container, Stack, Typography } from "@mui/material";

import { authOptions } from "../api/auth/[...nextauth]/route";
import { ListGames } from "../components/main/recommendations/recommendationsModule";
import { AllItemsInCartResponse } from "../types/types";
import { ActionsButtons } from "./components/actionsButton";
import { getAccessToken } from "../utils/sessionTokenAccessor";

const data = [
  {
    id: 71,
    title: "TEKKEN 8",
    description:
      "Get ready for the next chapter in the legendary fighting game franchise, TEKKEN 8.",
    price: 2023.65,
    coverImageUrl:
      "https://cdn.cloudflare.steamstatic.com/steam/apps/1778820/capsule_616x353.jpg?t=1692054815",
    genres: [
      {
        id: 1,
        name: "Action",
      },
    ],
  },
  {
    id: 93,
    title: "Salt and Sacrifice",
    description:
      "Join your fellow Marked Inquisitors in this online coop successor to award-winning 2016 Soulslike Salt and Sanctuary.",
    price: 256.5,
    coverImageUrl:
      "https://cdn.cloudflare.steamstatic.com/steam/apps/1437400/capsule_616x353.jpg?t=1692054815",
    genres: [
      {
        id: 9,
        name: "RPG",
      },
      {
        id: 1,
        name: "Action",
      },
    ],
  },
  {
    id: 130,
    title: "Kuroinu 2 Redux",
    description:
      "As the Nation faces invasion from the peoples it has pillaged for a century, one man defends it: Derek Rondo, the second coming of the Mercenary King Vult. He fights for his country, but plots to seize the throne for himself... A new visual novel betrayal epic begins from within!",
    price: 465.75,
    coverImageUrl:
      "https://cdn.cloudflare.steamstatic.com/steam/apps/2544760/capsule_616x353.jpg?t=1692054815",
    genres: [
      {
        id: 2,
        name: "Adventure",
      },
    ],
  },
  {
    id: 2,
    title: "Football Manager 2024",
    description:
      "Build a world-class team ready to dominate your rivals in football’s most prestigious competitions. Progress never stops when you’re pursuing footballing greatness.",
    price: 1213.65,
    coverImageUrl:
      "https://cdn.cloudflare.steamstatic.com/steam/apps/2252570/capsule_616x353.jpg?t=1692054815",
    genres: [
      {
        id: 5,
        name: "Strategy",
      },
      {
        id: 3,
        name: "Simulation",
      },
      {
        id: 4,
        name: "Sports",
      },
    ],
  },
  {
    id: 32,
    title: "Hans",
    description:
      "Hans is a physics-driven, parkour adventure. Ascend to the sky with our lonely watermelon hero. Navigate treacherous platforms, defy physics by slowing down time, try not to fall and chase the dream of reuniting with humanity. No saves. Bounce, fail, adapt, and bounce again.",
    price: 72.9,
    coverImageUrl:
      "https://cdn.cloudflare.steamstatic.com/steam/apps/2616420/capsule_616x353.jpg?t=1692054815",
    genres: [
      {
        id: 2,
        name: "Adventure",
      },
    ],
  },
];

async function getAllGamesInCart() {
  const url = `${process.env.URl}cart`;

  let access_token = await getAccessToken();

  const resp = await fetch(url, {
    cache: 'reload',
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token,
    },
  });

  if (resp.ok) {
    const data = await resp.json();
    console.log(data);
    console.log("------------");
    return data;
  }

  throw new Error("Failed to fetch data. Status: " + resp.status);
}

type Game = Array<{
  id?: number | undefined;
  title?: string | undefined;
  description?: string | undefined;
  price?: number | undefined;
  coverImageUrl?: string | undefined;
}>;
export default async function Home() {
  const allGamesInCart: AllItemsInCartResponse = await getAllGamesInCart();
  const allGamesInfoInCart: Game = [];
  allGamesInCart.cartItems?.map((item) => allGamesInfoInCart.push(item.game));

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
          <ActionsButtons cost={allGamesInCart.totalCost} mode="all" />
        </Box>
      </Container>
      <ListGames
        data={allGamesInfoInCart}
        width="900px"
        height="auto"
        isCart={true}
      />
    </main>
  );
}
