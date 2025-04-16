import { useEffect, useState } from "react";

export default function UserManagementApp() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const fetchUsers = async () => {
    const res = await fetch("http://myapp.local/api/users");
    const data = await res.json();
    setUsers(data);
  };

  const addUser = async () => {
    await fetch("http://myapp.local/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email }),
    });
    setName("");
    setEmail("");
    fetchUsers();
  };

  const deleteUser = async (id) => {
    await fetch(`http://myapp.local/api/users/${id}`, { method: "DELETE" });
    fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="max-w-xl mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold">User Management</h1>

      <div className="space-y-4">
        <input
          className="border p-2 w-full"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="border p-2 w-full"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          onClick={addUser}
          className="bg-blue-500 text-white p-2 w-full"
        >
          Add User
        </button>
      </div>

      <div className="space-y-2">
        {users.map((user) => (
          <div
            key={user.id}
            className="flex justify-between items-center p-4 border-b"
          >
            <div>
              <p className="font-semibold">{user.name}</p>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
            <button
              onClick={() => deleteUser(user.id)}
              className="bg-red-500 text-white p-2"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
