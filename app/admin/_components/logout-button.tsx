"use client";

import { logoutAction } from "../actions";

export function LogoutButton() {
  return (
    <form action={logoutAction}>
      <button
        type="submit"
        className="text-sm font-medium text-stone hover:text-rust transition-colors"
      >
        Tanca sessió →
      </button>
    </form>
  );
}
