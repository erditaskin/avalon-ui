"use client";
import * as React from "react";
import { useRouter } from "next/navigation";
import Typography from "@mui/material/Typography";
import { useSession } from "@/components/contexts/session";
import { delay } from "@/lib/api-request";

const Logout = () => {
  const router = useRouter();
  const session = useSession();

  React.useEffect(() => {
    session?.signOut();
    return () => {
      delay(2000);
      router.replace("/auth/login");
    };
  }, [router, session, session?.signOut]);

  return (
    <>
      <Typography component="h1" variant="h5">
        Log Out
      </Typography>
      <Typography component="h1" variant="h6">
        {"You're being logged out. Please wait. You'll be redirected."}
      </Typography>
    </>
  );
};

export default Logout;
