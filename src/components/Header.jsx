import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import LogoutButton from "./LogoutButton";

export default function Header() {
  const { data: session } = useSession();

  return (
    <header className="flex justify-between mt-4 mb-10">
      <Link href={"/"} className="text-xl font-bold">
        Medium Pro
      </Link>

      <nav className="flex gap-4 items-center">
        {session ? (
          <>
            <Link href={"/create-post"}>Create a New Post</Link>
            <LogoutButton />
          </>
        ) : (
          <>
            <Link href={"auth/login"} className="">
              Login
            </Link>
            <Link href={"auth/register"}>Register</Link>
          </>
        )}
      </nav>
    </header>
  );
}
