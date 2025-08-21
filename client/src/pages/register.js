import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import NavBar from '../components/NavBar';

export default function Register() {
  const { register } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr('');

    if (!form.name || !form.email || !form.password || !form.confirm) {
      return setErr('All fields are required');
    }
    if (form.password.length < 6) {
      return setErr('Password must be at least 6 characters');
    }
    if (form.password !== form.confirm) {
      return setErr('Passwords do not match');
    }

    try {
      setLoading(true);
      await register(form.name, form.email, form.password);
    } catch (e) {
      setErr(e?.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <NavBar />
      <div className="container" style={{ maxWidth: 480 }}>
        <h3 className="mb-3">Register</h3>
        {err && <div className="alert alert-danger">{err}</div>}
        <form onSubmit={onSubmit}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              value={form.confirm}
              onChange={(e) => setForm({ ...form, confirm: e.target.value })}
              required
            />
          </div>
          <button className="btn btn-primary w-100" disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
      </div>
    </>
  );
}
