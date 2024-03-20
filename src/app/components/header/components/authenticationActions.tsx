"use client";
import { signIn } from "next-auth/react";
import { Button, Stack, useMediaQuery } from "@mui/material";
import React from "react";

const Login: React.FC<IAuthenticationActionsProps> = () => {
  return (
    <Button onClick={() => signIn("keycloak")} sx={{ height: "37px" }}>
      Login
    </Button>
  );
};
interface IAuthenticationActionsProps {
  // eslint-disable-next-line no-unused-vars
  setShowMenu?: (state: boolean) => void;
}
const AuthenticationActions: React.FC<IAuthenticationActionsProps> = ({
  setShowMenu,
}) => {
  const matches = useMediaQuery("(min-width:1200px)");
  return (
    <Stack
      direction={"row"}
      spacing={"20px"}
      position={!matches ? "fixed" : undefined}
      bottom={!matches ? "50px" : undefined}
    >
      <Login setShowMenu={setShowMenu} />
    </Stack>
  );
};

export { AuthenticationActions };
