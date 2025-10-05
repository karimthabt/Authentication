// src/components/UserMenu.tsx
"use client";
import { Menu, MenuItem, Avatar, IconButton, Tooltip } from "@mui/material";
import { Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

interface UserMenuProps {
  anchorElUser: HTMLElement | null;
  handleOpenUserMenu: (event: React.MouseEvent<HTMLElement>) => void;
  handleCloseUserMenu: () => void;
  handleLogout: () => void;
  userName?: string;
  userImage?: string;
  go: (path: string) => void;
}

export const UserMenu = ({
  anchorElUser,
  handleOpenUserMenu,
  handleCloseUserMenu,
  handleLogout,
  userName,
  userImage,
  go,
}: UserMenuProps) => {
  const theme = useTheme();

  return (
    <>
      <Tooltip title="إعدادات الحساب">
        <IconButton
          onClick={handleOpenUserMenu}
          sx={{
            p: 0,
            "&:hover": {
              transform: "scale(1.1)",
              transition: "transform 0.2s ease",
            },
          }}
        >
          <Avatar
            alt={userName || "User"}
            src={userImage || "/default-avatar.png"}
            sx={{
              width: 42,
              height: 42,
              border: "2px solid #3dd598",
              "&:hover": {
                boxShadow: "0 0 10px rgba(61, 213, 152, 0.5)",
              },
            }}
          />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{
          mt: "60px",
          "& .MuiPaper-root": {
            backgroundColor: theme.palette.mode === "dark" ? "#2A2A2A" : "#ffffff",
            color: theme.palette.text.primary,
            minWidth: "200px",
            boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
            borderRadius: "12px",
            overflow: "hidden",
          },
        }}
        anchorEl={anchorElUser}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem
          onClick={() => {
            handleCloseUserMenu();
            go("/profile");
          }}
          sx={{
            "&:hover": {
              backgroundColor:
                theme.palette.mode === "dark"
                  ? "rgba(255,255,255,0.1)"
                  : "rgba(0,0,0,0.05)",
            },
            py: 1.5,
          }}
        >
          <Typography
            textAlign="center"
            sx={{
              fontFamily: "'Tajawal', sans-serif",
              fontSize: "0.95rem",
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 1,
              color: "#3dd598",
            }}
          >
            الملف الشخصي
          </Typography>
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleCloseUserMenu();
            handleLogout();
          }}
          sx={{
            "&:hover": {
              backgroundColor:
                theme.palette.mode === "dark"
                  ? "rgba(255,255,255,0.1)"
                  : "rgba(0,0,0,0.05)",
            },
            py: 1.5,
          }}
        >
          <Typography
            textAlign="center"
            sx={{
              fontFamily: "'Tajawal', sans-serif",
              fontSize: "0.95rem",
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 1,
              color: "#ff6b6b",
            }}
          >
            تسجيل الخروج
          </Typography>
        </MenuItem>
      </Menu>
    </>
  );
};