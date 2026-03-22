import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
  axios.get("/api/admin/pending-users", {
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });   
  setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const approveUser = async (id) => {
    await axios.put(`/api/admin/approve/${id}`);
    fetchUsers(); // refresh
  };

  const rejectUser = async (id) => {
    await axios.put(`/api/admin/reject/${id}`);
    fetchUsers();
  };

  return (
    <div>
      <h2>Pending Requests</h2>

      {users.map((user) => (
        <div key={user._id}>
          <p>{user.name} - {user.role}</p>

          <button onClick={() => approveUser(user._id)}>
            Approve
          </button>

          <button onClick={() => rejectUser(user._id)}>
            Reject
          </button>
        </div>
      ))}
    </div>
  );
};

export default AdminDashboard;