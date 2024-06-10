"use client";
import {
  AllReviewsGameResponse,
  FullInfoResponse,
  MyReviewGameResponse,
} from "@/app/types/types";
import { Box, Typography, useMediaQuery } from "@mui/material";
import { Gallery } from "./galary";
import { Info } from "./info";
import { SysReq } from "./sysReq";
import getQueryClient from "@/app/reactQuery/get-query-client";
import { dehydrate } from "@tanstack/react-query";
import Hydrate from "@/app/reactQuery/Hydrate";
import React, { useEffect } from "react";
import { Reviews } from "./reviews";
import { e } from "nuqs/dist/serializer-RqlbYgUW";
import { useSetRecentGames } from "@/app/components/shared/recentGames/hooks/useSetRecentGames";

interface IWrapperGamePageProps {
  fullInfo: FullInfoResponse["game"];
  wishListCheck: boolean;
  myReview: MyReviewGameResponse;
  allReviews: AllReviewsGameResponse;
  ownedByCurrentUser?: boolean;
}
const WrapperGamePage: React.FC<IWrapperGamePageProps> = ({
  fullInfo,
  wishListCheck,
  myReview,
  allReviews,
  ownedByCurrentUser,
}) => {
  const matches = useMediaQuery("(min-width:1200px)");
  const alignItems = !matches ? "center" : undefined;
  const flexDirection = !matches ? "column" : "row";
  const queryClient = getQueryClient();
  const dehydratedState = dehydrate(queryClient);
  useSetRecentGames(fullInfo?.id);

  return (
    <Box display={"grid"} justifyContent={"center"} sx={{ gridGap: "40px" }}>
      <Box
        display={"flex"}
        flexDirection={flexDirection}
        justifyContent={"center"}
        alignItems={alignItems}
      >
        <Gallery gameMedia={fullInfo?.gameMedia} />
        <Hydrate state={dehydratedState}>
          <Info
            fullInfo={fullInfo}
            wishListCheck={wishListCheck}
            ownedByCurrentUser={ownedByCurrentUser}
          />
        </Hydrate>
      </Box>
      <Box display={"flex"} flexDirection={"row"} > 
        { fullInfo && fullInfo.description &&  <Box width={"700px"} ml={"20px"}>
          <Typography variant="h3">About game</Typography>
          <Typography variant="body1">
              {fullInfo.description}
          </Typography>
        </Box>}
        {fullInfo && fullInfo.systemRequirements && (
          <SysReq sysReq={fullInfo.systemRequirements} />
        )}
      </Box>
      <Reviews
        gameID={fullInfo?.id}
        ownedByCurrentUser={ownedByCurrentUser}
        myReview={myReview}
        allReviews={allReviews}
      />
    </Box>
  );
};

export { WrapperGamePage };
