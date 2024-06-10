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

export const addReview = async (id?: number, body?: any) => {
  const res = await fetch(`/api/reviews/add/${id}`, {
    method: "POST",
    body: JSON.stringify(body),
  });
  const game = res.json();
  return game;
};
export const updateReview = async (id?: number, body?: any) => {
  const res = await fetch(`/api/reviews/edit/${id}`, {
    method: "PUT",
    body: JSON.stringify(body),
  });
  const game = res.json();
  return game;
};
export const deleteReview = async (id?: number) => {
  const res = await fetch(`/api/reviews/delete/${id}`, {
    method: "DELETE",
  });
  const game = res.json();
  return game;
};

export const getReview = async (id?: number) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}reviews/${id}`, {
    method: "GET",
  });
  const game = res.json();
  return game;
};
