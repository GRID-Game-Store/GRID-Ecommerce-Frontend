"use client";
import { UAH } from "@/app/components/shared/currency/UAH";
import TransitionsModal from "@/app/components/shared/payment/modal";
import { Button, Menu, MenuItem } from "@mui/material";
import React, { useState } from "react";

const Balance = ({ balance }: { balance?: number }) => {
  const [open, setOpen] = useState(false);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpen = () => {
    setAnchorEl(null);
    setOpen(true);
  };
  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={openMenu ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={openMenu ? "true" : undefined}
        onClick={handleClick}
        sx={{ width: "140px" }}
      >
        {balance}
        <UAH />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        sx={{ mt: "2px", position: "absolute", zIndex: "1" }}
      >
        <MenuItem onClick={handleOpen}>Recharge balance</MenuItem>
        <MenuItem onClick={handleClose}>Transactions</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
      <TransitionsModal
        open={open}
        setOpen={setOpen}
        totalCost={10}
        isBalanceRecharge={true}
      />
    </div>
  );
};
export { Balance };
