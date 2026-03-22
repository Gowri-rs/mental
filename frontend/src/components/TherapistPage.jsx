import React, { useEffect, useState } from "react";
import { Box, Typography, Grid, Card, CardContent, Button, Divider } from "@mui/material";
import Navbar from "./Navbar";
import API from "../../axiosinterceptor"; // your axios instance
import { useNavigate } from "react-router-dom";

const TherapistsPage = () => {
  const [therapists, setTherapists] = useState([]);
  const navigate = useNavigate();

  const fetchTherapists = async () => {
    try {
      const res = await API.get("/therapists"); // backend route
      setTherapists(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchTherapists();
  }, []);

  const handleBook = (therapistId) => {
    navigate(`/book/therapist/${therapistId}`);
  };

  return (
    <Box sx={{ minHeight: "100vh", background: "#f7fbfa" }}>
      <Navbar />
      <Box sx={{ p: 4 }}>
        <Typography variant="h4" mb={4} fontWeight="bold">
          Approved Therapists
        </Typography>

        <Grid container spacing={4}>
          {therapists.map((therapist) => (
            <Grid item xs={12} sm={6} md={4} key={therapist._id}>
              <Card
                sx={{
                  borderRadius: 4,
                  boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
                  transition: "transform 0.3s",
                  "&:hover": { transform: "translateY(-5px)", boxShadow: "0 12px 25px rgba(0,0,0,0.15)" },
                  overflow: "hidden",
                }}
              >
                {/* Card Header with color */}
                <Box sx={{ height: 8, bgcolor: "#4A7C6F" }} />

                <CardContent>
                  <Typography variant="h6" fontWeight="bold" mb={1}>
                    {therapist.name}
                  </Typography>

                  <Divider sx={{ mb: 1 }} />

                  {therapist.specialization && (
                    <Typography variant="body2" mb={0.5}>
                      <strong>Specialization:</strong> {therapist.specialization}
                    </Typography>
                  )}

                  {therapist.language && (
                    <Typography variant="body2" mb={0.5}>
                      <strong>Language:</strong> {therapist.language}
                    </Typography>
                  )}

                  {therapist.availability && (
                    <Typography variant="body2" mb={0.5}>
                      <strong>Availability:</strong> {therapist.availability}
                    </Typography>
                  )}

                  {therapist.fees && (
                    <Typography variant="body2" mb={1}>
                      <strong>Fees:</strong> ${therapist.fees}
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
                    onClick={() => handleBook(therapist._id)}
                  >
                    Book Therapist
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default TherapistsPage;