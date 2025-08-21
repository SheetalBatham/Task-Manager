import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import NavBar from '../components/NavBar';

export default function Login() {
  const { login } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [err, setErr] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr('');
    if (!form.email || !form.password) return setErr('Email and password are required');
    try {
      await login(form.email, form.password);
    } catch (e) {
      setErr(e?.response?.data?.message || 'Login failed');
    }
  };

  return (
    <>
      <NavBar />
      <div className="container" style={{ maxWidth: 480 }}>
        <h3 className="mb-3">Login</h3>
        {err && <div className="alert alert-danger">{err}</div>}
        <form onSubmit={onSubmit}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" className="form-control"
              value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password" className="form-control"
              value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required />
          </div>
          <button className="btn btn-primary w-100">Login</button>
        </form>
      </div>
    </>
  );
}
