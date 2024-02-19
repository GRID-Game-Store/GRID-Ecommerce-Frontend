import { getServerSession } from "next-auth";

import { Box, Typography } from "@mui/material";

import { authOptions } from "../api/auth/[...nextauth]/route";
import { FullInfoUserResponse } from "../types/types";
import { getAccessToken } from "../utils/sessionTokenAccessor";

async function getAllInfoAboutUser() {
  const url = `${process.env.URl}users/profile`;

  let access_token = await getAccessToken();

  const resp = await fetch(url, {
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

export default async function Home() {
  const fullInfo: FullInfoUserResponse = await getAllInfoAboutUser();
  return (
    <main
      style={{ height: "100vh", display: "flex", justifyContent: "center" }}
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
        <Typography variant="h4">$ {fullInfo.balance}</Typography>
      </Box>
    </main>
  );
}
