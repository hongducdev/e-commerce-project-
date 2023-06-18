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

export const validate = (payload, setInvalidFields) => {
  let invalids = 0;
  const formatPayload = Object.entries(payload);
  for (let arr of formatPayload) {
    if (arr[1].trim() === "") {
      invalids++;
      setInvalidFields((prev) => [
        ...prev,
        { name: arr[0], message: "This field is required" },
      ]);
    }
  }
  for (let arr of formatPayload) {
    switch (arr[0]) {
      case "email":
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!arr[1].match(regex)) {
          invalids++;
          setInvalidFields((prev) => [
            ...prev,
            {
              name: arr[0],
              message: "Email is invalid",
            },
          ]);
        }
        break;

      case "password":
        if (arr[1].length < 6) {
          invalids++;
          setInvalidFields((prev) => [
            ...prev,
            {
              name: arr[0],
              message: "Password must be at least 6 characters",
            },
          ]);
        }
        break;

      default:
        break;
    }
  }

  return invalids;
};
