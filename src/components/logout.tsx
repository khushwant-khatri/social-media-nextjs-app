"use client";

import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
    <button
      onClick={() =>
        signOut({
          redirect: false,
        })
      }
      className="border rounded p-4 bg-blue-200"
    >
      Sign Out
    </button>
  );
}
