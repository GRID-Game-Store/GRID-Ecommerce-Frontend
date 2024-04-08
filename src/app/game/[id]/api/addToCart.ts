export const addGamesToCart = async (id?: number) => {
  const res = await fetch(`/api/cart?id=${id}`, { method: "POST" });
  const game = res.json();
  return game;
};
export const addGamesToWishlist = async (id?: number) => {
  const res = await fetch(`/api/wishlist?id=${id}`, { method: "POST" });
  const game = res.json();
  return game;
};


