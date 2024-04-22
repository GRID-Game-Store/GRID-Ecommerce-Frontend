/* eslint-disable no-unused-vars */
import React from "react";
import { FullInfoResponse, MyReviewGameResponse, AllReviewsGameResponse} from "@/app/types/types";

export interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
export interface ISysReqProps {
  sysReq: string;
}

export interface ISysReqItemsProps {
  activeTab: number;
  sysReq: string;
  type: string;
}

export interface IInfoProps {
  fullInfo: FullInfoResponse["game"];
  wishListCheck: boolean;
}

export interface IReviewsProps {
  gameID: number | undefined;
  myReview: MyReviewGameResponse;
  allReviews: AllReviewsGameResponse
}
export interface IReviewItemProps {
  author?: string;
  content?: string;
  rating?: number;
  date?: string;
}


type TButtonState = {
  message: string | React.JSX.Element;
  disabled: boolean;
}


export interface IAddNewAndChangeReviewProps {
  value: string | null;
  setValue: (value: string) => void;
  rating: number | null;
  setRating: (value: number | null) => void;
  mutate: () => void;
  editMode: boolean;
  deleteReview: () => void,
  sendReviewButtonState: TButtonState
  deleteReviewButtonState: TButtonState
}
