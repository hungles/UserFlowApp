export default function LoginPage() {
    return (
      <div className="container">
        <h1>Login</h1>
        <form>
          <label>User</label>
          <input type="text" />
          <label>Password</label>
          <input type="password" />
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }
  