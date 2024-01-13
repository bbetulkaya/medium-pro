import { useState } from "react";
import axios from "axios";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleRegister(e) {
    e.preventDefault();

    try {
      const response = await axios.post("/api/register", {
        username,
        password,
      });
      if (response.status === 201) {
        console.log("Registration successful");
        // Handle successful registration, e.g., redirect to login page
      } else {
        console.error(
          "Registration failed:",
          response.data.error || "Internal Server Error"
        );
      }
    } catch (error) {
      console.error(
        "Error during registration:",
        error.message || "Internal Server Error"
      );
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
    </form>
  );
}
