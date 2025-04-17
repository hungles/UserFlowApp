import React, { useState } from 'react';
import './Login.css';  // Importamos el archivo CSS para los estilos

const Login = () => {
    // Estado para los campos del formulario y mensajes de error
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    // Función de manejo del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();  // Evita que recargue la página
    
        if (username === '' || password === '') {
            setError('Por favor, ingrese ambos campos.');
            return;
        }
    
        try {
            const response = await fetch('http://localhost:8000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });
    
            if (response.ok) {
                setError('');
                // Redirige al dashboard si las credenciales son correctas
                window.location.href = 'http://localhost:3002';
            } else {
                const data = await response.json();
                setError(data.detail || 'Usuario o contraseña incorrectos.');
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
            setError('Error al conectar con el servidor.');
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit} className="login-form">
                <h2>Iniciar Sesión</h2>
                {error && <p className="error-message">{error}</p>}
                <div className="input-group">
                    <label htmlFor="username">Usuario:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Introduce tu usuario"
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
                <button type="submit" className="login-btn">Iniciar Sesión</button>
            </form>
        </div>
    );
};

export default Login;
