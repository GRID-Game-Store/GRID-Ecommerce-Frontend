import Stack from "@mui/material/Stack";
import { Typography } from "@mui/material";
import { NAVIGATION_POINT } from "../../../../constants/header";
import React, { CSSProperties } from "react";
import Link from "next/link";

interface INavigationProps {
  direction?: "column" | "row";
}
const Navigation: React.FC<INavigationProps> = ({ direction = "row" }) => {
  const navigationPoints = NAVIGATION_POINT.map((point, i) => {
    return (
      <Link key={i} style={fontSize} href={point.path}>
        <Typography sx={fontSize}>{point.name}</Typography>
      </Link>
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

const fontSize: CSSProperties = {
  fontSize: "30px",
  color: "#fff",
  textDecoration: "none",
};
