import * as React from "react";
import { SessionProvider } from "@/components/contexts/session";
export const metadata = {
  title: "Avalon",
  description: "Avalon Medical Metadata Operations",
};
import "./global.css";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
};

export default Layout;
