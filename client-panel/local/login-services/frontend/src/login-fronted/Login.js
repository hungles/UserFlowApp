import React, { useState } from 'react';
import './Login.css';  // Importamos el archivo CSS para los estilos

const Login = () => {
    // Estado para los campos del formulario y mensajes de error
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    // Función de manejo del formulario
    const handleSubmit = (e) => {
        e.preventDefault();  // Evitar recargar la página al enviar el formulario

        if (username === '' || password === '') {
            setError('Por favor, ingrese ambos campos.');
            return;
        }

        if (username === 'admin' && password === '1234') {
            setError('');
            alert('¡Bienvenido!');
        } else {
            setError('Usuario o contraseña incorrectos.');
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
