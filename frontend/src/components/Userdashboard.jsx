import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  CircularProgress,
  Avatar,
} from "@mui/material";

import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import SmartToyOutlinedIcon from "@mui/icons-material/SmartToyOutlined";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import MedicalServicesOutlinedIcon from "@mui/icons-material/MedicalServicesOutlined";

import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";

const actions = [
  { title: "Take Assessment", icon: <AssignmentOutlinedIcon />, path: "/assessment", color: "#4A7C6F" },
  { title: "Chatbot", icon: <SmartToyOutlinedIcon />, path: "/chatbot", color: "#5B85A8" },
  { title: "Volunteers", icon: <PeopleOutlineIcon />, path: "/volunteers", color: "#C9847A" },
  { title: "Therapists", icon: <MedicalServicesOutlinedIcon />, path: "/therapists", color: "#6B4E9E" },
];

const UserDashboard = () => {
  const navigate = useNavigate();
  const [assessments, setAssessments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/assessments")
      .then((res) => setAssessments(res.data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #eef5f3 0%, #f7fbfa 50%, #dfeee9 100%)",
      }}
    >
      <Navbar />

      <Container sx={{ py: 5 }}>
        <Typography variant="h4" fontWeight="bold" mb={4} textAlign="center">
          Welcome to Dashboard
        </Typography>

        <Grid container spacing={3} mb={5}>
          {actions.map((item, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                sx={{
                  cursor: "pointer",
                  borderRadius: 4,
                  boxShadow: "0 6px 20px rgba(0,0,0,0.05)",
                  textAlign: "center",
                  py: 4,
                  transition: "all 0.3s ease",
                  "&:hover": { transform: "translateY(-4px)", boxShadow: "0 12px 30px rgba(0,0,0,0.1)" },
                }}
                onClick={() => navigate(item.path)}
              >
                <Avatar
                  sx={{
                    bgcolor: item.color,
                    mx: "auto",
                    mb: 2,
                    width: 56,
                    height: 56,
                  }}
                >
                  {item.icon}
                </Avatar>
                <Typography variant="h6" fontWeight="bold">
                  {item.title}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Typography variant="h5" fontWeight="bold" mb={3}>
          Assessment History
        </Typography>

        {loading ? (
          <Box display="flex" justifyContent="center" my={3}>
            <CircularProgress />
          </Box>
        ) : assessments.length === 0 ? (
          <Typography>No assessments yet</Typography>
        ) : (
          <Grid container spacing={2}>
            {assessments.map((item) => (
              <Grid item xs={12} md={6} key={item._id}>
                <Card sx={{ borderRadius: 3, boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}>
                  <CardContent>
                    <Typography fontWeight="bold">
                      Score: {item.totalScore}/{item.maxScore}
                    </Typography>
                    <Typography color="text.secondary">{item.recommendation}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        <Box textAlign="center" mt={5}>
          <Button
            variant="contained"
            sx={{
              py: 1.5,
              px: 5,
              borderRadius: 3,
              fontWeight: "bold",
              textTransform: "none",
              bgcolor: "#4A7C6F",
              "&:hover": { bgcolor: "#2E5349" },
            }}
            onClick={() => navigate("/assessment")}
          >
            Take New Assessment
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default UserDashboard;