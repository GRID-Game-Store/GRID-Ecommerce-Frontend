import { useMutation } from "@tanstack/react-query";
import { addGamesToCart, addGamesToWishlist } from "./addToCart";

export const useAddGameToCartMutation = (id?: number) => {
  return useMutation({
    mutationKey: ["gameAddToCart", id],
    mutationFn: () => addGamesToCart(id),
  });
};
export const useAddGameWishlistMutation = (id?: number) => {
  return useMutation({
    mutationKey: ["gameAddWishlist", id],
    mutationFn: () => addGamesToWishlist(id),
  });
};