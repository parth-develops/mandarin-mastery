import { signOut, auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const session = await auth();
  if (!session) {
    redirect("/signin");
  }

  return (
    <>
      <div>Dashboard</div>
      <form
        action={async () => {
          'use server';
          await signOut();
        }}
      >

        <button>
          Logout
        </button>
      </form>
    </>

  )
}
