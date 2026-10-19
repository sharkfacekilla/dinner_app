"use client";

import { createContext, useContext } from "react";

// The usernames you can share recipes with, loaded once by the (main) layout
const OtherUsersContext = createContext<string[]>([]);

export function OtherUsersProvider({
  users,
  children,
}: {
  users: string[];
  children: React.ReactNode;
}) {
  return <OtherUsersContext.Provider value={users}>{children}</OtherUsersContext.Provider>;
}

export const useOtherUsers = () => useContext(OtherUsersContext);
