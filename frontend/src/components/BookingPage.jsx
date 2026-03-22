import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
} from "@mui/material";

// ✅ FIXED: Correct import path for axiosinterceptor
import API from "../../axiosinterceptor";

import { useParams, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const BookingPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    date: "",
    time: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleBooking = async () => {
    try {
      const res = await API.post("/bookings", {
        personId: id,
        ...form,
      });

      alert("Booking successful");
      navigate("/");
    } catch (err) {
      console.log(err);
      alert("Booking failed");
    }
  };

  return (
    <Box>
      <Navbar />

      <Container maxWidth="sm" sx={{ py: 5 }}>
        <Card>
          <CardContent>
            <Typography variant="h5" mb={3}>
              Book Session
            </Typography>

            <TextField
              fullWidth
              label="Your Name"
              name="name"
              margin="normal"
              onChange={handleChange}
            />

            <TextField
              fullWidth
              type="date"
              name="date"
              margin="normal"
              InputLabelProps={{ shrink: true }}
              onChange={handleChange}
            />

            <TextField
              fullWidth
              type="time"
              name="time"
              margin="normal"
              InputLabelProps={{ shrink: true }}
              onChange={handleChange}
            />

            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3 }}
              onClick={handleBooking}
            >
              Confirm Booking
            </Button>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default BookingPage;