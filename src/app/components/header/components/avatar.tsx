"use client";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";
interface IAvatarProps {
  name: string;
}

const Avatar: React.FC<IAvatarProps> = ({ name }) => {
  const { push } = useRouter();
  async function keycloakSessionLogOut() {
    try {
      await fetch(`/api/auth/logout`, { method: "GET" });
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
      <Button onClick={() => {
          push("/cart", {});
        }}
       >
        CART
      </Button>
      <Link href={"/profile"} style={{ color: "ffff", textDecorationColor: "#fff" }}>
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
        Logout
      </Button>
    </Box>
  );
};

export default Avatar;
