import icons from "./icons";

const { BsStarFill, BsStar } = icons;

export const formatString = (str) => {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .split(" ")
    .join("-");
};

export const formatMoney = (money) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(money);
};

export const renderStartFromNumber = (number) => {
  if (!Number(number)) return;
  if (number < 0 || number > 5) return;
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (i <= number) {
      stars.push(<BsStarFill key={i} className="text-[#f1b400]" />);
    } else {
      stars.push(<BsStar key={i} className="text-[#f1b400]" />);
    }
  }

  return stars;
};
