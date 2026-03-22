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

const Register = () => {
  const [params] = useSearchParams();
  const role = params.get("role") || "user";

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    experience: "",
    supportArea: "",
    language: "",
    qualification: "",
    license: "",
    specialization: "",
    consultationFee: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!formData.name || !formData.email || !formData.password) {
      setError("Name, Email and Password are required");
      return;
    }

    setLoading(true);
    try {
      const response = await registerUser({ ...formData, role }); // Make sure registerUser is defined/imported
      setSuccess(response.data.message);

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      }

      setTimeout(() => {
        navigate(`/login?role=${role}`);
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
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
                Create Account
              </Typography>
              <Typography sx={{ color: "#6b8b83" }}>
                Register as {role}
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
            {success && (
              <Alert
                severity="success"
                sx={{
                  mb: 3,
                  borderRadius: 3,
                }}
              >
                {success}
              </Alert>
            )}

            <Box component="form" onSubmit={handleSubmit}>
              <Stack spacing={3}>
                <TextField
                  fullWidth
                  label="Full Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 3,
                      bgcolor: "#fff",
                    },
                  }}
                />

                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
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
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
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

                {role === "volunteer" && (
                  <>
                    <TextField
                      fullWidth
                      label="Phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 3,
                          bgcolor: "#fff",
                        },
                      }}
                    />
                    <TextField
                      fullWidth
                      label="Support Area"
                      name="supportArea"
                      value={formData.supportArea}
                      onChange={handleChange}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 3,
                          bgcolor: "#fff",
                        },
                      }}
                    />
                    <TextField
                      fullWidth
                      label="Experience"
                      name="experience"
                      value={formData.experience}
                      onChange={handleChange}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 3,
                          bgcolor: "#fff",
                        },
                      }}
                    />
                  </>
                )}

                {role === "therapist" && (
                  <>
                    <TextField
                      fullWidth
                      label="Qualification"
                      name="qualification"
                      value={formData.qualification}
                      onChange={handleChange}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 3,
                          bgcolor: "#fff",
                        },
                      }}
                    />
                    <TextField
                      fullWidth
                      label="License Number"
                      name="license"
                      value={formData.license}
                      onChange={handleChange}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 3,
                          bgcolor: "#fff",
                        },
                      }}
                    />
                    <TextField
                      fullWidth
                      label="Specialization"
                      name="specialization"
                      value={formData.specialization}
                      onChange={handleChange}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 3,
                          bgcolor: "#fff",
                        },
                      }}
                    />
                    <TextField
                      fullWidth
                      label="Consultation Fee"
                      name="consultationFee"
                      value={formData.consultationFee}
                      onChange={handleChange}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 3,
                          bgcolor: "#fff",
                        },
                      }}
                    />
                  </>
                )}

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
                    "Register"
                  )}
                </Button>

                <Typography textAlign="center" sx={{ color: "#6b8b83" }}>
                  Already have an account?{" "}
                  <Button
                    component={Link}
                    to={`/login?role=${role}`}
                    sx={{
                      textTransform: "none",
                      color: "#4A7C6F",
                      fontWeight: 700,
                    }}
                  >
                    Login
                  </Button>
                </Typography>
              </Stack>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default Register;