"use client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
const fetchCapture = async (sessionId: string, paymentMethod: string) => {
  const response = await fetch(
    `/api/capture/${paymentMethod}?sessionId=${sessionId}`,
    {
      method: "POST",
    },
  );
  return response as Response;
};
const fetchRevertTransaction = async (token: string) => {
  const response = await fetch(`/api/transactions/revert?sessionId=${token}`, {
    method: "POST",
  });
  return response as Response;
};

export const fetchBuyGame = async (
  paymentMethod: string,
  balanceAction: string,
  recharge: string = "",
  amount?: string,
) => {
  const res: Response = await fetch(
    `/api/checkout${recharge}${paymentMethod.toLowerCase()}?balanceAction=${balanceAction}&${amount}`,
    {
      method: "POST",
    },
  );
  return res;
};
export const fetchGetBalance = async () => {
  const res: Response = await fetch("/api/user/balance", {
    method: "GET",
  });

  const data = await res.json();
  return data.data.balance as number;
};

export const useGameBuyQuery = (
  paymentMethod: string,
  balanceAction: string,
  recharge: string = "",
  amount?: string,
) => {
  return useMutation({
    mutationKey: ["buy games"],
    mutationFn: () =>
      fetchBuyGame(paymentMethod, balanceAction, recharge, amount),
  });
};

export const useGetBalanceQuery = () => {
  return useQuery({
    queryKey: ["balance"],
    queryFn: () => fetchGetBalance(),
    refetchOnWindowFocus: false,
  });
};

const useAnimationStatus = (
  data: Response | undefined,
  isSuccess: boolean,
  isPending: boolean,
) => {
  const [statusPayment, setStatusPayment] = useState("");
  useEffect(() => {
    if (data && data?.status) {
      setStatusPayment("complete");
    } else {
      setStatusPayment("uncomplete");
    }
  }, [isSuccess, isPending, data]);
  return statusPayment;
};

const useMutationOnMount = (isIdle: boolean, mutate: () => void) => {
  useEffect(() => {
    if (isIdle === true) mutate();
  }, [isIdle, mutate]);
};

export const useCapturePayment = (token: string, paymentMethod: string) => {
  const { data, isSuccess, isPending, isIdle, mutate } = useMutation<
    Response,
    Error
  >({
    mutationKey: ["capture payment"],
    mutationFn: () => fetchCapture(token, paymentMethod),
  });
  const statusPayment = useAnimationStatus(data, isSuccess, isPending);
  useMutationOnMount(isIdle, mutate);

  return {
    statusPayment,
    data,
    isSuccess,
    isPending,
  };
};

export const useCancelPayment = (token: string) => {
  const { data, isSuccess, isPending, isIdle, mutate } = useMutation<
    Response,
    Error
  >({
    mutationKey: ["cancel payment"],
    mutationFn: () => fetchRevertTransaction(token),
  });
  const statusPayment = useAnimationStatus(data, isSuccess, isPending);
  useMutationOnMount(isIdle, mutate);
  return {
    statusPayment,
    data,
    isSuccess,
    isPending,
  };
};
