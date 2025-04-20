import { useNavigate } from 'react-router-dom';
import '../css/HomePage.css';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      <header className="landing-header">
        <h1>User Management</h1>
        <p>Manage your users easily, quickly, and securely.</p>
      </header>

      <main className="landing-main">
        <img
          src="https://cdn-icons-png.flaticon.com/512/9131/9131529.png"
          alt="User Management"
          className="landing-image"
        />
        <p className="landing-description">
          Our platform allows you to create, edit, and manage users with a simple yet powerful interface.
        </p>

        <div className="landing-buttons">
          <button onClick={() => navigate('/login')} className="btn login-btn">
            Log In
          </button>
          <button onClick={() => navigate('/createuser')} className="btn register-btn">
            Create User
          </button>
        </div>
      </main>
    </div>
  );
}
