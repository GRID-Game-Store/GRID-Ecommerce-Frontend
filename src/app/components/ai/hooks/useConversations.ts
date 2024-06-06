import React, { useEffect } from "react";
import { IConversations } from "../types/ai";

const useConversations = (data?: any) => {
  const conversationsFromStorage = typeof window !== "undefined" && localStorage.getItem("conversations");

  const [conversations, setConversations] = React.useState<IConversations[]>(
    conversationsFromStorage ? JSON.parse(conversationsFromStorage) : [],
  );
  useEffect(() => {
    if (data && data.aiResponse !== conversations.at(-1)?.content) {
      setConversations([
        ...conversations,
        { isBot: true, content: data.aiResponse },
      ]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return { conversations, setConversations };
};

export default useConversations;
