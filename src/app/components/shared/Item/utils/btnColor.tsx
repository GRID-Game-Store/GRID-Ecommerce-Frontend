export const getBtnBackgroundColor = (discount?: number) : string => {
  return `${discount ? "#FF7A00" : ""}`;
};
