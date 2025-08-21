// client/pages/edit/[id].js
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import api from "../../../lib/api";

export default function EditTask() {
  const router = useRouter();
  const { id } = router.query;

  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "Pending",
  });

  const [loading, setLoading] = useState(true);

  // Fetch existing task details
  useEffect(() => {
    if (id) {
      api
        .get(`/tasks/${id}`)
        .then((res) => {
          if (res.data) {
            setForm({
              title: res.data.title || "",
              description: res.data.description || "",
              status: res.data.status || "Pending",
            });
          }
        })
        .catch((err) => {
          console.error("Failed to fetch task:", err.response?.data || err);
          alert("Failed to load task details.");
        })
        .finally(() => setLoading(false));
    }
  }, [id]);

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/tasks/${id}`, form);
      alert("Task updated successfully!");
      router.push("/");
    } catch (err) {
      console.error("Update failed:", err.response?.data || err);
      alert("Failed to update task");
    }
  };

  if (loading) {
    return <p className="container mt-5">Loading task details...</p>;
  }

  return (
    <div className="container mt-5">
      <h2>Edit Task</h2>
      <form onSubmit={handleSubmit} className="mt-4">
        {/* Title */}
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            type="text"
            name="title"
            className="form-control"
            value={form.title}
            onChange={handleChange}
            required
          />
        </div>

        {/* Description */}
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            name="description"
            className="form-control"
            rows="3"
            value={form.description}
            onChange={handleChange}
          ></textarea>
        </div>

        {/* Status */}
        <div className="mb-3">
          <label className="form-label">Status</label>
          <select
            name="status"
            className="form-select"
            value={form.status}
            onChange={handleChange}
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="On Hold">On Hold</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary">
          Update Task
        </button>
      </form>
    </div>
  );
}
