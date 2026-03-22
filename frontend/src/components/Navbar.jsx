import React, { useState } from "react";
import {
  AppBar, Toolbar, Typography, Button, Box,
  IconButton, Drawer, List, ListItem, ListItemText,
  useMediaQuery, useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SpaOutlinedIcon from "@mui/icons-material/SpaOutlined";
import { Link, useNavigate } from "react-router-dom";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Assessment", path: "/assessment" },
  { label: "Chatbot", path: "/chatbot" },
  { label: "Volunteers", path: "/volunteers" },
  { label: "Therapists", path: "/therapists" },
];

const Navbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  // ✅ FIX #14: Added logout functionality
  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{ bgcolor: "rgba(255,255,255,0.85)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(0,0,0,0.05)" }}
      >
        <Toolbar sx={{ px: 4, py: 1 }}>
          <Box component={Link} to="/" sx={{ display: "flex", alignItems: "center", textDecoration: "none", flexGrow: 1 }}>
            <SpaOutlinedIcon sx={{ color: "#4A7C6F", mr: 1, fontSize: 28 }} />
            <Typography sx={{ fontWeight: 700, color: "#2E5349", fontSize: "1.2rem", letterSpacing: 0.5 }}>
              MindBloom
            </Typography>
          </Box>

          {!isMobile ? (
            <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
              {navLinks.map((item) => (
                <Button
                  key={item.path}
                  component={Link}
                  to={item.path}
                  sx={{ color: "#2E5349", px: 2, borderRadius: 3, fontWeight: 500, "&:hover": { bgcolor: "#eef5f3" } }}
                >
                  {item.label}
                </Button>
              ))}

              {/* ✅ FIX #14: Show Logout when logged in, Login/Register when not */}
              {isLoggedIn ? (
                <Button
                  variant="outlined"
                  onClick={handleLogout}
                  sx={{ borderRadius: 3, borderColor: "#4A7C6F", color: "#4A7C6F" }}
                >
                  Logout
                </Button>
              ) : (
                <>
                  <Button
                    component={Link} to="/login"
                    variant="outlined"
                    sx={{ borderRadius: 3, borderColor: "#4A7C6F", color: "#4A7C6F" }}
                  >
                    Login
                  </Button>
                  <Button
                    component={Link} to="/roleselect"
                    variant="contained"
                    sx={{ borderRadius: 3, bgcolor: "#4A7C6F", "&:hover": { bgcolor: "#2E5349" } }}
                  >
                    Register
                  </Button>
                </>
              )}
            </Box>
          ) : (
            <IconButton onClick={() => setOpen(true)}>
              <MenuIcon sx={{ color: "#2E5349" }} />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <Box sx={{ width: 250, p: 2 }}>
          <List>
            {navLinks.map((item) => (
              <ListItem
                key={item.path}
                component={Link}
                to={item.path}
                onClick={() => setOpen(false)}
                sx={{ borderRadius: 2, mb: 1, "&:hover": { bgcolor: "#eef5f3" } }}
              >
                <ListItemText primary={item.label} />
              </ListItem>
            ))}

            {isLoggedIn ? (
              <ListItem onClick={() => { handleLogout(); setOpen(false); }} sx={{ cursor: "pointer" }}>
                <ListItemText primary="Logout" />
              </ListItem>
            ) : (
              <>
                <ListItem component={Link} to="/login" onClick={() => setOpen(false)}>
                  <ListItemText primary="Login" />
                </ListItem>
                <ListItem component={Link} to="/roleselect" onClick={() => setOpen(false)}>
                  <ListItemText primary="Register" />
                </ListItem>
              </>
            )}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;