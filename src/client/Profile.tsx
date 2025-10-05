// app/profile/page.tsx
"use client";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  FiLogOut,
  FiUser,
  FiMail,
  FiPhone,
  FiShield,
  FiCalendar,
  FiEdit,
} from "react-icons/fi";
import useProfile from "../hooks/useProfile/useProfile";
import EditProfileModal from "../Components/models/EditProfileModal";
import { Theme, useTheme } from "@mui/material/styles";

const Profile: React.FC = () => {
  const {
    fadeIn,
    slideUp,
    handleLogout,
    data,
    isModalOpen,
    setISModalOpen,
    handleUpdateProfile,
  } = useProfile();

  const theme = useTheme();

  const bgGradient =
    theme.palette.mode === "dark"
      ? "from-gray-900 to-gray-800"
      : "from-indigo-50 to-blue-100";

  const cardBg = theme.palette.mode === "dark" ? "bg-gray-800" : "bg-white";
  const textColor =
    theme.palette.mode === "dark" ? "text-white" : "text-gray-800";

  return (
    <div
      className={` h-full bg-gradient-to-br ${bgGradient} p-10`}
    >
      <AnimatePresence mode="wait">
        {isModalOpen && data && (
          <EditProfileModal
            user={data}
            onClose={() => setISModalOpen(false)}
            onUpdate={handleUpdateProfile}
          />
        )}
      </AnimatePresence>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="max-w-6xl mx-auto"
      >
        <h1 className={`text-3xl font-bold text-center ${textColor} mb-12`}>
          Your Profile
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <motion.div
            variants={slideUp}
            className={`${cardBg} rounded-2xl shadow-xl overflow-hidden col-span-1`}
          >
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 h-32 relative">
              {data?.image ? (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 w-32 h-32 rounded-full border-4 border-white overflow-hidden shadow-lg"
                >
                  <Image
                    src={data.image}
                    alt={data.userName || "User profile"}
                    width={128}
                    height={128}
                    className="object-cover w-full h-full"
                    priority
                  />
                </motion.div>
              ) : (
                <div
                  className={`absolute -bottom-16 left-1/2 transform -translate-x-1/2 w-32 h-32 rounded-full border-4 border-white ${
                    theme.palette.mode === "dark"
                      ? "bg-gray-700"
                      : "bg-gray-200"
                  } flex items-center justify-center shadow-lg`}
                >
                  <FiUser
                    className={`w-16 h-16 ${
                      theme.palette.mode === "dark"
                        ? "text-gray-300"
                        : "text-gray-400"
                    }`}
                  />
                </div>
              )}
            </div>

            <div className="pt-20 pb-8 px-6 text-center">
              <h2 className={`text-2xl font-bold ${textColor} mb-1`}>
                {data?.userName || "Guest User"}
              </h2>
              <p className="text-blue-400 mb-6">{data?.userRole}</p>

              <button
                onClick={handleLogout}
                className={`flex items-center justify-center mx-auto px-6 py-2 ${
                  theme.palette.mode === "dark"
                    ? "bg-red-900 text-red-100 hover:bg-red-800"
                    : "bg-red-50 text-red-600 hover:bg-red-100"
                } rounded-lg transition-colors`}
              >
                <FiLogOut className="mr-2" />
                Sign Out
              </button>
            </div>
          </motion.div>

          {/* Personal Information */}
          <motion.div
            variants={slideUp}
            transition={{ delay: 0.2 }}
            className={`${cardBg} rounded-2xl shadow-xl overflow-hidden col-span-1 lg:col-span-2 p-8`}
          >
            <div
              className={`flex justify-between items-center mb-6 pb-2 ${
                theme.palette.mode === "dark"
                  ? "border-gray-700"
                  : "border-gray-200"
              } border-b`}
            >
              <h2 className={`text-2xl font-bold ${textColor}`}>
                Personal Information
              </h2>
              <button
                onClick={() => setISModalOpen(true)}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <FiEdit className="mr-2" />
                Edit Profile
              </button>
            </div>

            <div className="space-y-6">
              <Detail
                icon={
                  <FiMail
                    className={
                      theme.palette.mode === "dark"
                        ? "text-blue-400"
                        : "text-blue-600"
                    }
                  />
                }
                label="Email"
                value={data?.email || ""}
                theme={theme}
              />
              <Detail
                icon={
                  <FiPhone
                    className={
                      theme.palette.mode === "dark"
                        ? "text-blue-400"
                        : "text-blue-600"
                    }
                  />
                }
                label="Phone"
                value={data?.phone || ""}
                theme={theme}
              />
              <Detail
                icon={
                  <FiShield
                    className={
                      theme.palette.mode === "dark"
                        ? "text-blue-400"
                        : "text-blue-600"
                    }
                  />
                }
                label="Role"
                value={data?.userRole || ""}
                theme={theme}
              />
              <Detail
                icon={
                  <FiCalendar
                    className={
                      theme.palette.mode === "dark"
                        ? "text-blue-400"
                        : "text-blue-600"
                    }
                  />
                }
                label="Member Since"
                value={
                  data?.createdAt
                    ? new Date(data.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    : "Unknown"
                }
                theme={theme}
              />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

function Detail({
  icon,
  label,
  value,
  theme,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  theme: Theme;
}) {
  return (
    <div className="flex items-start">
      <div
        className={`p-3 rounded-lg mr-4 ${
          theme.palette.mode === "dark" ? "bg-gray-700" : "bg-gray-100"
        }`}
      >
        {icon}
      </div>
      <div>
        <h3
          className={`text-sm font-medium ${
            theme.palette.mode === "dark" ? "text-gray-400" : "text-gray-500"
          }`}
        >
          {label}
        </h3>
        <p
          className={`text-lg ${
            theme.palette.mode === "dark" ? "text-gray-200" : "text-gray-800"
          }`}
        >
          {value || "Not provided"}
        </p>
      </div>
    </div>
  );
}

export default Profile;
