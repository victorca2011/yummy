// components/SessionWrapper.tsx
"use client"; // Certifique-se de que isso esteja presente

import { SessionProvider } from "next-auth/react";

const SessionWrapper = ({ children }: { children: React.ReactNode }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default SessionWrapper;
