// client/pages/tasks/new.js
import { useState } from "react";
import { useRouter } from "next/router";
import api from "../../lib/api";

export default function NewTask() {
    const [form, setForm] = useState({ title: "", description: "", status: "pending" });
    const [error, setError] = useState("");
    const router = useRouter();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post("/tasks", form); // backend route: POST /tasks
            router.push("/tasks"); // go back to task list
        } catch (err) {
            setError(err.response?.data?.message || "Failed to create task");
        }
    };

    return (
        <div className="container mt-5">
            <h2>Add New Task</h2>
            {error && <p className="text-danger">{error}</p>}
            <form onSubmit={handleSubmit}>
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

                <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea
                        name="description"
                        className="form-control"
                        value={form.description}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* New Status Dropdown */}
                <div className="mb-3">
                    <label className="form-label">Status</label>
                    <select
                        name="status"
                        className="form-select"
                        value={form.status}
                        onChange={handleChange}
                    >
                        <option value="pending">Pending</option>
                        <option value="in-progress">In Progress</option>
                        <option value="completed">Completed</option>
                        <option value="on-hold">On Hold</option>
                    </select>

                </div>

                <button type="submit" className="btn btn-primary">
                    Save Task
                </button>
            </form>
        </div>
    );
}
