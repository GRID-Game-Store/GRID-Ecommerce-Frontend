import Stack from "@mui/material/Stack";
import { Typography } from "@mui/material";
import { NAVIGATION_POINT } from "../../../../constants/header";
import React from "react";

interface INavigationProps {
  direction?: "column" | "row";
}
const Navigation: React.FC<INavigationProps> = ({ direction = "row" }) => {
  const navigationPoints = NAVIGATION_POINT.map((point, i) => {
    return (
      <Typography key={i} sx={fontSize}>
        {point}
      </Typography>
    );
  });

  return (
    <Stack
      direction={direction}
      spacing={"5vw"}
      pl={"10px"}
      textAlign={"center"}
    >
      {navigationPoints}
    </Stack>
  );
};
export default Navigation;

const fontSize = { fontSize: "30px" };
