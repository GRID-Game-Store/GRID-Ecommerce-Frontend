export const addGamesToCart = async (id?: number) => {
  const res = await fetch(`/api/cart?id=${id}`, { method: "POST" });
  const game = res.json();
  return game;
};
