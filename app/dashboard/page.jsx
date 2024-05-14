import { signOut } from "@/auth";

export default function Dashboard() {

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
