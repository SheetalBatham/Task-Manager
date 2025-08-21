import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from 'react';
// import AuthProvider from '../context/AuthContext';
import { AuthProvider } from '../context/AuthContext';

export default function MyApp({ Component, pageProps }) {
  // Ensure Bootstrap JS (optional, only for dropdowns/modals, etc.)
  useEffect(() => {
    import('bootstrap/dist/js/bootstrap.bundle.min.js');
  }, []);

  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}
