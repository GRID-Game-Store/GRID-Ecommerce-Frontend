import { CreatePaymentResponse } from "@/app/types/types";
import { useRouter } from "next/navigation";
import { useEffect } from "react";



const usePaymentRedirect = (isSuccess: boolean, data: Response | undefined, paymentMethod: string) => {
    const { push, refresh: routerRefresh } = useRouter();
    useEffect(() => {
    console.log(data);
    
    isSuccess && data &&
      data.status === 200 &&
      data.json().then(({ data }: { data: CreatePaymentResponse }) => {
        if (data.data && paymentMethod === "Stripe") {
          push(data.data.sessionUrl);
          localStorage.setItem("sessionIDStripe", data.data.sessionId);
        }
        if (data.message && paymentMethod === "PayPal") {
          push(data.message);
        }
        if (data.data && paymentMethod === "Balance") {
         
          push("/balance/success?token=" + data.data.sessionId);
          routerRefresh();
        }
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);
  
};
export { usePaymentRedirect };
