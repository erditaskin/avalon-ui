"use client";
import * as React from "react";
import PageContent from "@/components/cards/PageContent";
import { Box, Typography } from "@mui/material";
import PageHeader from "@/components/cards/PageHeader";
import Form from "./components/Form";

const Profile = () => {
  return (
    <PageContent
      header={
        <PageHeader
          breadcrumbs={[{ label: "Update Profile", path: "/account" }]}
        >
          <Box display="flex" flexWrap="wrap">
            <Typography
              variant="h6"
              marginRight={3}
              justifyContent="flex-start"
            >
              Account Profile
            </Typography>
          </Box>
        </PageHeader>
      }
    >
      <Box sx={{ mt: 3 }}>
        <Form />
      </Box>
    </PageContent>
  );
};

export default Profile;
