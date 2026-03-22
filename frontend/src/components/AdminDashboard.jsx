import React, { useEffect, useState } from "react";
import {
  Box, Container, Typography, Card, CardContent, Button,
  CircularProgress, Stack, Alert, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper,
} from "@mui/material";
import API from "../../axiosinterceptor";
import Navbar from "./Navbar";

const AdminDashboard = () => {
  const [pendingUsers, setPendingUsers] = useState([]);
  const [pendingVolunteers, setPendingVolunteers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [volunteerLoading, setVolunteerLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(null);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // ==============================
  // FETCH PENDING USERS
  // ==============================
  // ✅ FIX #7: Changed from /auth/pending-users to /admin/pending-users
  const fetchPendingUsers = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await API.get("/admin/pending-users");
      setPendingUsers(res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  // ==============================
  // FETCH PENDING VOLUNTEERS
  // ==============================
  // ✅ FIX #1: Added volunteer fetching — was completely missing before
  const fetchPendingVolunteers = async () => {
    setVolunteerLoading(true);
    setError("");
    try {
      const res = await API.get("/admin/pending-volunteers");
      setPendingVolunteers(res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch volunteers");
    } finally {
      setVolunteerLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingUsers();
    fetchPendingVolunteers();
  }, []);

  // ==============================
  // APPROVE / REJECT USER
  // ==============================
  // ✅ FIX #7: Changed from /auth/${action}/${id} to /admin/${action}/${id}
  const handleUserAction = async (id, action) => {
    setActionLoading(id);
    setError("");
    setSuccessMsg("");
    try {
      const res = await API.put(`/admin/${action}/${id}`, null);
      setSuccessMsg(res.data.message);
      fetchPendingUsers();
    } catch (err) {
      setError(err.response?.data?.message || "Action failed");
    } finally {
      setActionLoading(null);
    }
  };

  // ==============================
  // APPROVE / REJECT VOLUNTEER
  // ==============================
  // ✅ FIX #1: Added volunteer action handler — was completely missing before
  const handleVolunteerAction = async (id, action) => {
    setActionLoading(id);
    setError("");
    setSuccessMsg("");
    try {
      const res = await API.put(`/admin/${action}-volunteer/${id}`, null);
      setSuccessMsg(res.data.message);
      fetchPendingVolunteers();
    } catch (err) {
      setError(err.response?.data?.message || "Action failed");
    } finally {
      setActionLoading(null);
    }
  };

  const ActionButtons = ({ id, onApprove, onReject }) => (
    <Stack direction="row" spacing={1} justifyContent="center">
      <Button
        variant="contained"
        size="small"
        sx={{ bgcolor: "#4A7C6F", "&:hover": { bgcolor: "#2E5349" } }}
        disabled={actionLoading === id}
        onClick={onApprove}
      >
        {actionLoading === id ? <CircularProgress size={20} sx={{ color: "white" }} /> : "Approve"}
      </Button>
      <Button
        variant="outlined"
        size="small"
        sx={{ borderColor: "#4A7C6F", color: "#4A7C6F", "&:hover": { bgcolor: "#f0f6f3" } }}
        disabled={actionLoading === id}
        onClick={onReject}
      >
        {actionLoading === id ? <CircularProgress size={20} sx={{ color: "#4A7C6F" }} /> : "Reject"}
      </Button>
    </Stack>
  );

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#eef5f3" }}>
      <Navbar />

      <Container maxWidth="lg" sx={{ py: 5 }}>
        <Typography variant="h4" fontWeight="bold" sx={{ color: "#2E5349", mb: 4 }}>
          Admin Dashboard 🌿
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 2, borderRadius: 3 }}>{error}</Alert>}
        {successMsg && <Alert severity="success" sx={{ mb: 2, borderRadius: 3 }}>{successMsg}</Alert>}

        {/* ===== PENDING USERS ===== */}
        <Card sx={{ borderRadius: 5, boxShadow: "0 12px 30px rgba(0,0,0,0.06)", bgcolor: "#fff" }}>
          <CardContent>
            <Typography variant="h6" fontWeight="bold" sx={{ color: "#4A7C6F", mb: 3 }}>
              Pending Users
            </Typography>

            {loading ? (
              <Box textAlign="center" py={5}><CircularProgress sx={{ color: "#4A7C6F" }} /></Box>
            ) : pendingUsers.length === 0 ? (
              <Typography>No pending users</Typography>
            ) : (
              <TableContainer component={Paper} sx={{ borderRadius: 3 }}>
                <Table>
                  <TableHead sx={{ bgcolor: "#e8f3ef" }}>
                    <TableRow>
                      <TableCell><strong>Name</strong></TableCell>
                      <TableCell><strong>Email</strong></TableCell>
                      <TableCell><strong>Role</strong></TableCell>
                      <TableCell align="center"><strong>Actions</strong></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {pendingUsers.map((user) => (
                      <TableRow key={user._id}>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.role}</TableCell>
                        <TableCell align="center">
                          <ActionButtons
                            id={user._id}
                            onApprove={() => handleUserAction(user._id, "approve")}
                            onReject={() => handleUserAction(user._id, "reject")}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </CardContent>
        </Card>

        {/* ===== PENDING VOLUNTEERS ===== */}
        {/* ✅ FIX #1: This entire section was missing — volunteers were never shown to admin */}
        <Card sx={{ borderRadius: 5, boxShadow: "0 12px 30px rgba(0,0,0,0.06)", bgcolor: "#fff", mt: 4 }}>
          <CardContent>
            <Typography variant="h6" fontWeight="bold" sx={{ color: "#4A7C6F", mb: 3 }}>
              Pending Volunteers
            </Typography>

            {volunteerLoading ? (
              <Box textAlign="center" py={5}><CircularProgress sx={{ color: "#4A7C6F" }} /></Box>
            ) : pendingVolunteers.length === 0 ? (
              <Typography>No pending volunteers</Typography>
            ) : (
              <TableContainer component={Paper} sx={{ borderRadius: 3 }}>
                <Table>
                  <TableHead sx={{ bgcolor: "#e8f3ef" }}>
                    <TableRow>
                      <TableCell><strong>Name</strong></TableCell>
                      <TableCell><strong>Support Area</strong></TableCell>
                      <TableCell><strong>Language</strong></TableCell>
                      <TableCell><strong>Availability</strong></TableCell>
                      <TableCell><strong>Experience</strong></TableCell>
                      <TableCell align="center"><strong>Actions</strong></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {pendingVolunteers.map((vol) => (
                      <TableRow key={vol._id}>
                        <TableCell>{vol.name}</TableCell>
                        <TableCell>{vol.supportArea}</TableCell>
                        <TableCell>{vol.language}</TableCell>
                        <TableCell>{vol.availability}</TableCell>
                        <TableCell>{vol.experience}</TableCell>
                        <TableCell align="center">
                          <ActionButtons
                            id={vol._id}
                            onApprove={() => handleVolunteerAction(vol._id, "approve")}
                            onReject={() => handleVolunteerAction(vol._id, "reject")}
                          />
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