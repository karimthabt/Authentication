// app/HomePage.tsx (Client Component)
"use client";

import { motion, AnimatePresence, Variants } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import useResponsive from "@/hooks/useResponsive/useResponsive";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const floatingVariants: Variants = {
  float: {
    y: [0, -15, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut",
    },
  },
};

export default function HomePage() {
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  const theme = useTheme();
  const { isMobile } = useResponsive();


  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
  };

  if (!isMounted) return null;

  // تحديد الألوان بناء على الوضع
  const backgroundColor = theme.palette.mode === "dark" ? "#1a2434" : "#ffffff";
  const textColor = theme.palette.mode === "dark" ? "#ffffff" : "#1a1a1a";
  const cardBgColor = theme.palette.mode === "dark" ? "#253348" : "#ffffff";
  const borderColor = theme.palette.mode === "dark" ? "#333333" : "#e5e7eb";
  const primaryColor = theme.palette.mode === "dark" ? "#3dd598" : "#3a7fff";
  return (
    <div
      style={{
        backgroundColor,
        color: textColor,
        overflow: isMobile ? "auto" : "hidden",
      }}
      className="h-full p-8 relative"
    >
      {/* Floating Background Elements */}
      <AnimatePresence>
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 80 + 30,
              height: Math.random() * 80 + 30,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              backgroundColor:
                theme.palette.mode === "dark"
                  ? "rgba(61, 213, 152, 0.1)"
                  : "rgba(58, 127, 255, 0.1)",
            }}
            initial={{ opacity: 0 }}
            animate={{
              opacity: 0.2,
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              rotate: [0, 360],
            }}
            transition={{
              duration: Math.random() * 15 + 10,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
          />
        ))}
      </AnimatePresence>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Main Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring" }}
        >
          <motion.h1
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ color: primaryColor }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            نظام المصادقة الآمن
          </motion.h1>
          <motion.p
            className="text-xl"
            style={{ color: textColor }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            حماية هويتك وبياناتك هي أولويتنا
          </motion.p>
        </motion.div>

        {/* Auth Concepts */}
        <motion.div
          className="grid md:grid-cols-2 gap-8 mb-15"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {[
            {
              title: "ما هي المصادقة؟",
              content:
                "المصادقة (Authentication) هي عملية التحقق من هوية المستخدم، حيث يتم التأكد أن الشخص الذي يحاول الوصول إلى النظام هو بالفعل من يدعي أنه يكون.",
            },
            {
              title: "كيف تعمل؟",
              content:
                "عند تسجيل الدخول، يتم إنشاء رمز فريد (Token) يثبت هويتك. هذا الرمز يتم إرساله مع كل طلب لتأكيد أنك المستخدم المسجل.",
            },
          ].map((card, index) => (
            <motion.div
              key={index}
              className="p-8 rounded-xl shadow-sm transition-all"
              style={{
                backgroundColor: cardBgColor,
                border: `1px solid ${borderColor}`,
              }}
              variants={item}
              whileHover={{
                y: -5,
                boxShadow:
                  theme.palette.mode === "dark"
                    ? "0 10px 25px -5px rgba(61, 213, 152, 0.2)"
                    : "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
              }}
            >
              <h2
                className="text-2xl font-semibold mb-4"
                style={{ color: primaryColor }}
              >
                {card.title}
              </h2>
              <p className="leading-relaxed" style={{ color: textColor }}>
                {card.content}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Auth Types */}
        <motion.div
          className="p-8 rounded-xl shadow-sm border mb-12"
          style={{
            backgroundColor: cardBgColor,
            borderColor: borderColor,
          }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <motion.h2
            className="text-2xl font-semibold mb-6 text-center"
            style={{ color: primaryColor }}
            whileHover={{ scale: 1.03 }}
          >
            أنظمة المصادقة الشائعة
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: "🔐",
                title: "كلمة المرور",
                desc: "الطريقة التقليدية باستخدام اسم مستخدم وكلمة سر",
              },
              {
                icon: "📲",
                title: "المصادقة الثنائية",
                desc: "طبقة حماية إضافية عبر الهاتف أو التطبيق",
              },
              {
                icon: "👁️",
                title: "البايومتريك",
                desc: "بصمة الأصبع أو التعرف على الوجه",
              },
            ].map((card, index) => (
              <motion.div
                key={index}
                className="text-center p-4 rounded-lg border"
                style={{
                  backgroundColor:
                    theme.palette.mode === "dark" ? "#252525" : "#f8fafc",
                  borderColor: borderColor,
                }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 + 0.5, duration: 0.5 }}
                whileHover={{
                  y: -8,
                  boxShadow:
                    theme.palette.mode === "dark"
                      ? "0 15px 30px -5px rgba(61, 213, 152, 0.3)"
                      : "0 15px 30px -5px rgba(58, 127, 255, 0.3)",
                }}
              >
                <motion.div
                  className="w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4"
                  style={{
                    backgroundColor:
                      theme.palette.mode === "dark"
                        ? "rgba(61, 213, 152, 0.2)"
                        : "rgba(58, 127, 255, 0.2)",
                  }}
                  variants={floatingVariants}
                  animate="float"
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                >
                  <span className="text-2xl">{card.icon}</span>
                </motion.div>
                <h3
                  className="font-medium text-lg mb-2"
                  style={{ color: primaryColor }}
                >
                  {card.title}
                </h3>
                <p className="text-sm" style={{ color: textColor }}>
                  {card.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Logout Button */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <motion.button
            onClick={handleLogout}
            className="px-8 py-3 text-white rounded-lg shadow-lg hover:shadow-xl transition-all font-medium text-lg"
            style={{
              background:
                theme.palette.mode === "dark"
                  ? "linear-gradient(to right, #3dd598, #2ecc71)"
                  : "linear-gradient(to right, #3a7fff, #4f46e5)",
            }}
            whileHover={{
              scale: 1.05,
              background:
                theme.palette.mode === "dark"
                  ? "linear-gradient(to right, #2ecc71, #3dd598)"
                  : "linear-gradient(to right, #4f46e5, #3a7fff)",
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            تسجيل الخروج
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
