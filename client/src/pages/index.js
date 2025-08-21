import NavBar from '../components/NavBar';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';

export default function Home() {
  const { user } = useAuth();
  return (
    <>
      <NavBar />
      <div className="container">
        <div className="p-5 bg-light rounded-3">
          <h1 className="display-6">Welcome{user ? `, ${user.name}` : ''}!</h1>
          <p className="lead">Manage your tasks with a simple Next.js + Express app.</p>
          <Link className="btn btn-primary" href={user ? '/tasks' : '/login'}>
            {user ? 'Go to Tasks' : 'Get Started'}
          </Link>
        </div>
      </div>
    </>
  );
}
