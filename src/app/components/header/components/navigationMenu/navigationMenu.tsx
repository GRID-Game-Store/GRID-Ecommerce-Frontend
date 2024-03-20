"use client";
import * as React from "react";
import { useState } from "react";

import getQueryClient from "@/app/reactQuery/get-query-client";
import Hydrate from "@/app/reactQuery/Hydrate";
import MenuIcon from "@mui/icons-material/Menu";
import { IconButton } from "@mui/material";
import Box from "@mui/material/Box";
import { dehydrate } from "@tanstack/react-query";

import Search from "../search";
import { Authentication } from "./authentication";
import Navigation from "./navigation";
import { NavigationMenuFade } from "./navigationMenuFade";

const NavigationMenuMobile = () => {
  const [isShowMenu, setShowMenu] = useState(false);
  return (
    <Box>
      <IconButton
        onClick={() => setShowMenu(true)}
        aria-label="menu"
        sx={{ color: "#fff", position: "absolute", right: "40px" }}
      >
        <MenuIcon sx={{ fontSize: "30px" }} />
      </IconButton>
      <NavigationMenuFade isShowMenu={isShowMenu} setShowMenu={setShowMenu} />
    </Box>
  );
};
const NavigationMenuDesktop = () => {
  const queryClient = getQueryClient();
  const dehydratedState = dehydrate(queryClient);

  return (
    <>
      <Navigation />
      <Hydrate state={dehydratedState}>
        <Search />
        <Authentication />
      </Hydrate>
    </>
  );
};

export { NavigationMenuDesktop, NavigationMenuMobile };
