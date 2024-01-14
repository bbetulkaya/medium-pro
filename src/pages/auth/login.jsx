import { useState } from "react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  async function handleLogin(e) {
    e.preventDefault();

    const result = await signIn("credentials", {
      username,
      password,
      redirect: false, // Set to true if you want to handle redirection manually
    });

    if (result.error) {
      // Handle login error
      console.error("Authentication failed:", result.error);
    } else {
      // Redirect to the intended page after successful login
      router.push("/"); // Change to your desired redirect path
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
