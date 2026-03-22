import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  CircularProgress,
  Stack,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import API from "../../axiosinterceptor";

// ✅ Import your existing Navbar
import Navbar from "./Navbar";

const AdminDashboard = () => {
  const [pendingUsers, setPendingUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(null); // user ID for action loading
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Fetch pending users
  const fetchPendingUsers = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await API.get("/auth/pending-users", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setPendingUsers(res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingUsers();
  }, []);

  // Approve / Reject user
  const handleAction = async (id, action) => {
    setActionLoading(id);
    setError("");
    setSuccessMsg("");
    try {
      const res = await API.put(`/auth/${action}/${id}`, null, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setSuccessMsg(res.data.message);
      fetchPendingUsers(); // refresh list
    } catch (err) {
      setError(err.response?.data?.message || "Action failed");
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#eef5f3" }}>
      {/* Use your existing Navbar */}
      <Navbar />

      <Container maxWidth="lg" sx={{ py: 5 }}>
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{ color: "#2E5349", mb: 4 }}
        >
          Admin Dashboard 🌿
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2, borderRadius: 3 }}>
            {error}
          </Alert>
        )}
        {successMsg && (
          <Alert severity="success" sx={{ mb: 2, borderRadius: 3 }}>
            {successMsg}
          </Alert>
        )}

        <Card
          sx={{
            borderRadius: 5,
            boxShadow: "0 12px 30px rgba(0,0,0,0.06)",
            bgcolor: "#fff",
          }}
        >
          <CardContent>
            <Typography
              variant="h6"
              fontWeight="bold"
              sx={{ color: "#4A7C6F", mb: 3 }}
            >
              Pending Users
            </Typography>

            {loading ? (
              <Box textAlign="center" py={5}>
                <CircularProgress sx={{ color: "#4A7C6F" }} />
              </Box>
            ) : pendingUsers.length === 0 ? (
              <Typography>No pending users</Typography>
            ) : (
              <TableContainer component={Paper} sx={{ borderRadius: 3 }}>
                <Table>
                  <TableHead sx={{ bgcolor: "#e8f3ef" }}>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Role</TableCell>
                      <TableCell align="center">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {pendingUsers.map((user) => (
                      <TableRow key={user._id}>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.role}</TableCell>
                        <TableCell align="center">
                          <Stack
                            direction="row"
                            spacing={1}
                            justifyContent="center"
                          >
                            <Button
                              variant="contained"
                              size="small"
                              sx={{
                                bgcolor: "#4A7C6F",
                                "&:hover": { bgcolor: "#2E5349" },
                              }}
                              disabled={actionLoading === user._id}
                              onClick={() =>
                                handleAction(user._id, "approve")
                              }
                            >
                              {actionLoading === user._id ? (
                                <CircularProgress
                                  size={20}
                                  sx={{ color: "white" }}
                                />
                              ) : (
                                "Approve"
                              )}
                            </Button>

                            <Button
                              variant="outlined"
                              size="small"
                              sx={{
                                borderColor: "#4A7C6F",
                                color: "#4A7C6F",
                                "&:hover": {
                                  bgcolor: "#f0f6f3",
                                  borderColor: "#2E5349",
                                },
                              }}
                              disabled={actionLoading === user._id}
                              onClick={() => handleAction(user._id, "reject")}
                            >
                              {actionLoading === user._id ? (
                                <CircularProgress
                                  size={20}
                                  sx={{ color: "#4A7C6F" }}
                                />
                              ) : (
                                "Reject"
                              )}
                            </Button>
                          </Stack>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default AdminDashboard;