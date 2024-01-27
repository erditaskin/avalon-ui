"use client";
import * as React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import RootLayout from "@/components/layout/RootLayout";
import { Container } from "@mui/material";
import { useSession } from "@/components/contexts/session";
import Loading from "@/components/common/Loading";
import { redirect, usePathname } from "next/navigation";
import Box from "@mui/material/Box";
import Logo from "@/components/common/Logo";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = React.useState(() => new QueryClient());
  const session = useSession();
  const pathname = usePathname();

  if (session?.isSessionLoading) {
    return <Loading />;
  }

  if (session?.session && !pathname?.includes("logout")) {
    return redirect("/");
  }

  return (
    <QueryClientProvider client={queryClient}>
      <RootLayout>
        <Container component="main" maxWidth="xs">
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Logo />
            {children}
          </Box>
        </Container>
      </RootLayout>
    </QueryClientProvider>
  );
};

export default AppLayout;
