import { Box, Stack, Typography } from "@mui/material";
import {
  AllGamesInAccountResponse,
  FullInfoUserResponse,
} from "../types/types";
import { getAccessToken } from "../utils/sessionTokenAccessor";
import { Balance } from "./components/balance";
import { Recommendations } from "../components/main/recommendations/recommendations";
import { ItemSmallRowForPlay } from "../components/shared/Item/variants/item";
import { Items } from "../components/shared/Item/items";

async function getAllInfoAboutUser(type: string) {
  const url = `${process.env.URL}users/${type}`;

  let access_token = await getAccessToken();

  const resp = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token,
    },
    cache: "no-store",
  });

  if (resp.ok) {
    const data = await resp.json();
    return data;
  }

  throw new Error("Failed to fetch data. Status: " + resp.status);
}

export default async function Profile() {
  const fullInfo: FullInfoUserResponse = await getAllInfoAboutUser("profile");
  const allGamesInAccount: AllGamesInAccountResponse =
  await getAllInfoAboutUser("games");

  return (
    <main
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        width: "100vw",
      }}
    >
      <Box
        mt={"130px"}
        width={"70%"}
        height={"150px"}
        borderRadius={"10px"}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Box>
          <Typography variant="h4">
            {fullInfo.givenName} {fullInfo.familyName}
          </Typography>
          <Typography variant="body1" fontStyle={"italic"}>
            {fullInfo.email}
          </Typography>
        </Box>
        <Balance balance={fullInfo.balance} />
      </Box>
      <Box display={"flex"}  mt={"20px"} alignItems={"center"} width={"70%"}>
        <Stack direction={"row"} sx={{ flexWrap: "wrap" }}> 
            {allGamesInAccount.map((game) => {
              return game.game && game.playtime && 
              <div key={game.game.id}>
                  <ItemSmallRowForPlay  game={game.game}  purchaseDate={game.purchaseDate} playtime={game.playtime.toString()}/>
              </div>
            })}
        </Stack>
        
      </Box>
    </main>
  );
}
