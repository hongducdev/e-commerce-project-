import path from "./path";
import icons from "./icons";

const {
  FaShieldAlt,
  FaShippingFast,
  FaGift,
  FaReply,
  FaPhoneAlt
} = icons;

export const navigation = [
  {
    id: 0,
    value: "Home",
    path: `/${path.HOME}`,
  },
  {
    id: 1,
    value: "Products",
    path: `/${path.PRODUCTS}`,
  },
  {
    id: 2,
    value: "Blogs",
    path: `/${path.BLOGS}`,
  },
  {
    id: 3,
    value: "Our services",
    path: `/${path.OUR_SERVICES}`,
  },
  {
    id: 4,
    value: "FAQ",
    path: `/${path.FAQ}`,
  },
];

export const productExtraInfo = [
  {
    id: 0,
    title: "Guarantee",
    description: "Quality Checked",
    icon: <FaShieldAlt/>,
  },
  {
    id: 1,
    title: "Free Shipping",
    description: "Free On All Products",
    icon: <FaShippingFast/>,
  },
  {
    id: 2,
    title: "Special Gift Cards",
    description: "Special Gift Cards",
    icon: <FaGift/>,
  },
  {
    id: 3,
    title: "Free Return",
    description: "Within 7 Days",
    icon: <FaReply/>,
  },
  {
    id: 4,
    title: "Consultancy",
    description: "Lifetime 24/7",
    icon: <FaPhoneAlt/>,
  }
]

export const productInfoTabs = [
  {
    id: 0,
    title: "Description",
    content: "text-1"
  },
  {
    id: 1,
    title: "Warranty",
    content: "text-2"
  },
  {
    id: 2,
    title: "Delivery",
    content: "text-3"
  },
  {
    id: 3,
    title: "Payment",
    content: "text-4"
  },
  {
    id: 4,
    title: "Customer Reviews",
  }
]

export const colors = [
  'black',
  'white',
  'gray',
  'red',
  'blue',
  'yellow',
  'green',
]
