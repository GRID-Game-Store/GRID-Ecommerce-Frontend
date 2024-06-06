/* eslint-disable no-unused-vars */

export interface IConversations {
  isBot: boolean;
  content: string;
}
export interface IAIChatProps {
  refetch : () => void;
  message : string;
  setMessage : (message: string) => void;
  conversations : IConversations[];
  setConversations : (conversations: IConversations[]) => void;
  isLoading : boolean;
  isFetching : boolean;
}
export interface IMessageItemProps {
  isBot: boolean;
  content: string;
}

export interface IButtonCallAIProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  conversations : IConversations[];
}
