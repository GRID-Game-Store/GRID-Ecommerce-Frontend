import { useMutation } from "@tanstack/react-query";
export const buyGame = async (
  paymentMethod: string,
  balanceAction: string,
  recharge: string = "",
  amount?: string,
) => {
  const res: Response = await fetch(
    `/api/checkout${recharge}${paymentMethod.toLowerCase()}?balanceAction=${balanceAction}&${amount},`,
    {
      method: "POST",
    },
  );
  return res;
};
export const useGameBuyQuery = (
  paymentMethod: string,
  balanceAction: string,
  recharge: string = "",
  amount?: string,
) => {
  return useMutation({
    mutationFn: () => buyGame(paymentMethod, balanceAction, recharge, amount),
  });
};
