import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import api from '../../lib/api';
import NavBar from '../../components/NavBar';
import Link from 'next/link';

export default function Task() {
  const router = useRouter();
  const { id } = router.query;
  const [task, setTask] = useState(null);
  const [err, setErr] = useState('');
  const [mode, setMode] = useState('view'); // 'view' or 'edit'

  // Form state variables for edit mode
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');

  const fetchTask = () => {
    if (!id) return;
    api.get(`/tasks/${id}`)
      .then(({ data }) => {
        setTask(data.task);
        // Pre-fill form fields when task is fetched
        setTitle(data.task.title);
        setDescription(data.task.description);
        setStatus(data.task.status);
      })
      .catch(e => setErr(e?.response?.data?.message || 'Failed to fetch task'));
  };

  useEffect(() => {
    fetchTask();
  }, [id]);

  const onDelete = async () => {
    if (!confirm('Delete this task?')) return;
    await api.delete(`/tasks/${id}`);
    router.push('/tasks');
  };

  const onUpdate = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/tasks/${id}`, { title, description, status });
      setMode('view'); // Switch back to view mode after successful update
      fetchTask(); // Re-fetch the task to show updated data
    } catch (e) {
      setErr(e?.response?.data?.message || 'Failed to update task');
    }
  };

  if (!task) {
    return (
      <>
        <NavBar />
        <div className="container">{err ? <div className="alert alert-danger">{err}</div> : 'Loading...'}</div>
      </>
    );
  }

  // --- VIEW MODE ---
  if (mode === 'view') {
    return (
      <>
        <NavBar />
        <div className="container">
          <h2 className='pb-3'>Task Details</h2>
          <p className="mb-3"><strong>Title - </strong>{task.title}</p>
          <p><strong>Status - </strong><span className="badge bg-secondary text-capitalize mb-2">{task.status}</span></p>
          <p><strong>Description - </strong> {task.description || <em>No description</em>}</p>
          <div className="d-flex gap-2">
            <button className="btn btn-outline-primary" onClick={() => setMode('edit')}>Update Task</button>
            <button className="btn btn-outline-danger" onClick={onDelete}>Delete</button>
            <Link className="btn btn-light" href="/tasks">Back</Link>
          </div>
        </div>
      </>
    );
  }

  // --- EDIT MODE ---
  return (
    <>
      <NavBar />
      <div className="container">
        <h3 className="mb-4">Edit Task</h3>
        {err && <div className="alert alert-danger">{err}</div>}
        <form onSubmit={onUpdate}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea
              className="form-control"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="3"
            ></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="status" className="form-label">Status</label>
            <select
              className="form-select text-capitalize"
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="on-hold">On Hold</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary me-2">Save Changes</button>
          <button type="button" className="btn btn-secondary" onClick={() => setMode('view')}>Cancel</button>
        </form>
      </div>
    </>
  );
}