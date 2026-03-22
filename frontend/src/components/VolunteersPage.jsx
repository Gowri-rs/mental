import React, { useEffect, useState } from "react";
import {
  Box, Typography, Grid, Card, CardContent,
  Button, Divider, CircularProgress, Container,
} from "@mui/material";
import Navbar from "./Navbar";
import API from "../../axiosinterceptor";
import { useNavigate } from "react-router-dom";

// ✅ FIX #2: This page now shows approved volunteers to users (not a registration form)
// The registration form was wrong here — /volunteers should be a browse page
const VolunteersPage = () => {
  const [volunteers, setVolunteers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    API.get("/volunteers")
      .then((res) => setVolunteers(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const handleBook = (volunteerId) => {
    navigate(`/book/volunteer/${volunteerId}`);
  };

  return (
    <Box sx={{ minHeight: "100vh", background: "#f7fbfa" }}>
      <Navbar />
      <Container maxWidth="lg" sx={{ py: 5 }}>
        <Typography variant="h4" mb={4} fontWeight="bold" sx={{ color: "#2E5349" }}>
          Connect with a Volunteer 🌿
        </Typography>

        {loading ? (
          <Box display="flex" justifyContent="center" py={8}>
            <CircularProgress sx={{ color: "#4A7C6F" }} />
          </Box>
        ) : volunteers.length === 0 ? (
          <Typography color="text.secondary">No approved volunteers available yet.</Typography>
        ) : (
          <Grid container spacing={4}>
            {volunteers.map((volunteer) => (
              <Grid item xs={12} sm={6} md={4} key={volunteer._id}>
                <Card
                  sx={{
                    borderRadius: 4,
                    boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
                    transition: "transform 0.3s",
                    "&:hover": { transform: "translateY(-5px)", boxShadow: "0 12px 25px rgba(0,0,0,0.15)" },
                    overflow: "hidden",
                  }}
                >
                  <Box sx={{ height: 8, bgcolor: "#4A7C6F" }} />
                  <CardContent>
                    <Typography variant="h6" fontWeight="bold" mb={1}>
                      {volunteer.name}
                    </Typography>
                    <Divider sx={{ mb: 1 }} />

                    {volunteer.supportArea && (
                      <Typography variant="body2" mb={0.5}>
                        <strong>Support Area:</strong> {volunteer.supportArea}
                      </Typography>
                    )}
                    {volunteer.language && (
                      <Typography variant="body2" mb={0.5}>
                        <strong>Language:</strong> {volunteer.language}
                      </Typography>
                    )}
                    {volunteer.availability && (
                      <Typography variant="body2" mb={0.5}>
                        <strong>Availability:</strong> {volunteer.availability}
                      </Typography>
                    )}
                    {volunteer.experience && (
                      <Typography variant="body2" mb={1}>
                        <strong>Experience:</strong> {volunteer.experience}
                      </Typography>
                    )}

                    <Button
                      variant="contained"
                      fullWidth
                      sx={{
                        mt: 2,
                        backgroundColor: "#4A7C6F",
                        "&:hover": { backgroundColor: "#2E5349" },
                        borderRadius: 2,
                        fontWeight: "bold",
                      }}
                      onClick={() => handleBook(volunteer._id)}
                    >
                      Book Session
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        {/* Volunteer Registration Link */}
        <Box mt={6} textAlign="center">
          <Typography color="text.secondary" mb={1}>
            Want to become a volunteer?
          </Typography>
          <Button
            variant="outlined"
            sx={{ borderColor: "#4A7C6F", color: "#4A7C6F", borderRadius: 3 }}
            onClick={() => navigate("/register?role=volunteer")}
          >
            Register as Volunteer
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default VolunteersPage;