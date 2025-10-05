// src/components/NavBar.tsx
"use client";
import { AppBar, Box, Container, Toolbar } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import useNavBar from "../../hooks/useNavBar/useNavBar";
import { NavLogo } from "./Components/NavLogo";
import { MobileMenu } from "./Components/MobileMenu";
import { UserMenu } from "./Components/UserMenu";
import { NavLinks } from "./Components/NavLinks";
import { ThemeToggle } from "./Components/ThemeToggle";
import { usePathname } from "next/navigation";

export function NavBar() {
  const theme = useTheme();
  const {
    go,
    isAuth,
    handleLogout,
    anchorElNav,
    anchorElUser,
    handleOpenNavMenu,
    handleCloseNavMenu,
    handleCloseUserMenu,
    handleOpenUserMenu,
    data,
    pages,
  } = useNavBar();
  const pathname = usePathname(); // أضفنا هذا السطر

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor:
          theme.palette.mode === "dark" ? "#253348" : "rgba(58, 127, 255, 0.9)",
        backdropFilter: "blur(10px)",
        boxShadow: "0px 0px 6px 5px rgba(0,0,0,0.1)",
        borderBottom:
          theme.palette.mode === "dark"
            ? "1px solid rgba(255,255,255,0.1)"
            : "1px solid rgba(0,0,0,0.1)",
        transition: "all 0.3s ease",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{
            py: 1,
          }}
        >
          {/* Desktop Logo */}
          <NavLogo />

          {/* Mobile Menu */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <MobileMenu
              anchorElNav={anchorElNav}
              handleOpenNavMenu={handleOpenNavMenu}
              handleCloseNavMenu={handleCloseNavMenu}
              pages={pages}
            />
          </Box>

          {/* Mobile Logo */}
          <NavLogo isMobile />

          {/* Desktop Nav Links */}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "center",
              ml: -12,
            }}
          >
            <NavLinks pathname={pathname} pages={pages} />
          </Box>

          {/* Theme Toggle and User Menu */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <ThemeToggle />
            {isAuth && (
              <UserMenu
                anchorElUser={anchorElUser}
                handleOpenUserMenu={handleOpenUserMenu}
                handleCloseUserMenu={handleCloseUserMenu}
                handleLogout={handleLogout}
                userName={data?.userName}
                userImage={data?.image}
                go={go}
              />
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
