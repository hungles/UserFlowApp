import React, { useState } from 'react';
import './Register.css';  // Importamos los estilos

const Register = () => {
    // Estado para los campos del formulario
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    // Función de manejo del formulario
    const handleRegister = async (e) => {
        e.preventDefault();  // Evitar recargar la página al enviar el formulario

        // Validación básica
        if (username === '' || email === '' || password === '') {
            setError('Por favor, complete todos los campos.');
            return;
        }

        const newUser = { username, email, password };

        // Enviar los datos al backend
        try {
            const response = await fetch('http://localhost:8000/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newUser)
            });

            const data = await response.json();

            if (data.success) {
                setSuccessMessage('Usuario registrado con éxito.');
                setError('');
            } else {
                setError(data.message);
                setSuccessMessage('');
            }
        } catch (err) {
            setError('Hubo un error al registrar el usuario.');
            setSuccessMessage('');
        }
    };

    return (
        <div className="register-container">
            <form onSubmit={handleRegister} className="register-form">
                <h2>Crear Cuenta</h2>
                {error && <p className="error-message">{error}</p>}
                {successMessage && <p className="success-message">{successMessage}</p>}
                
                <div className="input-group">
                    <label htmlFor="username">Usuario:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Introduce tu nombre de usuario"
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="email">Correo Electrónico:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Introduce tu correo electrónico"
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="password">Contraseña:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Introduce tu contraseña"
                    />
                </div>
                <button type="submit" className="register-btn">Registrar</button>
            </form>
        </div>
    );
};

export default Register;
