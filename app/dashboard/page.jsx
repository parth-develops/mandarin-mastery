import { signOut, auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const session = await auth();
  if (!session.user) return null;

  return (
    <>
      <div>Dashboard</div>
      <form
        action={async () => {
          'use server';
          await signOut({redirectTo: "/signin"});
        }}
      >

        <button>
          Logout
        </button>
      </form>
    </>

  )
}
