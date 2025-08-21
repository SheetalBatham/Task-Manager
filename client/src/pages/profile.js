
// src/pages/profile.js
"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import NavBar from "../components/NavBar";
import api from "../lib/api";

const Profile = () => {
  const { user, loading, setUser } = useAuth();
  const [editMode, setEditMode] = useState(false);
  const [passwordMode, setPasswordMode] = useState(false);

  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Populate form once user is available
  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  if (loading) return <p className="text-center mt-4">Loading...</p>;
  if (!user) return <p className="text-center mt-4">You are not logged in.</p>;

  // Edit profile API
  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const token = localStorage.getItem("token");
      const res = await api.put(
        "/auth/update-profile",
        { name, email },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setUser(res.data.user);
      setMessage("Profile updated successfully!");
      setEditMode(false);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update profile");
    }
  };

  // Change password API
  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const token = localStorage.getItem("token");
      const res = await api.put(
        "/auth/change-password",
        { currentPassword, newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMessage(res.data.message);
      setPasswordMode(false);
      setCurrentPassword("");
      setNewPassword("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to change password");
    }
  };

  return (
    <>
      <NavBar />
      <div className="container mt-4">
        <h2>Profile</h2>

        {message && <div className="alert alert-success">{message}</div>}
        {error && <div className="alert alert-danger">{error}</div>}

        {/* Display Info */}
        {!editMode && !passwordMode && (
          <div className="card p-3">
            <p>
              <strong>Name:</strong> {user.name}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <div className="d-flex justify-between">
              <button
              className="btn btn-primary me-2"
              onClick={() => setEditMode(true)}
            >
              Edit Profile
            </button>
            <button
              className="btn btn-warning"
              onClick={() => setPasswordMode(true)}
            >
              Change Password
            </button>
            </div>
          </div>
        )}

        {/* Edit Profile Form */}
        {editMode && (
          <div className="card p-3">
            <h4>Edit Profile</h4>
            <form onSubmit={handleProfileUpdate}>
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-success me-2">
                Save
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setEditMode(false)}
              >
                Cancel
              </button>
            </form>
          </div>
        )}

        {/* Change Password Form */}
        {passwordMode && (
          <div className="card p-3">
            <h4>Change Password</h4>
            <form onSubmit={handlePasswordUpdate}>
              <div className="mb-3">
                <label className="form-label">Current Password</label>
                <input
                  type="password"
                  className="form-control"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">New Password</label>
                <input
                  type="password"
                  className="form-control"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-success me-2">
                Change Password
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setPasswordMode(false)}
              >
                Cancel
              </button>
            </form>
          </div>
        )}
      </div>
    </>
  );
};

export default Profile;

