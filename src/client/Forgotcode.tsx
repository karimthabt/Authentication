// src/app/auth/forgotcode/page.tsx
"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ForgotCode } from "@/types/Forgotcode";
import { useTheme } from "@mui/material/styles";
import { Box, Typography, Button, TextField } from "@mui/material";
import useForgotcode from "@/hooks/useForgotcode/useForgotcode";

function Forgotcode() {
  const { errors, register, handleSubmit, onSubmit, isLoading } =
    useForgotcode();
  const theme = useTheme();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "grid",
        gridTemplateColumns: { xs: "1fr", lg: "1fr 1fr" },
        backgroundColor: theme.palette.background.default,
      }}
    >
      {/* نموذج إرسال الكود */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          p: 4,
          backgroundColor: theme.palette.background.paper,
        }}
      >
        <Box sx={{ width: "100%", maxWidth: "400px" }}>
          <Typography
            variant="h4"
            component="h1"
            sx={{
              textAlign: "center",
              mb: 4,
              fontWeight: 700,
              color: theme.palette.text.primary,
            }}
          >
            استعادة كلمة المرور
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{ display: "flex", flexDirection: "column", gap: 3 }}
          >
            {ForgotCode.map(({ name, type, placeholder }) => (
              <Box key={name}>
                <TextField
                  fullWidth
                  id={name}
                  type={type}
                  label={placeholder}
                  variant="outlined"
                  error={!!errors[name]}
                  helperText={errors[name]?.message}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "12px",
                      "& fieldset": {
                        borderColor: theme.palette.divider,
                      },
                      "&:hover fieldset": {
                        borderColor: theme.palette.primary.main,
                      },
                    },
                  }}
                  {...register(name)}
                />
              </Box>
            ))}

            <Button
              type="submit"
              variant="contained"
              size="large"
              loading={isLoading}
              sx={{
                borderRadius: "12px",
                py: 1.5,
                fontSize: "1.1rem",
                fontWeight: 600,
                textTransform: "none",
                boxShadow: "none",
                "&:hover": {
                  boxShadow: "none",
                  backgroundColor: theme.palette.primary.dark,
                },
              }}
            >
              {isLoading ? "جارٍ الإرسال..." : "إرسال كلمة المرور"}
            </Button>
          </Box>
        </Box>
      </Box>

      {/* واجهة ترحيبية */}
      <Box
        sx={{
          display: { xs: "none", lg: "flex" },
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          p: 4,
          backgroundColor:
            theme.palette.mode === "dark" ? "#0d47a1" : "#1976d2",
          color: "#fff",
          position: "relative",
          overflow: "hidden",
          "&::before": {
            content: '""',
            position: "absolute",
            top: "-50%",
            right: "-50%",
            width: "200%",
            height: "200%",
            background:
              theme.palette.mode === "dark"
                ? "radial-gradient(circle, rgba(13,71,161,0.8) 0%, rgba(13,71,161,0.6) 100%)"
                : "radial-gradient(circle, rgba(25,118,210,0.8) 0%, rgba(25,118,210,0.6) 100%)",
            borderRadius: "50%",
            zIndex: 1,
          },
        }}
      >
        <Box
          sx={{
            position: "relative",
            zIndex: 2,
            textAlign: "center",
            maxWidth: "400px",
          }}
        >
          <Typography
            variant="h3"
            component="h2"
            sx={{ mb: 3, fontWeight: 700 }}
          >
            مرحباً بك!
          </Typography>

          <Box
            sx={{
              mb: 4,
              display: "flex",
              justifyContent: "center",
              "& img": {
                filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.2))",
              },
            }}
          >
            <Image
              src="/Examssvg.svg"
              alt="Welcome Illustration"
              width={300}
              height={150}
              priority
            />
          </Box>

          <Typography variant="h6" sx={{ mb: 3 }}>
            ليس لديك حساب بعد؟
          </Typography>

          <Button
            component={Link}
            href="/register"
            variant="contained"
            color="secondary"
            sx={{
              px: 4,
              py: 1.5,
              borderRadius: "12px",
              fontSize: "1.1rem",
              fontWeight: 600,
              textTransform: "none",
              boxShadow: "none",
              "&:hover": {
                boxShadow: "none",
                backgroundColor: "#ffb74d",
              },
            }}
          >
            إنشاء حساب جديد
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default Forgotcode;
