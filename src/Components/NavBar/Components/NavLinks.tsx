"use client";
import { Button, MenuItem, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useRouter } from "next/navigation";

interface NavLinksProps {
  pages: { name: string; path: string }[];
  pathname: string;
  isMobile?: boolean;
  onClose?: () => void;
}

export const NavLinks = ({
  pages,
  pathname,
  isMobile = false,
  onClose,
}: NavLinksProps) => {
  const theme = useTheme();
  const router = useRouter();

  const handleClick = (path: string) => {
    router.push(path);
    onClose?.();
  };

  if (isMobile) {
    return (
      <>
        {pages.map((page) => (
          <MenuItem
            key={page.name}
            onClick={() => handleClick(page.path)}
            sx={{
              "&:hover": {
                backgroundColor:
                  theme.palette.mode === "dark"
                    ? "rgba(255,255,255,0.1)"
                    : "rgba(0,0,0,0.05)",
              },
              borderBottom:
                theme.palette.mode === "dark"
                  ? "1px solid rgba(255,255,255,0.05)"
                  : "1px solid rgba(0,0,0,0.05)",
              py: 2,
            }}
          >
            <Typography
              className="!text-xl"
              textAlign="center"
              sx={{
                fontWeight: pathname === page.path ? 700 : 400,
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >

              {page.name}
            </Typography>
          </MenuItem>
        ))}
      </>
    );
  }

  return (
    <>
      {pages.map((page) => (
        <Button
          key={page.name}
          onClick={() => handleClick(page.path)}
          sx={{
            mx: 2,
            color:
              pathname === page.path ? "#3dd598" : theme.palette.primary.contrastText,
            fontSize: "1.1rem",
            fontWeight: pathname === page.path ? 600 : 400,
            fontFamily: "'Tajawal', sans-serif",
            textTransform: "none",
            letterSpacing: "0.5px",
            "&:hover": {
              color: "#3dd598",
              backgroundColor: "transparent",
            },
            position: "relative",
            "&::after": {
              content: '""',
              position: "absolute",
              bottom: 0,
              left: 0,
              width: pathname === page.path ? "100%" : "0",
              height: "2px",
              backgroundColor: "#3dd598",
              transition: "width 0.3s ease",
            },
            "&:hover::after": {
              width: "100%",
            },
          }}
        >
          { page.name}
        </Button>
      ))}
    </>
  );
};
