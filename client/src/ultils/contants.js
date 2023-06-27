import path from "./path";
import icons from "./icons";

const {FaShieldAlt, FaShippingFast, FaGift, FaReply, FaPhoneAlt, RiDashboardFill, FaUserCog, FaFileImport, FaFileAlt, FaFolderOpen, FaMoneyCheck} = icons;

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
    icon: <FaShieldAlt size="24"/>,
  },
  {
    id: 1,
    title: "Free Shipping",
    description: "Free On All Products",
    icon: <FaShippingFast size="24"/>,
  },
  {
    id: 2,
    title: "Special Gift Cards",
    description: "Special Gift Cards",
    icon: <FaGift size="24"/>,
  },
  {
    id: 3,
    title: "Free Return",
    description: "Within 7 Days",
    icon: <FaReply size="24"/>,
  },
  {
    id: 4,
    title: "Consultancy",
    description: "Lifetime 24/7",
    icon: <FaPhoneAlt size="24"/>,
  },
];

export const productInfoTabs = [
  {
    id: 0,
    title: "Description",
    content: "text-1",
  },
  {
    id: 1,
    title: "Warranty",
    content: "text-2",
  },
  {
    id: 2,
    title: "Delivery",
    content: "text-3",
  },
  {
    id: 3,
    title: "Payment",
    content: "text-4",
  },
];

export const colors = [
  "black",
  "white",
  "gray",
  "red",
  "blue",
  "yellow",
  "green",
];

export const sortOptions = [
  {
    id: 1,
    value: "-sold",
    text: "Best Selling",
  },
  {
    id: 2,
    value: "title",
    text: "Alphabetically, A-Z",
  },
  {
    id: 3,
    value: "-title",
    text: "Alphabetically, Z-A",
  },
  {
    id: 4,
    value: "price",
    text: "Price, low to high",
  },
  {
    id: 5,
    value: "-price",
    text: "Price, high to low",
  },
  {
    id: 6,
    value: "createdAt",
    text: "Date, new to old",
  },
  {
    id: 7,
    value: "-createdAt",
    text: "Date, old to new",
  },
];

export const adminSidebars = [
  {
    id: 0,
    text: "Dashboard",
    type: 'SINGER',
    path: `/${path.ADMIN}/${path.DASHBOARD}`,
    icon: <RiDashboardFill size="24"/>,
  },
  {
    id: 1,
    text: "Manage Users",
    type: 'SINGER',
    path: `/${path.ADMIN}/${path.MANAGE_USER}`,
    icon: <FaUserCog size="24"/>,
  },
  {
    id: 2,
    text: "Manage Products",
    type: 'PARENT',
    icon: <FaFolderOpen size="24"/>,
    subMenus: [
      {
        id: 0,
        text: "Create Product",
        path: `/${path.ADMIN}/${path.CREATE_PRODUCT}`,
        icon: <FaFileImport />
      },
      {
        id: 1,
        text: "Manage Products",
        path: `/${path.ADMIN}/${path.MANAGE_PRODUCT}`,
        icon: <FaFileAlt />
      }
    ]
  },
  {
    id: 3,
    text: "Manage Orders",
    type: 'SINGER',
    path: `/${path.ADMIN}/${path.MANAGE_ORDER}`,
    icon: <FaMoneyCheck size="24"/>,
  },
]

export const roles = [
  {
    code: 1001,
    value: "Admin",
  },
  {
    code: 1000,
    value: "User",
  }
]