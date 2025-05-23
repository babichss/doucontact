import { useState } from "react";
import type { Contact } from "../types";
import { MY_PROFILE_KEY } from "../utils/storage";

export function useProfile() {
  const [{ profile, error }] = useState<{ profile: Contact | null, error: string | null }>(() => {
    const p = localStorage.getItem(MY_PROFILE_KEY);
    try {
      return { profile: p ? (JSON.parse(p) as Contact) : null, error: null };
    } catch {
      return { profile: null, error: "Invalid profile" };
    }
  });

  return { profile, error };
}