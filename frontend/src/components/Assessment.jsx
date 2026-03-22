import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  LinearProgress,
  Grid,
  Alert,
  Stack,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import SelfImprovementIcon from "@mui/icons-material/SelfImprovement";

const QUESTIONS = [
  {
    id: 1,
    question: "How do you usually feel when starting your day?",
    options: [
      { text: "I feel fresh and ready", score: 0 },
      { text: "I need time to settle", score: 1 },
      { text: "Some mornings feel heavy", score: 2 },
      { text: "It often feels difficult to begin", score: 3 },
      { text: "I feel mentally tired already", score: 4 },
      { text: "Even getting up feels overwhelming", score: 5 },
    ],
  },
  {
    id: 2,
    question: "How do daily responsibilities affect you lately?",
    options: [
      { text: "I manage them comfortably", score: 0 },
      { text: "Some tasks need extra effort", score: 1 },
      { text: "I feel pressured often", score: 2 },
      { text: "Tasks drain my energy", score: 3 },
      { text: "Small tasks feel exhausting", score: 4 },
      { text: "I struggle to complete basic tasks", score: 5 },
    ],
  },
  {
    id: 3,
    question: "How often do you feel disconnected emotionally?",
    options: [
      { text: "Rarely", score: 0 },
      { text: "Sometimes for short periods", score: 1 },
      { text: "It happens during stressful days", score: 2 },
      { text: "Quite often lately", score: 3 },
      { text: "Most days feel distant", score: 4 },
      { text: "I feel detached almost always", score: 5 },
    ],
  },
  {
    id: 4,
    question: "How is your sleep experience recently?",
    options: [
      { text: "Sleep feels restful", score: 0 },
      { text: "I wake up once or twice", score: 1 },
      { text: "Some nights are restless", score: 2 },
      { text: "Sleep often feels interrupted", score: 3 },
      { text: "I wake up tired frequently", score: 4 },
      { text: "Sleep rarely refreshes me", score: 5 },
    ],
  },
  {
    id: 5,
    question: "How do you react to unexpected problems?",
    options: [
      { text: "I stay calm", score: 0 },
      { text: "I need a moment to adjust", score: 1 },
      { text: "It creates some tension", score: 2 },
      { text: "I worry a lot", score: 3 },
      { text: "It affects my whole day", score: 4 },
      { text: "It feels hard to cope", score: 5 },
    ],
  },
  {
    id: 6,
    question: "How connected do you feel with people around you?",
    options: [
      { text: "Very connected", score: 0 },
      { text: "Mostly comfortable", score: 1 },
      { text: "Sometimes distant", score: 2 },
      { text: "Often isolated", score: 3 },
      { text: "Emotionally withdrawn", score: 4 },
      { text: "Disconnected almost completely", score: 5 },
    ],
  },
];

const reflections = [
  "Pause and Reflect",
  "Take Your Time",
  "Notice Your Feelings",
  "Breathe Slowly",
  "Be Honest With Yourself",
  "One Step at a Time",
];

