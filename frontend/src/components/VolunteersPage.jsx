import React, { useState } from "react";
import { Box, Container, TextField, Button, Typography, Alert } from "@mui/material";
import API from "../../axiosinterceptor"; // axios instance

const VolunteerRegister = () => {
  const [formData, setFormData] = useState({
    name: "", supportArea: "", language: "", availability: "", experience: ""
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); setSuccess("");
    try {
      const res = await API.post("/volunteers/add", formData);
      setSuccess(res.data.message);
      setFormData({ name: "", supportArea: "", language: "", availability: "", experience: "" });
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", py: 8, background: "#f7fbfa" }}>
      <Container maxWidth="sm">
        <Typography variant="h4" mb={3} fontWeight="bold">Volunteer Registration</Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

        <form onSubmit={handleSubmit}>
          {["name","supportArea","language","availability","experience"].map(field => (
            <TextField
              key={field}
              name={field}
              label={field.charAt(0).toUpperCase() + field.slice(1)}
              value={formData[field]}
              onChange={handleChange}
              fullWidth
              sx={{ mb: 2 }}
            />
          ))}

          <Button type="submit" variant="contained" fullWidth sx={{ py:1.5, bgcolor:"#4A7C6F", "&:hover":{bgcolor:"#2E5349"} }}>
            Register
          </Button>
        </form>
      </Container>
    </Box>
  );
};

export default VolunteerRegister;