import React from "react";
import Grid from "@mui/material/Grid";
import Image from "next/image";
import { Typography } from "@mui/material";
const Logo: React.FC = () => {
  return (
    <Grid container  display={"flex"} alignItems={"center"} width={"max-content"} >
      <Image src="/logo.svg" width={42} height={46} alt="logo" />
      <Typography variant="h3" fontSize={"30px"} paddingLeft={"10px"}>
        GRID
      </Typography>
    </Grid>
  );
};
export default Logo;
