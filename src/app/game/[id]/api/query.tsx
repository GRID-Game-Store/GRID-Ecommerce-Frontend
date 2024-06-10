import { useMutation } from "@tanstack/react-query";
import { addGamesToCart, addGamesToWishlist, addReview, deleteReview, updateReview } from "./gameReq";

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

export const useAddReviewMutation = (id?: number, body?: any) => {
  return useMutation({
    mutationKey: ["gameAddReview", id],
    mutationFn: () => addReview(id, body),
  });
};

export const useUpdateReviewMutation = (id?: number, body?: any) => {
  return useMutation({
    mutationKey: ["gameUpdateReview", id],
    mutationFn: () => updateReview(id, body),
  });
};

export const useDeleteReviewMutation = (id?: number) => {
  return useMutation({
    mutationKey: ["gameDeleteReview", id],
    mutationFn: () => deleteReview(id),
  });
};

// export const useGetReviewQuery = (id?: number) => {
//   return useQuery({
//     queryKey: ["gameGetReview", id],
//     queryFn: () => getReview(id),
//     refetchOnWindowFocus: false,
//   });
// };