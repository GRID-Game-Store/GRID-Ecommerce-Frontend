"use client";
import React from "react";
import { FullInfoResponse } from "@/app/types/types";
import { IItemsProps } from "./types/item";
import {
  ItemLargePreview,
  ItemSmallColumn,
  ItemSmallRow,
} from "./variants/item";

const Items: React.FC<IItemsProps> = ({
  game,
  variant = "row",
  setActiveHover,
  width,
  isCart,
  cartId,
}) => {
  switch (variant) {
    case "row":
        return game && <ItemSmallRow game={game} />;
    case "column":
        return game && (
          <ItemSmallColumn
            game={game}
            setActiveHover={setActiveHover}
            isCart={isCart}
            cartId={cartId}
          />
        )
    case "preview":
        return game && <ItemLargePreview width={width} game={game as FullInfoResponse} />
    default:
      return null
  }
};
export { Items };
