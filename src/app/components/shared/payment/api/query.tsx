"use client";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
const fetchCapture = async (sessionId: string, paymentMethod: string) => {
  const response = await fetch(`/api/capture/${paymentMethod}?sessionId=${sessionId}`, {
    method: "POST",
  });
  return response as Response;
};
const fetchRevertTransaction = async (token: string) => {
  const response = await fetch(`/api/transactions/revert?sessionId=${token}`, {
    method: "POST",
  });
  return response as Response;
};


//searchParams.get("token")


export const buyGame = async (paymentMethod: string, balanceAction: string, recharge: string = "", amount?: string) =>  {
  console.log(paymentMethod);
  
  const res: Response = await fetch(`/api/checkout${recharge}${paymentMethod.toLowerCase()}?balanceAction=${balanceAction}&${amount}`, {
      method: "POST",
  })
  return res
}
export const useGameBuyQuery = (paymentMethod: string, balanceAction: string, recharge: string = "", amount?: string) => {
  return useMutation({
      mutationKey: ["buy games"],
      mutationFn: () => buyGame(paymentMethod, balanceAction, recharge, amount),
  });
}

const useAnimationStatus = (data: Response | undefined, isSuccess: boolean, isPending: boolean) => {
  const [statusPayment, setStatusPayment] = useState("");
  useEffect(() => {
    if (data && data?.status) {
      setStatusPayment("complete");
    } else {
      setStatusPayment("uncomplete");
    }
  }, [isSuccess, isPending, data]);
  return statusPayment
}

const useMutationOnMount = (isIdle : boolean, mutate: () => void) => {
  useEffect(() => {
    if (isIdle === true) mutate()
  }, [isIdle, mutate])
}

export const useCapturePayment = (token: string, paymentMethod: string) => {
  const { data, isSuccess, isPending, isIdle, mutate} = useMutation<Response, Error>({
    mutationKey: ["capture payment"],
    mutationFn: () => fetchCapture(token, paymentMethod),
  });
  const statusPayment = useAnimationStatus(data, isSuccess, isPending)
  useMutationOnMount(isIdle, mutate)

  return {
    statusPayment,
    data,
    isSuccess,
    isPending   
  }
};


export const useCancelPayment = (token: string) => { 
  const { data, isSuccess, isPending, isIdle, mutate} = useMutation<Response, Error>({
    mutationKey: ["cancel payment"],
    mutationFn: () => fetchRevertTransaction(token),
  });
  const statusPayment = useAnimationStatus(data, isSuccess, isPending)
  useMutationOnMount(isIdle, mutate)
  return {
    statusPayment,
    data,
    isSuccess,
    isPending   
  }
}
