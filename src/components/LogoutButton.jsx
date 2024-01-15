import { signOut } from "next-auth/react";
import { useRouter } from "next/router";

const LogoutButton = () => {
  const router = useRouter();

  async function handleLogout() {
    await signOut();
    // console.log("User signed out");
    // router.push("/auth/login");
  }
  return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;
