// "use client";

// import React, { useState } from "react";
// import { useAuth } from "../context/AuthContext";
// import NavBar from "../components/NavBar";
// import api from "../lib/api";

// const Profile = () => {
//     const { user, loading, setUser } = useAuth(); // setUser needed to update context
//     const [editProfile, setEditProfile] = useState(false);
//     const [editPassword, setEditPassword] = useState(false);
//     const [name, setName] = useState(user?.name || "");
//     const [email, setEmail] = useState(user?.email || "");
//     const [currentPassword, setCurrentPassword] = useState("");
//     const [newPassword, setNewPassword] = useState("");
//     const [confirmPassword, setConfirmPassword] = useState("");
//     const [message, setMessage] = useState(null);
//     const [loadingBtn, setLoadingBtn] = useState(false);

//     if (loading) return <p>Loading...</p>;
//     if (!user) return <p>You are not logged in.</p>;

//     // Inside handleProfileUpdate
//     const handleProfileUpdate = async (e) => {
//         e.preventDefault();
//         setLoadingBtn(true);
//         try {
//             const res = await api.put("/auth/update-profile", { name, email });
//             setUser(res.data.user); // ✅ update AuthContext immediately
//             setMessage({ type: "success", text: "Profile updated successfully" });
//             setEditProfile(false);
//         } catch (err) {
//             setMessage({
//                 type: "danger",
//                 text: err?.response?.data?.message || "Profile update failed",
//             });
//         } finally {
//             setLoadingBtn(false);
//         }
//     };


//     // Update Password
//     const handlePasswordUpdate = async (e) => {
//         e.preventDefault();
//         if (newPassword !== confirmPassword) {
//             setMessage({ type: "danger", text: "Passwords do not match" });
//             return;
//         }
//         setLoadingBtn(true);
//         try {
//             await api.put("/auth/change-password", {
//                 currentPassword,
//                 newPassword,
//             });
//             setMessage({ type: "success", text: "Password updated successfully" });
//             setCurrentPassword("");
//             setNewPassword("");
//             setConfirmPassword("");
//             setEditPassword(false);
//         } catch (err) {
//             setMessage({
//                 type: "danger",
//                 text: err?.response?.data?.message || "Password update failed",
//             });
//         } finally {
//             setLoadingBtn(false);
//         }
//     };

//     return (
//         <>
//             <NavBar />
//             <div className="container mt-4">
//                 <div className="card mx-auto" style={{ maxWidth: "500px" }}>
//                     <div className="card-body">
//                         <h3 className="card-title text-center mb-4">Profile</h3>

//                         {message && (
//                             <div className={`alert alert-${message.type}`} role="alert">
//                                 {message.text}
//                             </div>
//                         )}

//                         {!editProfile ? (
//                             <div className="mb-3">
//                                 <p><strong>Name:</strong> {user.name}</p>
//                                 <p><strong>Email:</strong> {user.email}</p>
//                                 <button
//                                     className="btn btn-primary me-2"
//                                     onClick={() => setEditProfile(true)}
//                                 >
//                                     Edit Profile
//                                 </button>
//                                 <button
//                                     className="btn btn-warning"
//                                     onClick={() => setEditPassword(true)}
//                                 >
//                                     Change Password
//                                 </button>
//                             </div>
//                         ) : (
//                             <form onSubmit={handleProfileUpdate}>
//                                 <div className="mb-3">
//                                     <label className="form-label">Name</label>
//                                     <input
//                                         type="text"
//                                         className="form-control"
//                                         value={name}
//                                         onChange={(e) => setName(e.target.value)}
//                                         required
//                                     />
//                                 </div>
//                                 <div className="mb-3">
//                                     <label className="form-label">Email</label>
//                                     <input
//                                         type="email"
//                                         className="form-control"
//                                         value={email}
//                                         onChange={(e) => setEmail(e.target.value)}
//                                         required
//                                     />
//                                 </div>
//                                 <button className="btn btn-success me-2" disabled={loadingBtn}>
//                                     {loadingBtn ? "Updating..." : "Update Profile"}
//                                 </button>
//                                 <button
//                                     type="button"
//                                     className="btn btn-secondary"
//                                     onClick={() => setEditProfile(false)}
//                                 >
//                                     Cancel
//                                 </button>
//                             </form>
//                         )}

//                         {editPassword && (
//                             <form className="mt-4" onSubmit={handlePasswordUpdate}>
//                                 <div className="mb-3">
//                                     <label className="form-label">Current Password</label>
//                                     <input
//                                         type="password"
//                                         className="form-control"
//                                         value={currentPassword}
//                                         onChange={(e) => setCurrentPassword(e.target.value)}
//                                         required
//                                     />
//                                 </div>
//                                 <div className="mb-3">
//                                     <label className="form-label">New Password</label>
//                                     <input
//                                         type="password"
//                                         className="form-control"
//                                         value={newPassword}
//                                         onChange={(e) => setNewPassword(e.target.value)}
//                                         required
//                                     />
//                                 </div>
//                                 <div className="mb-3">
//                                     <label className="form-label">Confirm New Password</label>
//                                     <input
//                                         type="password"
//                                         className="form-control"
//                                         value={confirmPassword}
//                                         onChange={(e) => setConfirmPassword(e.target.value)}
//                                         required
//                                     />
//                                 </div>
//                                 <button className="btn btn-success me-2" disabled={loadingBtn}>
//                                     {loadingBtn ? "Updating..." : "Update Password"}
//                                 </button>
//                                 <button
//                                     type="button"
//                                     className="btn btn-secondary"
//                                     onClick={() => setEditPassword(false)}
//                                 >
//                                     Cancel
//                                 </button>
//                             </form>
//                         )}
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default Profile;


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

