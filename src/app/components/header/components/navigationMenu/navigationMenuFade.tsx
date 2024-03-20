
import getQueryClient from "@/app/reactQuery/get-query-client";
import { Box, IconButton } from "@mui/material";
import { dehydrate } from "@tanstack/react-query";
import React, { useRef } from "react";
import { Transition } from "react-transition-group";
import Navigation from "./navigation";
import Hydrate from "@/app/reactQuery/Hydrate";
import Search from "../search";
import { AuthenticationActions } from "../authenticationActions";
import MenuIcon from "@mui/icons-material/Menu";
import Logo from "../logo/logo";
import { IFadeProps, IMenuItemsProps, IMenuProps } from "./types/navigations";

const MenuItems: React.FC<IMenuItemsProps> = ({ setShowMenu }) => {
  const queryClient = getQueryClient();
  const dehydratedState = dehydrate(queryClient);

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      p={"20px"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Logo isShowTitle={false} />
      <Box mt={"20px"}>
        <Navigation direction="column" />
      </Box>
      <Box mt={"20px"} mb={"20px"}>
        <Hydrate state={dehydratedState}>
          <Search />
        </Hydrate>
      </Box>
      <AuthenticationActions setShowMenu={setShowMenu} />
    </Box>
  );
};

const Menu: React.FC<IMenuProps> = ({ setShowMenu, style }) => {
  return (
    <Box
      style={style}
      position={"absolute"}
      width={"100vw"}
      height={"100vh"}
      bgcolor={"#000"}
      left={0}
    >
      <IconButton
        onClick={() => setShowMenu(false)}
        aria-label="menu"
        sx={{ color: "#fff", position: "absolute", right: "40px" }}
      >
        <MenuIcon sx={{ fontSize: "30px" }} />
      </IconButton>
      <MenuItems setShowMenu={setShowMenu} />
    </Box>
  );
};

const NavigationMenuFade: React.FC<IFadeProps> = ({
  isShowMenu,
  setShowMenu,
}) => {
  const nodeRef = useRef(null);
  return (
    <Transition nodeRef={nodeRef} in={isShowMenu} timeout={500}>
      {(state) => (
        <Menu
          setShowMenu={setShowMenu}
          style={
            {
              ...defaultStyle,
              ...transitionStyles[state as keyof typeof transitionStyles],
            } as React.CSSProperties
          }
        />
      )}
    </Transition>
  );
};

export { NavigationMenuFade };

const defaultStyle = {
  transition: `all ${300}ms ease-in-out`,
  opacity: 0,
};
const transitionStyles = {
  entering: { opacity: 1 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
  exited: {
    opacity: "0",
    width: "0",
    height: "0",
    justifyContent: "center",
    visibility: "hidden",
  },
};
