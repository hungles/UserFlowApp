export default function LoginPage() {
    return (
      <div className="container">
        <h1>Login</h1>
        <form>
          <label>Usuario</label>
          <input type="text" />
          <label>Contraseña</label>
          <input type="password" />
          <button type="submit">Iniciar Sesión</button>
        </form>
      </div>
    );
  }
  