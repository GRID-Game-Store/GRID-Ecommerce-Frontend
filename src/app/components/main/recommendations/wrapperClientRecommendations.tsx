"use client";
import React from "react";
import { Recommendations } from "./recommendations";
import { useGetRecentGames } from "../../shared/recentGames/hooks/useGetRecentGames";
import { Box } from "@mui/material";

const WrapperClientRecommendations = () => {
  const { data: recentGames } = useGetRecentGames();
  return (
    <>
      {recentGames && recentGames.games && (
        <Box mt={"20px"} height={"180px"}>
          <Recommendations data={recentGames.games} title="Recently viewed" />
        </Box>
      )}
    </>
  );
};

export { WrapperClientRecommendations };
