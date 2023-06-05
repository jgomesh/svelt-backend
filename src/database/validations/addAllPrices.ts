const addAllPrices = (prices: number[]) => {
  return prices.reduce((a: number, b: number) => {
    return Number(a) + Number(b);
  }, 0);
};

export default addAllPrices;
