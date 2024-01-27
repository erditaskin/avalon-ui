"use client";
import * as React from "react";
import PageContent from "@/components/cards/PageContent";
import { Box, Typography } from "@mui/material";
import PageHeader from "@/components/cards/PageHeader";
import Form from "../components/PatientForm";

const Page = () => {
  return (
    <PageContent
      header={
        <PageHeader
          breadcrumbs={[
            { label: "Patients List", path: "/patients" },
            { label: "Add New Patient", path: "/patients/create" },
          ]}
        >
          <Box display="flex" flexWrap="wrap">
            <Typography
              variant="h6"
              marginRight={3}
              justifyContent="flex-start"
            >
              Add New Patient
            </Typography>
          </Box>
        </PageHeader>
      }
    >
      <Box sx={{ mt: 3 }}>
        <Form type="create" />
      </Box>
    </PageContent>
  );
};

export default Page;
