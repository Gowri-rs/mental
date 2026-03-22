import React from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Stack,
  Avatar,
} from "@mui/material";

import SpaOutlinedIcon from "@mui/icons-material/SpaOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import MedicalServicesOutlinedIcon from "@mui/icons-material/MedicalServicesOutlined";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

import { Link } from "react-router-dom";
import Navbar from "./Navbar";

const features = [
  {
    icon: <PsychologyOutlinedIcon sx={{ fontSize: 36 }} />,
    title: "Self Assessment",
    desc: "Take our scientifically-designed emotional wellness quiz.",
    color: "#4A7C6F",
  },
  {
    icon: <AutoAwesomeIcon sx={{ fontSize: 36 }} />,
    title: "AI Chatbot Support",
    desc: "24/7 emotional support and wellness tips.",
    color: "#C9847A",
  },
  {
    icon: <PeopleOutlineIcon sx={{ fontSize: 36 }} />,
    title: "Volunteer Network",
    desc: "Connect with trained community volunteers.",
    color: "#5B85A8",
  },
  {
    icon: <MedicalServicesOutlinedIcon sx={{ fontSize: 36 }} />,
    title: "Licensed Therapists",
    desc: "Book certified mental health professionals.",
    color: "#D4A84B",
  },
];

const stats = [
  { value: "10,000+", label: "Users Supported" },
  { value: "500+", label: "Volunteers" },
  { value: "150+", label: "Therapists" },
  { value: "98%", label: "Satisfaction" },
];

const Home = () => {
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f9fbfa" }}>
      <Navbar />

      {/* Hero */}
      <Box
        sx={{
          background:
            "linear-gradient(135deg, #2E5349 0%, #4A7C6F 50%, #6FA898 100%)",
          color: "white",
          py: 12,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Container maxWidth="md" sx={{ textAlign: "center" }}>
          <Avatar
            sx={{
              bgcolor: "rgba(255,255,255,0.15)",
              width: 80,
              height: 80,
              mx: "auto",
              mb: 3,
            }}
          >
            <SpaOutlinedIcon sx={{ fontSize: 42 }} />
          </Avatar>

          <Typography variant="h3" fontWeight="bold" mb={2}>
            You Deserve to Feel Better 🌿
          </Typography>

          <Typography sx={{ mb: 4, opacity: 0.9 }}>
            MindBloom helps you assess, connect, and heal through
            emotional wellness support.
          </Typography>

          <Stack direction="row" spacing={2} justifyContent="center">
            <Button
              component={Link}
              to="/roleselect"
              variant="contained"
              sx={{
                bgcolor: "white",
                color: "#2E5349",
                borderRadius: 3,
                px: 4,
                fontWeight: "bold",
              }}
            >
              Get Started
            </Button>

            <Button
              component={Link}
              to="/login"
              variant="outlined"
              sx={{
                borderColor: "white",
                color: "white",
                borderRadius: 3,
                px: 4,
              }}
            >
              Login
            </Button>
          </Stack>
        </Container>
      </Box>

      {/* Stats */}
      <Container sx={{ py: 7 }}>
        <Grid container spacing={3}>
          {stats.map((item, index) => (
            <Grid item xs={6} md={3} key={index}>
              <Card
                sx={{
                  borderRadius: 4,
                  boxShadow: "0 8px 20px rgba(0,0,0,0.06)",
                  textAlign: "center",
                }}
              >
                <CardContent>
                  <Typography
                    variant="h4"
                    fontWeight="bold"
                    sx={{ color: "#2E5349" }}
                  >
                    {item.value}
                  </Typography>

                  <Typography sx={{ color: "#4A7C6F" }}>
                    {item.label}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Features */}
      <Container sx={{ py: 8 }}>
        <Typography
          variant="h4"
          textAlign="center"
          fontWeight="bold"
          mb={5}
          sx={{ color: "#2E5349" }}
        >
          Our Features
        </Typography>

        <Grid container spacing={3}>
          {features.map((item, index) => (
            <Grid item xs={12} md={3} key={index}>
              <Card
                sx={{
                  height: "100%",
                  borderRadius: 5,
                  boxShadow: "0 10px 24px rgba(0,0,0,0.08)",
                  transition: "0.3s",
                  "&:hover": {
                    transform: "translateY(-6px)",
                  },
                }}
              >
                <CardContent sx={{ textAlign: "center", p: 4 }}>
                  <Box sx={{ color: item.color, mb: 2 }}>{item.icon}</Box>

                  <Typography variant="h6" fontWeight="bold" mb={1}>
                    {item.title}
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    {item.desc}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Support */}
      <Container sx={{ py: 8 }}>
        <Typography
          variant="h4"
          textAlign="center"
          fontWeight="bold"
          mb={5}
          sx={{ color: "#2E5349" }}
        >
          How We Support You
        </Typography>

        <Grid container spacing={3}>
          {[
            {
              title: "Users",
              desc: "Assessment, chatbot, volunteers, therapy",
            },
            {
              title: "Volunteers",
              desc: "Support users and build community care",
            },
            {
              title: "Therapists",
              desc: "Professional sessions and consultation",
            },
          ].map((item, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card
                sx={{
                  borderRadius: 5,
                  boxShadow: "0 8px 20px rgba(0,0,0,0.06)",
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <Typography
                    fontWeight="bold"
                    sx={{ color: "#2E5349", mb: 1 }}
                  >
                    {item.title}
                  </Typography>

                  <Typography sx={{ color: "#4A7C6F" }}>
                    {item.desc}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Footer */}
      <Box
        sx={{
          bgcolor: "#1E3530",
          color: "white",
          py: 5,
          textAlign: "center",
        }}
      >
        <Typography variant="h6">MindBloom</Typography>
        <Typography variant="body2">
          Safe space for mental wellness 🌿
        </Typography>
      </Box>
    </Box>
  );
};

export default Home;