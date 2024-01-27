"use client";
import * as React from "react";
import { redirect } from "next/navigation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import BaseLayout from "@/components/layout/BaseLayout";
import Loading from "@/components/common/Loading";
import { useSession } from "@/components/contexts/session";
import RootLayout from "@/components/layout/RootLayout";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const session = useSession();
  const [queryClient] = React.useState(() => new QueryClient());

  if (session?.isSessionLoading) {
    return <Loading />;
  }

  if (!session?.session) {
    return redirect("/auth/login");
  }

  return (
    <QueryClientProvider client={queryClient}>
      <RootLayout>
        <BaseLayout>{children}</BaseLayout>
      </RootLayout>
    </QueryClientProvider>
  );
};

export default AppLayout;
