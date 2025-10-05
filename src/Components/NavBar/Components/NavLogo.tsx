// src/components/NavLogo.tsx
"use client";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useRouter } from "next/navigation";

interface NavLogoProps {
  isMobile?: boolean;
}

export const NavLogo = ({ isMobile = false }: NavLogoProps) => {
  const theme = useTheme();
  const router = useRouter();

  return (
    <Box
      sx={{
        display: {
          xs: isMobile ? "flex" : "none",
          md: isMobile ? "none" : "flex",
        },
        alignItems: "center",
        mr: 3,
        cursor: "pointer",
        flexGrow: isMobile ? 1 : 0,
      }}
      onClick={() => router.push("/")}
    >
      <Typography
        style={{
          objectFit: "contain",
          filter:
            theme.palette.mode === "dark" ? "brightness(0) invert(1)" : "none",
          transition: "transform 0.3s ease",
          color: theme.palette.primary.contrastText,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "rotate(5deg)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "rotate(0deg)";
        }}  
        variant="h6"
      >
        Authentications
      </Typography>
    </Box>
  );
};
