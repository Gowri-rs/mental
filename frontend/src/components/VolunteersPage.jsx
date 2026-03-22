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
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";

const VolunteersPage = () => {
  const navigate = useNavigate();

  const [volunteers, setVolunteers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/volunteers")
      .then((res) => {
        setVolunteers(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const filteredVolunteers = volunteers.filter((v) =>
    v.name?.toLowerCase().includes(search.toLowerCase())
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
            Connect with a Volunteer 🌿
          </Typography>

          <Typography sx={{ color: "#4A7C6F" }}>
            Compassionate listeners ready to support you.
          </Typography>
        </Box>

        {/* Search */}
        <TextField
          fullWidth
          size="medium"
          placeholder="Search volunteer"
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
        ) : (
          <Grid container spacing={3}>
            {filteredVolunteers.map((v) => (
              <Grid item xs={12} sm={6} md={4} key={v._id}>
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
                        bgcolor: "#4A7C6F",
                        width: 60,
                        height: 60,
                        mb: 2,
                      }}
                    >
                      {v.name?.charAt(0).toUpperCase()}
                    </Avatar>

                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      sx={{ color: "#2E5349" }}
                    >
                      {v.name}
                    </Typography>

                    <Typography sx={{ color: "#4A7C6F", mb: 1 }}>
                      {v.supportArea}
                    </Typography>

                    <Typography variant="body2" sx={{ mb: 1 }}>
                      Language: {v.language}
                    </Typography>

                    <Chip
                      label={v.availability}
                      size="small"
                      sx={{
                        bgcolor: "#eef5f3",
                        color: "#2E5349",
                        mb: 2,
                      }}
                    />

                    <Button
                      fullWidth
                      variant="contained"
                      startIcon={<PeopleOutlineIcon />}
                      sx={{
                        mt: 2,
                        py: 1.3,
                        borderRadius: 3,
                        bgcolor: "#4A7C6F",
                        "&:hover": {
                          bgcolor: "#2E5349",
                        },
                      }}
                      onClick={() => navigate(`/book/volunteer/${v._id}`)}
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

export default VolunteersPage;