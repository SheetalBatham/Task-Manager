import Link from 'next/link';
import { useAuth } from '../context/AuthContext';

export default function NavBar() {
  const { user, logout } = useAuth();
  return (
    <nav className="navbar navbar-expand navbar-light bg-light mb-4">
      <div className="container">
        <Link href="/" className="navbar-brand">TaskManager</Link>
        <div className="navbar-nav ms-auto">
          {user ? (
            <>
              <Link href="/tasks" className="nav-link">All Tasks</Link>
              <Link href="/profile" className="nav-link">Profile</Link>
              <button className="btn btn-outline-danger ms-2" onClick={logout}>Logout</button>
            </>
          ) : (
            <>
              <Link href="/login" className="nav-link">Login</Link>
              <Link href="/register" className="nav-link">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
