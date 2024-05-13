export const BuyButtonState = (
  isSuccess: boolean,
  isFetching: boolean,
  isLoading: boolean,
  isError: boolean,
  data?: any,
) => {
  if (isSuccess && !isError && data && data.ok )
    return {
      message: "Success",
      messageRecharge: "Success",
      disabled: true,
    };
  else if (isFetching || isLoading)
    return {
      message: "Loading...",
      messageRecharge: "Loading...",
      disabled: true,
    };
  else if (data && !data.ok) return { message: "Error", disabled: false };
  else
    return {
      message: "Buy",
      messageRecharge: "Recharge",
      disabled: false,
    };
};
