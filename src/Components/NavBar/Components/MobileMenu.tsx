// src/components/MobileMenu.tsx
"use client";
import { Menu, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme } from "@mui/material/styles";
import { usePathname } from "next/navigation";
import { NavLinks } from "./NavLinks";

interface MobileMenuProps {
  anchorElNav: HTMLElement | null;
  handleOpenNavMenu: (event: React.MouseEvent<HTMLElement>) => void;
  handleCloseNavMenu: () => void;
  pages: { name: string; path: string }[];
}

export const MobileMenu = ({
  anchorElNav,
  handleOpenNavMenu,
  handleCloseNavMenu,
  pages,
}: MobileMenuProps) => {
  const theme = useTheme();
  const pathname = usePathname();

  return (
    <>
      <IconButton
        size="large"
        onClick={handleOpenNavMenu}
        color="inherit"
        sx={{
          "&:hover": {
            backgroundColor:
              theme.palette.mode === "dark"
                ? "rgba(255,255,255,0.1)"
                : "rgba(0,0,0,0.1)",
          },
        }}
      >
        <MenuIcon />
      </IconButton>
      <Menu
        anchorEl={anchorElNav}
        open={Boolean(anchorElNav)}
        onClose={handleCloseNavMenu}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiPaper-root": {
            backgroundColor:
              theme.palette.mode === "dark" ? "#2A2A2A" : "#ffffff",
            minWidth: "200px",
            borderRadius: "12px",
          },
        }}
        MenuListProps={{ sx: { py: 0 } }}
      >
        <NavLinks 
          pages={pages} 
          pathname={pathname} 
          isMobile 
          onClose={handleCloseNavMenu}
        />
      </Menu>
    </>
  );
};