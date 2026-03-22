import React from "react";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Avatar,
  LinearProgress,
  Stack,
  Fade,
  Paper,
} from "@mui/material";

import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import MedicalServicesOutlinedIcon from "@mui/icons-material/MedicalServicesOutlined";

import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const ResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Assuming 6 questions with max score 5 each = 30
  const score = location.state?.score || 0;
  const maxScore = 30; 

  let result = {};
  let action = {};

  if (score <= 10) {
    result = {
      title: "Mild Emotional Stress",
      message:
        "Your responses suggest mild emotional strain. Gentle support, mindful breathing, and consistent self-care may help you regain your balance.",
      color: "#4A7C6F",
      icon: <PsychologyOutlinedIcon sx={{ fontSize: 40 }} />,
    };
    action = { label: "Talk with AI Companion", route: "/chatbot" };
  } else if (score <= 20) {
    result = {
      title: "Moderate Emotional Difficulty",
      message:
        "It sounds like things have been heavy lately. Connecting with a supportive community or a volunteer can provide the perspective you need.",
      color: "#C9847A",
      icon: <PeopleOutlineIcon sx={{ fontSize: 40 }} />,
    };
    action = { label: "Connect with a Volunteer", route: "/volunteers" };
  } else {
    result = {
      title: "Support Recommended",
      message:
        "You're carrying a lot right now. Speaking with a professional therapist can provide a safe, structured way to navigate these challenges.",
      color: "#D4A84B",
      icon: <MedicalServicesOutlinedIcon sx={{ fontSize: 40 }} />,
    };
    action = { label: "Find a Therapist", route: "/therapists" };
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f0f7f4 0%, #ffffff 100%)",
        pb: 8,
      }}
    >
      <Navbar />

      <Container maxWidth="sm" sx={{ pt: { xs: 4, md: 10 } }}>
        <Fade in={true} timeout={800}>
          <Card
            sx={{
              borderRadius: 8,
              textAlign: "center",
              boxShadow: "0 25px 50px rgba(46, 83, 73, 0.12)",
              border: "1px solid #e0ede9",
              overflow: "visible", // Allows the icon to pop out slightly if needed
              bgcolor: "rgba(255, 255, 255, 0.9)",
              backdropFilter: "blur(10px)",
            }}
          >
            <CardContent sx={{ p: { xs: 4, md: 6 } }}>
              {/* Animated Icon Header */}
              <Avatar
                sx={{
                  bgcolor: result.color,
                  width: 90,
                  height: 90,
                  mx: "auto",
                  mb: 3,
                  boxShadow: `0 10px 20px ${result.color}44`,
                }}
              >
                {result.icon}
              </Avatar>

              <Typography
                variant="h6"
                sx={{ color: "#4A7C6F", fontWeight: 600, letterSpacing: 1.2, mb: 1 }}
              >
                YOUR ASSESSMENT RESULT
              </Typography>

              <Box sx={{ my: 3 }}>
                <Typography
                  variant="h2"
                  fontWeight="800"
                  sx={{ color: result.color, lineHeight: 1 }}
                >
                  {score}
                </Typography>
                <Typography variant="subtitle1" sx={{ color: "#99b2ab", fontWeight: 600 }}>
                  out of {maxScore}
                </Typography>
              </Box>

              {/* Progress Bar Section */}
              <Box sx={{ width: "100%", mb: 4 }}>
                <LinearProgress
                  variant="determinate"
                  value={(score / maxScore) * 100}
                  sx={{
                    height: 12,
                    borderRadius: 6,
                    bgcolor: "#f0f0f0",
                    "& .MuiLinearProgress-bar": {
                      bgcolor: result.color,
                      borderRadius: 6,
                    },
                  }}
                />
              </Box>

              <Paper
                elevation={0}
                sx={{
                  bgcolor: `${result.color}08`,
                  p: 3,
                  borderRadius: 4,
                  border: `1px dashed ${result.color}44`,
                  mb: 4,
                }}
              >
                <Typography
                  variant="h5"
                  fontWeight="bold"
                  sx={{ color: "#1A332C", mb: 1.5 }}
                >
                  {result.title}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: "#4A7C6F", lineHeight: 1.7, fontSize: "1.05rem" }}
                >
                  {result.message}
                </Typography>
              </Paper>

              {/* Actions */}
              <Stack spacing={2}>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => navigate(action.route)}
                  sx={{
                    bgcolor: result.color,
                    py: 2,
                    borderRadius: 4,
                    fontWeight: "800",
                    fontSize: "1.1rem",
                    textTransform: "none",
                    boxShadow: `0 8px 20px ${result.color}44`,
                    "&:hover": {
                      bgcolor: result.color,
                      filter: "brightness(0.9)",
                      transform: "translateY(-2px)",
                    },
                    transition: "all 0.2s",
                  }}
                >
                  {action.label}
                </Button>

                <Button
                  variant="text"
                  fullWidth
                  onClick={() => navigate("/assessment")}
                  sx={{
                    color: "#4A7C6F",
                    fontWeight: "600",
                    textTransform: "none",
                    "&:hover": { bgcolor: "transparent", color: "#2E5349" },
                  }}
                >
                  Retake the Assessment
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </Fade>

        {/* Support Disclaimer */}
        <Typography
          variant="caption"
          display="block"
          sx={{ textAlign: "center", mt: 4, color: "#99b2ab", px: 4 }}
        >
          Note: This assessment is a tool for self-reflection and is not a clinical diagnosis. 
          If you are in immediate distress, please contact emergency services.
        </Typography>
      </Container>
    </Box>
  );
};

export default ResultPage;