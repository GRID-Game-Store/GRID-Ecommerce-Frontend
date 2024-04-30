import { Heart, Send, Trash2 } from "lucide-react";
import React from "react";

export const BuyButtonStateBuy = (
  isSuccess: boolean,
  isPending: boolean,
  message: any | undefined,
  error: string | undefined,
  price: "free" | React.JSX.Element | null | "problem with price"
) => {
  if (isSuccess)
    return {
      message: (message.data && message.data.response) || error,
      disabled: true,
    };
  else if (isPending)
    return {
      message: "Loading...",
      disabled: true,
    };
  else
    return {
      message: price,
      disabled: false,
    };
};

export const BuyButtonStateWishlist = (
  isSuccess: boolean,
  isPending: boolean,
  error: string | undefined
) => {
  
  
  if (isSuccess)
    return {
      message: <Heart fill="#fff" /> || error,
      disabled: true,
    };
  else if (isPending)
    return {
      message: "Loading...",
      disabled: true,
    };
  else
    return {
      message: <Heart />,
      disabled: false,
    };
};


export const BuyButtonStateSendReview = (
    isSuccess: boolean,
    isPending: boolean,
    error: string | undefined
  ) => {
    if (isSuccess)
      return {
        message: <Send /> || error,
        disabled: false,
      };
    else if (isPending)
      return {
        message: "Loading...",
        disabled: true,
      };
    else
      return {
        message: <Send />, 
        disabled: false,
      };
};

export const BuyButtonStateDeleteReview = (
  isSuccess: boolean,
  isPending: boolean,
  error: string | undefined
) => {
  if (isSuccess)
    return {
      message: <Trash2 /> || error,
      disabled: false,
    };
  else if (isPending)
    return {
      message: "Loading...",
      disabled: true,
    };
  else
    return {
      message: <Trash2 />, 
      disabled: false,
    };
};

  
