import { Box, Button, IconButton, SxProps, TextField, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { SVGLogo } from "../header/components/logo/logo";
import { RefreshCcw, User2 } from "lucide-react";
import { useGetResponseFromGemini } from "./api/query";
import { IAIChatProps, IConversations, IMessageItemProps } from "./types/ai";
import useConversations from "./hooks/useConversations";
import Markdown from "react-markdown";

const MessageItem: React.FC<IMessageItemProps> = ({ isBot, content }) => {
  return (
    <Box
      display={"flex"}
      flexDirection={"row"}
      gap={"10px"}
      pt={"5px"}
      ml={"10px"}
      alignItems={"start"}
    >
      {isBot && <SVGLogo width={25} height={35} />}
      {!isBot && <User2 width={25} height={35} />}
      <Box sx={styleText}>
        {" "}
        <Markdown>{decodeURIComponent(content)}</Markdown>
      </Box>
    </Box>
  );
};

const AIChat: React.FC<IAIChatProps> = ({
  refetch,
  message,
  setMessage,
  conversations,
  setConversations,
  isLoading,
  isFetching,
}) => {
  const handleSendMessage = () => {
    refetch();
    message &&
      setConversations([
        ...conversations,
        {
          isBot: false,
          content: encodeURIComponent(message),
        },
      ]);
    setMessage("");
  };



  return (
    <Box width={"330px"} height={"430px"} sx={styleWrapperChat}>
      <Box>
        <Box display={"flex"} flexDirection={"row"} alignItems={"flex-start"} justifyContent={"center"}>
        <Typography sx={styleHeading}>GRID AI</Typography>
        <IconButton onClick={() => setConversations([])} sx={{marginTop: "14px"}} > <RefreshCcw color="#fff" /> </IconButton>
        </Box>
        <MessageItem
          isBot={true}
          content={
            "Meet  GRID Bot, your personal gaming assistant in the GRID store."
          }
        />
        {conversations.map((message, index) => (
          <MessageItem
            key={index}
            isBot={message.isBot}
            content={message.content}
          />
        ))}
      </Box>
      <Box
        display={"flex"}
        flexDirection={"row"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <TextField
          sx={styleInput}
          placeholder="Enter your question"
          variant="outlined"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              !isLoading && !isFetching && handleSendMessage();
            }
          }}
        />
        <Button
          disabled={isLoading || isFetching}
          onClick={() => handleSendMessage()}
          sx={styleSendButton}
        >
          {isLoading || isFetching ? "Loading..." : "Send"}
        </Button>
      </Box>
    </Box>
  );
};

export { AIChat };

const styleWrapperChat: SxProps = {
  overflowY: "scroll",
  overflowX: "hidden",
  backgroundColor: "#000",
  position: "absolute",
  bottom: "27px",
  right: "0px",
  borderRadius: "5px",
  border: "1px solid #459f59",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexDirection: "column",
  zIndex: "99",
};

const styleHeading: SxProps = {
  color: "#fff",
  fontSize: "20px",
  fontWeight: "600",
  textAlign: "center",
  mt: "20px",
};

const styleText: SxProps = {
  fontFamily: "Ropa Sans",
  width: "260px",
  "& a": {
    color: "#fff",
    textDecoration: "underline",
  },
  color: "#fff",
  fontSize: "14px",
  fontWeight: "400",
  textAlign: "start",
  ml: "10px",
  mt: "10px",
};

const styleInput: SxProps = {
  color: "#fff",
  fontSize: "14px",
  fontWeight: "400",
  textAlign: "center",
  mb: "10px",
  width: "230px",
};

const styleSendButton: SxProps = {
  color: "#fff",
  fontSize: "14px",
  width: "10px",
  height: "20px",
  mt: "10px",
  ml: "10px",
};
