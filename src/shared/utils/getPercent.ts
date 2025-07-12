export const getPercent = (totalPrice: number, price: number): number => {
  return Number(((price / totalPrice) * 100).toFixed(2));
};
