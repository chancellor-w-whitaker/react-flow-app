export const changeListOrder = (order, optionClicked) =>
  order.some((option) => option === optionClicked)
    ? order.filter((option) => option !== optionClicked)
    : [...order, optionClicked];
