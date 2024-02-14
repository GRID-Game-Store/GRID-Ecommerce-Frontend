"use client";
import { signOut } from 'next-auth/react';

import {
  Box,
  Typography,
} from '@mui/material';

interface IAvatarProps {
  name: string;
}

const Avatar: React.FC<IAvatarProps> = ({ name }) => {
  async function keycloakSessionLogOut() {
    try {
      await fetch(`/api/auth/logout`, { method: "GET" });
    } catch (err) {
      console.error(err);
    }
  }
  return (
    <Box
      mr={"120px"}
      mt={"10px"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Typography height={"max-content"} fontSize={"18px"} fontWeight={"700"}>
        {name}
      </Typography>
      <button
        className="bg-blue-900 font-bold text-white py-1 px-2 rounded border border-gray-50"
        onClick={() => {
          keycloakSessionLogOut().then(() => signOut({ callbackUrl: "/" }));
        }}
      >
        Log out
      </button>
    </Box>
  );
};

export default Avatar;
