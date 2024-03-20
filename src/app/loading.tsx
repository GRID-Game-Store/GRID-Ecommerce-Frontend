"use client";

import { Box, Typography } from "@mui/material";

export default function Loading() {
  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      textAlign={"center"}
      height={"30vh"}
      flexDirection={"column"}
    >
      <Typography fontWeight={"600"} variant="h4">
        Loading...
      </Typography>
    </Box>
  );
}
