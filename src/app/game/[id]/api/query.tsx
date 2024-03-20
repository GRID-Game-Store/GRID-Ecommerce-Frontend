import { useQuery } from "@tanstack/react-query";
import { addGamesToCart } from "./addToCart";

export const useAddGameToCartQuery = (id?: number) => {
  return useQuery({
    queryKey: ["gameAddToCart", id],
    queryFn: () => addGamesToCart(id),
    refetchOnWindowFocus: false,
    enabled: false,
  });
};
