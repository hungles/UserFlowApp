import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="container">
      <h1>Página Principal</h1>
      <p style={{ textAlign: "center" }}>Bienvenido a la aplicación.</p>
      <nav>
        <Link to="/login">Login</Link>
        <Link to="/crear-usuario">Crear Usuario</Link>
      </nav>
    </div>
  );
}
