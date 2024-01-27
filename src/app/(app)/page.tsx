"use client";
import PageContent from "@/components/cards/PageContent";
import PageHeader from "@/components/cards/PageHeader";
import { Api, useQuery } from "@/lib/api-request";
import { Box, Typography, Card, CardContent, Skeleton } from "@mui/material";
import * as React from "react";

const Page = () => {
  const { data } = useQuery({
    queryKey: ["dashboard"],
    queryFn: () => Api.get("/dashboard/stats"),
  });

  return (
    <PageContent
      header={
        <PageHeader breadcrumbs={[{ label: "Dashboard", path: "/" }]}>
          <Box display="flex" flexWrap="wrap">
            <Typography
              variant="h6"
              marginRight={3}
              justifyContent="flex-start"
            >
              Dashboard
            </Typography>
          </Box>
        </PageHeader>
      }
    >
      <Box sx={{ mt: 3 }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
            gap: 2,
          }}
        >
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6">Total Users</Typography>
              <Typography>{data?.data?.users || 0}</Typography>
            </CardContent>
          </Card>

          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6">Total Patients</Typography>
              <Typography>{data?.data?.patients || 0}</Typography>
            </CardContent>
          </Card>

          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6">Total Patient Files</Typography>
              <Typography>{data?.data?.patientFiles || 0}</Typography>
            </CardContent>
          </Card>

          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6">Total Appoinments</Typography>
              <Typography>{data?.data?.appointments || 0}</Typography>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </PageContent>
  );
};

export default Page;
