"use client";

import { Button, Chip, Stack } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface IActionsButtons {
  cost?: number;
  mode?: "single" | "all";
}
const titles = {
  single: ["BUY", "DELETE"],
  all: ["BUY ALL", "DELETE ALL"],
};
export const ActionsButtons: React.FC<IActionsButtons> = ({
  cost,
  mode = "single",
}) => {
  const { refresh } = useRouter();
  const onDelete = async () => {
    if (mode === "all") {
      const res = await fetch(`/api/cart/cleanUp`, { method: "DELETE" });
      console.log(res);
      
      refresh();
    }
  };
  return (
    <Stack spacing={"10px"} direction={"row"} mb={"10px"}>
      <Chip label={cost} />
      <Button sx={{ fontSize: "12px" }}>{titles[mode][0]}</Button>
      <Button sx={{ fontSize: "12px" }} onClick={onDelete} color="error">
        {titles[mode][1]}
      </Button>
    </Stack>
  );
};
