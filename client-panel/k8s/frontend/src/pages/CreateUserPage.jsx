import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/CreateUser.css';

export default function CreateUserPage() {
  // State variables to hold form input values
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // State for showing success and error messages
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // React Router hook to navigate programmatically
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form reload behavior

    const userData = {
      username,
      email,
      password,
    };

    try {
      // Send POST request to the backend API to register a new user
      const response = await fetch('http://myapp.local/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        // If registration is successful, show success message and reset form
        setSuccessMessage(data.message || 'User created successfully');
        setErrorMessage('');
        setUsername('');
        setEmail('');
        setPassword('');

        // After 2 seconds, redirect to homepage (or another route)
        setTimeout(() => {
          navigate('/');
        }, 2000);
      } else {
        // If backend returns an error (e.g. user already exists)
        setSuccessMessage('');
        setErrorMessage(data.detail || 'Error creating user');
      }
    } catch (error) {
      // If fetch fails (e.g. server down or network error)
      console.error('Error:', error);
      setSuccessMessage('');
      setErrorMessage('Network error creating user');
    }
  };

  return (
    <div className="container">
      <h1>Create User</h1>

      {/* Display success message if exists */}
      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}

      {/* Display error message if exists */}
      {errorMessage && (
        <div className="error-message">{errorMessage}</div>
      )}

      {/* User creation form */}
      <form onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
