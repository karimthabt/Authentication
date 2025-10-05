import { FiUser, FiShield } from "react-icons/fi";
import { RiAdminLine } from "react-icons/ri";
import { MdOutlineEmail } from "react-icons/md";

export const tableHeaders = [
  {
    text: "IP",
    icon: null,
    key: "ip",
  },
  {
    text: "اسم المستخدم",
    icon: <FiUser className="ml-1" />,
    key: "userName",
  },
  {
    text: "الإيميل",
    icon: <MdOutlineEmail className="ml-1" />,
    key: "email",
  },
  { text: "الدور", icon: <FiShield className="ml-1" />, key: "role" },
  { text: "إجراءات", icon: null, key: "actions" },
];

export const roles = [
  { value: "مستخدم", label: "مستخدم", icon: <FiUser /> },
  { value: "ادمن", label: "ادمن", icon: <RiAdminLine /> },
];
