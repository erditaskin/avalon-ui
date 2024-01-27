import React from "react";
import ThemeRegistry from "@/components/ThemeRegistry/ThemeRegistry";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { ConfirmProvider } from "material-ui-confirm";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeRegistry>
        <ConfirmProvider>{children}</ConfirmProvider>
        <Toaster position="top-right" reverseOrder={false} />
      </ThemeRegistry>
    </QueryClientProvider>
  );
};

export default RootLayout;
