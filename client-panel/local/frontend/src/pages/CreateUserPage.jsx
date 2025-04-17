export default function CrearUsuarioPage() {
    return (
      <div className="container">
        <h1>Crear Usuario</h1>
        <form>
          <label>Nombre de Usuario</label>
          <input type="text" />
          <label>Email</label>
          <input type="email" />
          <label>Contraseña</label>
          <input type="password" />
          <button type="submit">Crear Usuario</button>
        </form>
      </div>
    );
  }
  