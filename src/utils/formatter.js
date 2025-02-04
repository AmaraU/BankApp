import { MONTHS } from "../constants";

export const formatNumberStar = (phone) => {
  return `+234-${phone.slice(0, 4).replace(/\d/g, "*") + phone.slice(-4)}`;
};

export const formatBeneficiaryName = (name) => {
  if (name.length > 20) return name.slice(0, 21) + "...";
  else return name;
};

export const getFormattedDate = (date) => {
  return new Date(date).toLocaleDateString("en-GB").replace(/\//g, "-");
};

export const formatTransactionDate = (date) => {
  let [month, day, year] = date.split("/");
  return day + "-" + MONTHS[month] + "-" + year;
};
