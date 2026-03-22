import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Avatar,
  TextField,
  LinearProgress,
  InputAdornment,
  Chip,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import MedicalServicesOutlinedIcon from "@mui/icons-material/MedicalServicesOutlined";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";

const TherapistsPage = () => {
  const navigate = useNavigate();

  const [therapists, setTherapists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/therapists")
      .then((res) => {
        setTherapists(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const filteredTherapists = therapists.filter((t) =>
    t.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #eef5f3 0%, #f7fbfa 50%, #dfeee9 100%)",
      }}
    >
      <Navbar />

      <Container sx={{ py: 5 }}>
        {/* Header */}
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{ color: "#2E5349", mb: 1 }}
          >
            Licensed Therapists 🩺
          </Typography>

          <Typography sx={{ color: "#4A7C6F" }}>
            Professional support tailored to your emotional wellbeing.
          </Typography>
        </Box>

        {/* Search */}
        <TextField
          fullWidth
          placeholder="Search therapist"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{
            mb: 4,
            "& .MuiOutlinedInput-root": {
              borderRadius: 4,
              bgcolor: "white",
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "#4A7C6F" }} />
              </InputAdornment>
            ),
          }}
        />

        {loading ? (
          <LinearProgress
            sx={{
              height: 8,
              borderRadius: 4,
              "& .MuiLinearProgress-bar": {
                bgcolor: "#4A7C6F",
              },
            }}
          />
        ) : filteredTherapists.length === 0 ? (
          <Typography textAlign="center" sx={{ color: "#4A7C6F" }}>
            No therapists found
          </Typography>
        ) : (
          <Grid container spacing={3}>
            {filteredTherapists.map((t) => (
              <Grid item xs={12} sm={6} md={4} key={t._id}>
                <Card
                  sx={{
                    borderRadius: 5,
                    height: "100%",
                    boxShadow: "0 10px 24px rgba(0,0,0,0.08)",
                    bgcolor: "rgba(255,255,255,0.85)",
                    transition: "0.3s",
                    "&:hover": {
                      transform: "translateY(-6px)",
                    },
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Avatar
                      sx={{
                        bgcolor: "#2E5349",
                        width: 60,
                        height: 60,
                        mb: 2,
                      }}
                    >
                      {t.name?.charAt(0).toUpperCase()}
                    </Avatar>

                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      sx={{ color: "#2E5349" }}
                    >
                      {t.name}
                    </Typography>

                    <Typography sx={{ color: "#4A7C6F", mb: 1 }}>
                      {t.specialization}
                    </Typography>

                    <Chip
                      label={`${t.experience} experience`}
                      size="small"
                      sx={{
                        bgcolor: "#eef5f3",
                        color: "#2E5349",
                        mb: 1,
                      }}
                    />

                    <Typography variant="body2" sx={{ mb: 2 }}>
                      Language: {t.language}
                    </Typography>

                    <Button
                      fullWidth
                      variant="contained"
                      startIcon={<MedicalServicesOutlinedIcon />}
                      sx={{
                        py: 1.3,
                        borderRadius: 3,
                        bgcolor: "#2E5349",
                        "&:hover": {
                          bgcolor: "#1E3530",
                        },
                      }}
                      onClick={() => navigate(`/book/therapist/${t._id}`)}
                    >
                      Book Session
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default TherapistsPage;