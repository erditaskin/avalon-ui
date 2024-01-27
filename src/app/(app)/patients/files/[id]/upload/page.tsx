"use client";
import * as React from "react";
import PageContent from "@/components/cards/PageContent";
import { Box, Typography } from "@mui/material";
import PageHeader from "@/components/cards/PageHeader";
import Form from "../../../components/PatientFileForm";

const Page = ({ params }: { params: { id: number } }) => {
  return (
    <PageContent
      header={
        <PageHeader
          breadcrumbs={[
            { label: "Patients List", path: "/patients" },
            { label: "Patient Files", path: "/patients/files/" + params.id },
            {
              label: "Upload New File",
              path: "/patients/files/" + params.id + "/upload",
            },
          ]}
        >
          <Box display="flex" flexWrap="wrap">
            <Typography
              variant="h6"
              marginRight={3}
              justifyContent="flex-start"
            >
              Upload New File
            </Typography>
          </Box>
        </PageHeader>
      }
    >
      <Box sx={{ mt: 3 }}>
        <Form id={params.id} />
      </Box>
    </PageContent>
  );
};

export default Page;
