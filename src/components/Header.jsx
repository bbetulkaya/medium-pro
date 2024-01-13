import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [username, setUsername] = useState(null);
  
  return (
    <header className="flex justify-between mt-4 mb-10">
      <Link href={"/"} className="text-xl font-bold">
        Medium Pro
      </Link>

      <nav className="flex gap-4">
        <Link href={"/login"} className="">
          Login
        </Link>
        <Link href={"/register"}>Register</Link>
      </nav>
    </header>
  );
}
