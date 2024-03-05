import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";

export default function IndexPage() {
  const { data, status } = useSession();

  if (status === "loading") return <h1> loading... please wait</h1>;
  if (status === "authenticated") {
    return (
      <div>
        <div>
          <h1> hi {data.user?.name}</h1>
          <Image
            src={data.user?.image || ""}
            alt={data.user?.name + " photo"}
            width={100}
            height={100}
          />
          <button onClick={() => signOut()}>sign out</button>
        </div>
        <div></div>
      </div>
    );
  }
  return (
    <div>
      <button onClick={() => signIn("google")}>sign in with google</button>
    </div>
  );
}
