"use client";
import { Box, Typography } from "@mui/material";
import { ArrowUpLeftIcon, BotMessageSquare } from "lucide-react";
import React from "react";
import { IButtonCallAIProps } from "./types/ai";

const ButtonCallAI: React.FC<IButtonCallAIProps> = ({
  visible,
  setVisible,
  conversations,
}) => {

  const handleOpenClose = () => {
    visible && conversations && localStorage.setItem("conversations", JSON.stringify(conversations));
    setVisible(!visible);

  } 

  return (
    <Box
      onClick={() => handleOpenClose()}
      sx={{ cursor: "pointer" }}
      width={"330px"}
      height={"25px"}
      bgcolor={"#08ad2c"}
      borderRadius={"5px 5px 0 0"}
      p={"2px"}
      display={"flex"}
      flexDirection={"row"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <BotMessageSquare size={20} />
      <Typography ml={"5px"}>Support AI assistant</Typography>
      {!visible && (
        <ArrowUpLeftIcon
          size={20}
          style={{ marginLeft: "5px", position: "absolute", right: "10px" }}
        />
      )}
      {visible && (
        <ArrowUpLeftIcon
          size={20}
          style={{
            marginLeft: "5px",
            position: "absolute",
            right: "10px",
            transform: "rotate(180deg)",
          }}
        />
      )}
    </Box>
  );
};

export { ButtonCallAI };
