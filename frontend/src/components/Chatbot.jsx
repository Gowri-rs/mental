import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  TextField,
  IconButton,
  CircularProgress,
  Avatar,
  Button,
  Paper,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import SpaOutlinedIcon from "@mui/icons-material/SpaOutlined";
import Navbar from "./Navbar";

const Chatbot = () => {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);

  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [chat, loading]);

  const sendMessage = async () => {
    if (!message.trim() || loading) return;

    const userMessage = {
      sender: "user",
      text: message,
    };

    setChat((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:5000/chatbot/chat",
        { message }
      );

      const botMessage = {
        sender: "bot",
        text: res.data.reply,
      };

      setChat((prev) => [...prev, botMessage]);
      setMessage("");
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  const handleKey = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #eef5f3 0%, #f7fbfa 50%, #dfeee9 100%)",
      }}
    >
      <Navbar />

      <Box
        sx={{
          display: "flex",
          minHeight: "calc(100vh - 64px)",
        }}
      >
        {/* Left Intro */}
        <Box
          sx={{
            flex: 1,
            px: 8,
            py: 6,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Avatar
            sx={{
              bgcolor: "#4A7C6F",
              width: 70,
              height: 70,
              mb: 3,
            }}
          >
            <SpaOutlinedIcon sx={{ fontSize: 38 }} />
          </Avatar>

          <Typography
            variant="h3"
            fontWeight="bold"
            sx={{
              color: "#2E5349",
              mb: 2,
              lineHeight: 1.2,
            }}
          >
            Calm Conversations for Better Mental Wellness 🌿
          </Typography>

          <Typography
            sx={{
              color: "#4A7C6F",
              mb: 4,
              maxWidth: 500,
              fontSize: "1.05rem",
            }}
          >
            Talk freely with MindBloom Assistant and receive supportive,
            thoughtful responses anytime you need emotional support.
          </Typography>

          {/* <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              variant="contained"
              sx={{
                bgcolor: "#4A7C6F",
                borderRadius: 3,
                px: 3,
              }}
            >
              Start Chat
            </Button> */}

            {/* <Button
              variant="outlined"
              sx={{
                borderColor: "#4A7C6F",
                color: "#4A7C6F",
                borderRadius: 3,
                px: 3,
              }}
            >
              Learn More
            </Button> */}
          {/* </Box> */}
        </Box>

        {/* Right Chat */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            p: 4,
            bgcolor: "rgba(255,255,255,0.55)",
            backdropFilter: "blur(12px)",
          }}
        >
          <Typography
            variant="h6"
            fontWeight="bold"
            mb={3}
            sx={{ color: "#2E5349" }}
          >
            MindBloom Assistant
          </Typography>

          <Box
            sx={{
              flex: 1,
              overflowY: "auto",
            }}
          >
            {chat.length === 0 && (
              <Paper
                sx={{
                  p: 2,
                  borderRadius: 4,
                  bgcolor: "#eef5f3",
                  maxWidth: 280,
                }}
              >
                Hello 🌿 How are you feeling today?
              </Paper>
            )}

            {chat.map((msg, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  justifyContent:
                    msg.sender === "user"
                      ? "flex-end"
                      : "flex-start",
                  mb: 2,
                }}
              >
                <Box
                  sx={{
                    px: 3,
                    py: 1.5,
                    borderRadius: 4,
                    maxWidth: "75%",
                    bgcolor:
                      msg.sender === "user"
                        ? "#4A7C6F"
                        : "#ffffff",
                    color:
                      msg.sender === "user"
                        ? "white"
                        : "black",
                    boxShadow: 2,
                  }}
                >
                  {msg.text}
                </Box>
              </Box>
            ))}

            {loading && (
              <CircularProgress size={20} />
            )}

            <div ref={chatEndRef} />
          </Box>

          <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
            <TextField
              fullWidth
              placeholder="Share your thoughts..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKey}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 4,
                  bgcolor: "white",
                },
              }}
            />

            <IconButton
              onClick={sendMessage}
              sx={{
                bgcolor: "#4A7C6F",
                color: "white",
                "&:hover": {
                  bgcolor: "#2E5349",
                },
              }}
            >
              <SendIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Chatbot;