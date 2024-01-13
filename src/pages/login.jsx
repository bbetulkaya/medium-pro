import { useState } from "react";
import axios from "axios";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const response = await axios.post("/api/login", {
        username,
        password,
      });
      const responseData = response.data;
      console.log("Response:", responseData);

      // Handle the response data here, for example, redirect to another page
    } catch (error) {
      console.error("Error during login:", error.message);

      // Handle the error, for example, display an error message to the user
    }
  }

  return (
    <form action="" onSubmit={handleLogin}>
      <h1>Login</h1>
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
      <button>Login</button>
    </form>
  );
}