const AssessmentPage = () => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [message, setMessage] = useState("");

  const question = QUESTIONS[current];

  const handleNext = () => {
    if (!selected) return;

    const newAnswers = [
      ...answers,
      {
        questionId: question.id,
        answer: selected.text,
        score: selected.score,
      },
    ];

    if (current === QUESTIONS.length - 1) {
      const totalScore = newAnswers.reduce((sum, item) => sum + item.score, 0);

      setMessage("Assessment completed! Calculating results...");

      setTimeout(() => {
        navigate("/result", {
          state: { score: totalScore },
        });
      }, 1500);

      return;
    }

    setAnswers(newAnswers);
    setCurrent(current + 1);
    setSelected(null);
  };

  const handleBack = () => {
    if (current > 0) {
      setCurrent(current - 1);
      setSelected(null);
      setAnswers(answers.slice(0, -1));
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f4faf7 0%, #ffffff 100%)",
        pb: 8,
      }}
    >
      <Navbar />

      <Container maxWidth="lg" sx={{ mt: 6 }}>
        {/* Header */}
        <Box sx={{ mb: 5, textAlign: "center" }}>
          <Typography
            variant="h3"
            fontWeight="700"
            sx={{
              color: "#2E5349",
              mb: 1,
              fontSize: { xs: "2rem", md: "2.6rem" },
            }}
          >
            Mental Wellness Assessment 🌿
          </Typography>

          <Typography sx={{ color: "#5a8a7d" }}>
            Find a calm moment and answer with honesty.
          </Typography>
        </Box>

        {/* Progress */}
        <Box sx={{ maxWidth: 650, mx: "auto", mb: 4 }}>
          <Typography
            variant="caption"
            fontWeight="bold"
            sx={{ color: "#4A7C6F" }}
          >
            QUESTION {current + 1} OF {QUESTIONS.length}
          </Typography>

          <LinearProgress
            variant="determinate"
            value={((current + 1) / QUESTIONS.length) * 100}
            sx={{
              mt: 1,
              height: 8,
              borderRadius: 5,
              bgcolor: "#e5f0eb",
              "& .MuiLinearProgress-bar": {
                bgcolor: "#4A7C6F",
              },
            }}
          />
        </Box>

        {message && (
          <Alert severity="success" sx={{ mb: 3 }}>
            {message}
          </Alert>
        )}

        {/* Main Card */}
        <Card
          sx={{
            borderRadius: 5,
            boxShadow: "0 12px 30px rgba(0,0,0,0.05)",
            overflow: "hidden",
          }}
        >
          <Grid container>
            {/* Left Panel */}
            <Grid
              item
              xs={12}
              md={4}
              sx={{
                background:
                  "linear-gradient(180deg, #4A7C6F 0%, #5f9486 100%)",
                color: "white",
                p: 5,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <SelfImprovementIcon
                sx={{
                  fontSize: 70,
                  mb: 3,
                  opacity: 0.9,
                }}
              />

              <Typography
                variant="h5"
                fontWeight="600"
                sx={{ mb: 2 }}
              >
                {reflections[current]}
              </Typography>

              <Typography
                sx={{
                  opacity: 0.85,
                  lineHeight: 1.8,
                  maxWidth: 220,
                }}
              >
                Breathe slowly, answer honestly, and stay present.
              </Typography>
            </Grid>

            {/* Right Panel */}
            <Grid item xs={12} md={8}>
              <CardContent
                sx={{
                  p: { xs: 3, md: 6 },
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <Typography
                  variant="h5"
                  fontWeight="600"
                  sx={{
                    color: "#1A332C",
                    mb: 5,
                    maxWidth: 500,
                    lineHeight: 1.5,
                  }}
                >
                  {question.question}
                </Typography>

                <Stack spacing={2} sx={{ width: "100%", maxWidth: 460 }}>
                  {question.options.map((option, index) => (
                    <Button
                      key={index}
                      fullWidth
                      variant={
                        selected?.text === option.text
                          ? "contained"
                          : "outlined"
                      }
                      onClick={() => setSelected(option)}
                      sx={{
                        py: 1.6,
                        borderRadius: 2.5,
                        textTransform: "none",
                        fontSize: "0.98rem",
                        borderColor: "#dce8e3",
                        bgcolor:
                          selected?.text === option.text
                            ? "#4A7C6F"
                            : "#fff",
                        color:
                          selected?.text === option.text
                            ? "white"
                            : "#2E5349",
                        "&:hover": {
                          borderColor: "#4A7C6F",
                          bgcolor:
                            selected?.text === option.text
                              ? "#3b665a"
                              : "#f7fbf9",
                        },
                      }}
                    >
                      {option.text}
                    </Button>
                  ))}
                </Stack>

                <Stack
                  direction="row"
                  spacing={2}
                  sx={{
                    mt: 5,
                    width: "100%",
                    maxWidth: 460,
                  }}
                >
                  <Button
                    onClick={handleBack}
                    disabled={current === 0}
                    sx={{
                      flex: 1,
                      color: "#4A7C6F",
                      fontWeight: "bold",
                    }}
                  >
                    Back
                  </Button>

                  <Button
                    variant="contained"
                    onClick={handleNext}
                    disabled={!selected}
                    sx={{
                      flex: 2,
                      py: 1.4,
                      borderRadius: 3,
                      bgcolor: "#4A7C6F",
                      fontWeight: "bold",
                      "&:hover": {
                        bgcolor: "#2E5349",
                      },
                    }}
                  >
                    {current === QUESTIONS.length - 1
                      ? "Finish"
                      : "Next Question"}
                  </Button>
                </Stack>
              </CardContent>
            </Grid>
          </Grid>
        </Card>
      </Container>
    </Box>
  );
};

export default AssessmentPage;