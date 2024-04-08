"use client";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";
import { BookHeart, LogOut, ShoppingBasket, ShoppingCart } from "lucide-react";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
interface IAvatarProps {
  name: string;
}
interface IUserButtonsProps {
  push: AppRouterInstance["push"];
}

const UserButtons: React.FC<IUserButtonsProps> = ({push}) => {
  return (
    <Stack direction={"row"} spacing={1}>
      <Button onClick={() => push("/cart", {})}>
        <ShoppingCart size={20} />
      </Button>
      <Button onClick={() => push("/wishList", {})}>
        <BookHeart size={20} />
      </Button>
    </Stack>
  );
};

// TODO: RENAME COMPONENT
const Avatar: React.FC<IAvatarProps> = ({ name }) => {
  const { push } = useRouter();
  async function keycloakSessionLogOut() {
    try {
      await fetch("/api/auth/logout", { method: "GET" });
    } catch (err) {
      console.error(err);
    }
  }
  return (
    <Box
      mr={"20px"}
      mt={"10px"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <UserButtons push={push} />
      <Link
        href={"/profile"}
        style={{ color: "ffff", textDecorationColor: "#fff" }}
      >
        <Typography
          height={"max-content"}
          fontSize={"18px"}
          fontWeight={"700"}
          mr={"10px"}
          ml={"10px"}
          color="#ffff"
        >
          {name}
        </Typography>
      </Link>
      <Button
        onClick={() => {
          keycloakSessionLogOut().then(() => signOut({ callbackUrl: "/" }));
        }}
      >
        <LogOut size={20} />
      </Button>
    </Box>
  );
};

export default Avatar;
