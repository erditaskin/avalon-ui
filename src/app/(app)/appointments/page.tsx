"use client";
import * as React from "react";
import PageContent from "@/components/cards/PageContent";
import { Box, Typography } from "@mui/material";
import PageHeader from "@/components/cards/PageHeader";

const Profile = () => {
  return (
    <PageContent
      header={
        <PageHeader
          breadcrumbs={[{ label: "Appointments", path: "/appoinments" }]}
        >
          <Box display="flex" flexWrap="wrap">
            <Typography
              variant="h6"
              marginRight={3}
              justifyContent="flex-start"
            >
              Appointments
            </Typography>
          </Box>
        </PageHeader>
      }
    >
      <Box sx={{ mt: 3 }}>{"//to do"}</Box>
    </PageContent>
  );
};

export default Profile;
