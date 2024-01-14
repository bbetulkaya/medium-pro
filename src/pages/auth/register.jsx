import { useState } from "react";
import axios from "axios";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);

  async function handleRegister(e) {
    e.preventDefault();

    try {
      const response = await axios.post("/api/register", {
        username,
        password,
      });

      if (response.data.success) {
        setMessage(response.data.message);
        // Optionally, you can redirect the user after successful registration
        // e.g., router.push("/login");
      } else {
        setMessage("Registration failed");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setMessage("Internal Server Error");
    }
  }
  return (
    <form action="" onSubmit={handleRegister}>
      <h1>Register</h1>
      <input
        type="text"
        placeholder="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button>Register</button>
      {message && <p>{message}</p>}
    </form>
  );
}
