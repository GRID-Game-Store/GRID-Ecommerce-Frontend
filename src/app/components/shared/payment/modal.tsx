"use client";
import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {
  Checkbox,
  Chip,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  SxProps,
  TextField,
} from "@mui/material";
import { ListGames } from "@/app/components/main/recommendations/recommendationsModule";
import { Game } from "@/app/cart/page";
import { useGameBuyQuery, useGetBalanceQuery } from "./api/query";
import { useState } from "react";
import { usePaymentRedirect } from "@/app/cart/hooks/usePaymentRedirect";
import { BuyButtonState } from "@/app/cart/utils/buyButtonState";
import { hashKey } from "@tanstack/react-query";

const style: SxProps = {
  position: "absolute" as "absolute",
  width: "600px",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "#000",
  border: "1px solid rgba(8,173,44, 0.3)",
  borderRadius: "10px",
  display: "flex",
  flexDirection: "column",
  p: 2,
};
interface ITransitionsModalProps {
  allGamesInfoInCart?: Game;
  allCartsIds?: number[];
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  totalCost?: number;
  title?: string;
  isBalanceRecharge: boolean;
}
const Title = ({ title }: { title: string }) => {
  return (
    <Typography
      id="transition-modal-title"
      variant="h6"
      component="h2"
      fontWeight={"600"}
      sx={{ mb: "10px", color: "#fff" }}
    >
      {title}
    </Typography>
  );
};

const paymentMethods = {
  Stripe: {
    status: "enabled",
  },
  PayPal: {
    status: "enabled",
  },
  Balance: {
    status: "disabled",
  },
};

const paymentMethodsWithoutBalance = {
  Stripe: {
    status: "enabled",
  },
  PayPal: {
    status: "enabled",
  },
};

const PaymentForm = ({ model, value }: { model: boolean; value: string }) => {
  const paymentsMethodsFromProps =
    model !== true ? paymentMethodsWithoutBalance : paymentMethods;
  const paymentMethodsUI = Object.keys(paymentsMethodsFromProps).map((key) => {
    const paymentMethod = key === "Stripe" ? "Card" : key;
    return (
      <div key={paymentMethod}>
        <FormControlLabel value={key} control={<Radio />} label={paymentMethod} />
      </div>
    );
  });
  return (
    <>
      <FormLabel id="radio-buttons-group-label" sx={{ color: "#fff" }}>
        <Title title={"How you want to pay"} />
      </FormLabel>
      <RadioGroup
        aria-labelledby="radio-buttons-group-label"
        defaultValue="Cart"
        name="radio-buttons-group"
        value={value}
      >
        {paymentMethodsUI}
      </RadioGroup>
    </>
  );
};


// eslint-disable-next-line no-unused-vars
const IncrementsButtons = ({setRechargeCount} : {setRechargeCount: React.Dispatch<React.SetStateAction<number>>}) => {
  const handleIncrement = (count: number) => {
    setRechargeCount((prev: number) => prev + count)
  }
  return (
    <Stack direction={"row"}  spacing={1}>
              <Button onClick={() => handleIncrement(25)}>25</Button>
              <Button onClick={() => handleIncrement(50)}>50</Button>
              <Button onClick={() => handleIncrement(100)}>100</Button>
    </Stack>
  );
}

const TransitionsModal: React.FC<ITransitionsModalProps> = ({
  allCartsIds,
  allGamesInfoInCart,
  open,
  setOpen,
  totalCost,
  title = "Checkout",
  isBalanceRecharge = false,
}) => {
  const [paymentMethod, setPaymentMethod] = useState("Stripe");
  const [isPaymentWithBalance, setIsPaymentWithBalance] = useState(false);
  const [rechargeCount, setRechargeCount] = useState<number>(0);
  const recharge = isBalanceRecharge ? "/recharge/" : "/";
  const amount = isBalanceRecharge ? `amount=${rechargeCount}` : "";
  const isBalanceChecked = paymentMethod === "Balance";
  const balanceAction = isPaymentWithBalance
    ? "PAYMENT_WITH_BALANCE"
    : "NO_ACTION";


  const { data, isSuccess, mutate, isPending, isError } = useGameBuyQuery(
    paymentMethod,
    balanceAction,
    recharge,
    amount,
  );
  const { data: balance } = useGetBalanceQuery();
  usePaymentRedirect(isSuccess, data, paymentMethod);
  const handleClose = () => setOpen(false);
  const ButtonState = BuyButtonState(
    isSuccess,
    isPending,
    isPending,
    isError,
    data,
  );
  const handleCheckout = async () => {
    mutate();
  };
  const isCanPayWithBalance = balance
    ? totalCost && Boolean(balance <= totalCost)
    : false;
  const allItemsIntoCart = allCartsIds && allCartsIds.length;
  const withBalance = balance !== undefined ?`(${balance} UAH)` : "";
  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        style={{ position: "fixed" }}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Title title={title} />
            {isBalanceRecharge && (
              <TextField
                id="outlined-number"
                label="How much do you want to recharge the balance by?"
                type="number"
                sx={{ mb: "20px", width: "330px" }}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setRechargeCount(Number(e.target.value))
                }
                value={rechargeCount}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            )}
            {!isBalanceRecharge && (
              <ListGames
                data={allGamesInfoInCart}
                cartsIds={allCartsIds}
                width="560px"
                height="310px"
                scroll={true}
              />
            )}
            {isBalanceRecharge && <IncrementsButtons setRechargeCount={setRechargeCount}/>}
            <FormControl
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPaymentMethod(e.target.value)
              }
            >
              <PaymentForm model={!isBalanceRecharge} value={paymentMethod} />
            </FormControl>
            {!isBalanceRecharge && (
              <FormControlLabel
                checked={isPaymentWithBalance}
                onChange={(event: React.SyntheticEvent, checked: boolean) =>
                  setIsPaymentWithBalance(checked)
                }
                control={<Checkbox />}
                label={`With balance ${withBalance}`}
                disabled={isBalanceChecked || !isCanPayWithBalance}
              />
            )}
            <Stack direction={"row"} sx={{ mt: "10px" }} spacing={"10px"}>
              <Button
                disabled={ButtonState.disabled}
                onClick={handleCheckout}
                sx={{ fontSize: "12px", mt: "10px" }}
              >
                {ButtonState.message}
              </Button>
              {!isBalanceRecharge && (
                <Chip sx={{ mt: "10px" }} label={`Total cost: ${totalCost}`} />
              )}
              {!isBalanceRecharge && (
                <Chip
                  sx={{ mt: "10px" }}
                  label={`Total items: ${allItemsIntoCart}`}
                />
              )}
            </Stack>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default TransitionsModal;
