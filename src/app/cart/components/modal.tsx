"use client";
import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {
  Chip,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  SxProps,
} from "@mui/material";
import { ListGames } from "@/app/components/main/recommendations/recommendationsModule";
import { Game } from "../page";

import Checkbox from "@mui/material/Checkbox";
import { useGameBuyQuery } from "../api/query";
import { usePaymentRedirect } from "../hooks/usePaymentRedirect";
import { BuyButtonState } from "../utils/buyButtonState";
import { useState } from "react";

const style: SxProps = {
  position: "absolute" as "absolute",
  width: "600px",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "#000",
  border: "1px solid rgba(8,173,44, 0.3)",
  borderRadius: "10px",
  p: 2,
};
interface ITransitionsModalProps {
  allGamesInfoInCart: Game;
  allCartsIds: number[];
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  totalCost?: number;
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

const PaymentForm = ({ value }: { value: string }) => {
  const paymentMethodsUI = Object.keys(paymentMethods).map((key) => {
    return (
      <Box key={key} sx={{ display: "flex", flexDirection: "column" }}>
        <FormControlLabel value={key} control={<Radio />} label={key} />
      </Box>
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

const TransitionsModal: React.FC<ITransitionsModalProps> = ({
  allCartsIds,
  allGamesInfoInCart,
  open,
  setOpen,
  totalCost,
}) => {
  
  const [paymentMethod, setPaymentMethod] = useState("Stripe");
  const [isPaymentWithBalance, setIsPaymentWithBalance] = useState(false);
  const isBalanceChecked = paymentMethod === "Balance";
  const balanceAction = isPaymentWithBalance
    ? "PAYMENT_WITH_BALANCE"
    : "NO_ACTION";
  const {data, isSuccess, isError, isPending, mutate} = useGameBuyQuery(paymentMethod, balanceAction, "", "");
  usePaymentRedirect(isSuccess, data, paymentMethod);
  const allItemsIntoCart = allCartsIds && allCartsIds.length;
  const handleClose = () => setOpen(false);
  const ButtonState =  BuyButtonState(isSuccess, isPending, isPending, isError, data);
  const handleCheckout = async () => {
   mutate();
  };
 
  
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
            <Title title={"Checkout"} />
            <ListGames
              data={allGamesInfoInCart}
              cartsIds={allCartsIds}
              width="560px"
              height="310px"
              scroll={true}
            />
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <FormControl
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setPaymentMethod(e.target.value)
                }
              >
                <PaymentForm value={paymentMethod} />
              </FormControl>
              <FormControlLabel
                checked={isPaymentWithBalance}
                onChange={(event: React.SyntheticEvent, checked: boolean) =>
                  setIsPaymentWithBalance(checked)
                }
                control={<Checkbox />}
                label={"With balance"}
                disabled={isBalanceChecked}
              />
            </Box>
            <Stack direction={"row"} sx={{ mt: "10px" }} spacing={"10px"}>
              <Button
                onClick={handleCheckout}
                disabled={ButtonState.disabled}
                sx={{ fontSize: "12px", mt: "10px" }}
              >
                {ButtonState.message}
              </Button>
              <Chip sx={{ mt: "10px" }} label={`Total cost: ${totalCost}`} />
              <Chip
                sx={{ mt: "10px" }}
                label={`Total items: ${allItemsIntoCart}`}
              />
            </Stack>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default TransitionsModal;
