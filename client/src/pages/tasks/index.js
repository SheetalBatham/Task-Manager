import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/router';
import api from '../../lib/api';
import NavBar from '../../components/NavBar';
import Link from 'next/link';

export default function Tasks() {
  const { user, bootstrapped } = useAuth();
  const router = useRouter();
  const [tasks, setTasks] = useState([]);
  const [err, setErr] = useState('');

  useEffect(() => {
    if (bootstrapped && !user) router.push('/login');
  }, [bootstrapped, user, router]);

  useEffect(() => {
    if (!user) return;
    api.get('/tasks')
      .then(({ data }) => setTasks(data.tasks))
      .catch(e => setErr(e?.response?.data?.message || 'Failed to fetch'));
  }, [user]);

  return (
    <>
      <NavBar />
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3>Your Tasks</h3>
          <Link href="/tasks/new" className="btn btn-primary">Add Task</Link>
        </div>
        {err && <div className="alert alert-danger">{err}</div>}
        <div className="list-group">
          {tasks.map(t => (
            <Link key={t._id} href={`/tasks/${t._id}`} className="list-group-item list-group-item-action">
              <div className="d-flex justify-content-between">
                <strong>{t.title}</strong>
                <span className="badge bg-secondary text-capitalize">{t.status}</span>
              </div>
              <small className="text-muted">{new Date(t.createdAt).toLocaleString()}</small>
            </Link>
          ))}
          {tasks.length === 0 && <div className="text-muted">No tasks yet.</div>}
        </div>
      </div>
    </>
  );
}
