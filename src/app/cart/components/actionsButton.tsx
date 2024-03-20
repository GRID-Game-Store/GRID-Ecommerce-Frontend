"use client";

import { Button, Chip, Stack } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

import { Game } from "../page";
import { UAH } from "@/app/components/shared/currency/UAH";
import TransitionsModal from "@/app/components/shared/payment/modal";
interface IActionsButtons {
  cost?: number;
  mode?: "single" | "all";
  cartId?: number;
  allGamesInfoInCart?: Game;
  allCartsIds?: number[];
}
const titles = {
  single: [null, "DELETE"],
  all: ["BUY ALL", "DELETE ALL"],
};
export const ActionsButtons: React.FC<IActionsButtons> = ({
  cost,
  mode = "single",
  cartId,
  allGamesInfoInCart,
  allCartsIds,
}) => {
  const { refresh } = useRouter();
  const [open, setOpen] = useState(false);
  const [isLoadingGame, setLoadingGame] = useState(false);
  const [isLoadingGames, setLoadingGames] = useState(false);
  const handleOpen = () => setOpen(true);
  const onDelete = async () => {
    if (mode === "all") {
      setLoadingGames(true);
      await fetch("/api/cart/cleanUp", { method: "DELETE" });
      setLoadingGames(false);
    }
    if (mode === "single") {
      setLoadingGame(true);
      await fetch(`/api/cart?id=${cartId}`, {
        method: "DELETE",
      });
      setLoadingGame(false);
    }
    refresh();
  };
  return (
    <>
      <Stack spacing={"10px"} direction={"row"} mb={"10px"}>
        <Chip
          label={
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginLeft: "10px",
              }}
            >
              {cost}
              <UAH size={20} />
            </div>
          }
        />

        {titles[mode][0] && (
          <Button sx={{ fontSize: "12px" }} onClick={handleOpen}>
            {titles[mode][0]}
          </Button>
        )}
        {
          <Button
            sx={{ fontSize: "12px" }}
            onClick={onDelete}
            disabled={isLoadingGame || isLoadingGames}
            color="error"
          >
            {isLoadingGame || isLoadingGames ? "LOADING..." : titles[mode][1]}
          </Button>
        }
      </Stack>
      {allGamesInfoInCart && allCartsIds && (
        <TransitionsModal
          allGamesInfoInCart={allGamesInfoInCart}
          allCartsIds={allCartsIds}
          open={open}
          setOpen={setOpen}
          totalCost={cost}
          isBalanceRecharge={false}
        />
      )}
    </>
  );
};
