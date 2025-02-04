export const getImageUrl = (path) => {
    return new URL(`/assets/${path}`, import.meta.url).href;
};


export const hideBalance = () => {
    return "****************";
  };

export const formatNumberDecimals = (number) => {
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(number);
  };