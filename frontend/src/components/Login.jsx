import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Alert,
  CircularProgress,
  Chip,
  InputAdornment,
  IconButton,
  Stack,
} from "@mui/material";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import { useNavigate, useSearchParams, Link } from "react-router-dom";
import Navbar from "./Navbar";

const Login = () => {
  const [params] = useSearchParams();
  const role = params.get("role") || "user";

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!email || !password) {
      setError("Email and Password are required");
      return;
    }

    setLoading(true);

    try {
      const response = await loginUser({
        email,
        password,
        role,
      });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      if (role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #eef5f3 0%, #f7fbfa 50%, #dfeee9 100%)",
      }}
    >
      <Navbar />

      <Container maxWidth="sm" sx={{ py: 8 }}>
        <Card
          sx={{
            borderRadius: 5,
            boxShadow: "0 12px 30px rgba(0,0,0,0.06)",
            bgcolor: "rgba(255,255,255,0.88)",
            backdropFilter: "blur(8px)",
          }}
        >
          <CardContent sx={{ p: 5 }}>
            <Box textAlign="center" mb={4}>
              <Chip
                label={role.toUpperCase()}
                sx={{
                  mb: 2,
                  bgcolor: "#e8f3ef",
                  color: "#4A7C6F",
                  fontWeight: 700,
                }}
              />

              <Typography
                variant="h4"
                fontWeight="bold"
                sx={{ color: "#2E5349", mb: 1 }}
              >
                Welcome Back 🌿
              </Typography>

              <Typography sx={{ color: "#6b8b83" }}>
                Login as {role}
              </Typography>
            </Box>

            {error && (
              <Alert
                severity="error"
                sx={{
                  mb: 3,
                  borderRadius: 3,
                }}
              >
                {error}
              </Alert>
            )}

            <Box component="form" onSubmit={handleSubmit}>
              <Stack spacing={3}>
                <TextField
                  fullWidth
                  label="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 3,
                      bgcolor: "#fff",
                    },
                  }}
                />

                <TextField
                  fullWidth
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 3,
                      bgcolor: "#fff",
                    },
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                <Button
                  fullWidth
                  variant="contained"
                  type="submit"
                  sx={{
                    py: 1.6,
                    borderRadius: 3,
                    bgcolor: "#4A7C6F",
                    fontWeight: "bold",
                    textTransform: "none",
                    fontSize: "1rem",
                    "&:hover": {
                      bgcolor: "#2E5349",
                    },
                  }}
                >
                  {loading ? (
                    <CircularProgress size={24} sx={{ color: "white" }} />
                  ) : (
                    "Login"
                  )}
                </Button>

                {role !== "admin" && (
                  <Typography textAlign="center" sx={{ color: "#6b8b83" }}>
                    Don’t have an account?{" "}
                    <Button
                      component={Link}
                      to={`/register?role=${role}`}
                      sx={{
                        textTransform: "none",
                        color: "#4A7C6F",
                        fontWeight: 700,
                      }}
                    >
                      Register
                    </Button>
                  </Typography>
                )}
              </Stack>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default Login;