"use client";
import { Box } from "@mui/material";
import React, { useState } from "react";
import { ButtonCallAI } from "./ButtonCallAI";
import { AIChat } from "./aiChat";
import useConversations from "./hooks/useConversations";
import { useGetResponseFromGemini } from "./api/query";
import { useBeforeunload } from "./hooks/useBeforeunload";

const AIWrapper = () => {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = React.useState("");
  const { data, refetch, isLoading, isFetching } = useGetResponseFromGemini(
    visible,
    message
  );
  const { conversations, setConversations } = useConversations(data);
  useBeforeunload(visible);

  return (
    <Box position={"fixed"} right={"10px"} bottom={"0px"}>
      <ButtonCallAI
        visible={visible}
        setVisible={setVisible}
        conversations={conversations}
      />
      <div style={{ display: visible ? "block" : "none" }}>
        <AIChat
          refetch={refetch}
          message={message}
          setMessage={setMessage}
          conversations={conversations}
          setConversations={setConversations}
          isLoading={isLoading}
          isFetching={isFetching}
        />
      </div>
    </Box>
  );
};

export { AIWrapper };
