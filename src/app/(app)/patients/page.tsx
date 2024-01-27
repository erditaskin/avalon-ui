"use client";
import * as React from "react";
import PageContent from "@/components/cards/PageContent";
import { Box, Button, Grid, Toolbar, Typography } from "@mui/material";
import PageHeader from "@/components/cards/PageHeader";
import AddIcon from "@mui/icons-material/Add";
import { useRouter } from "next/navigation";
import Table from "./components/PatientsTable";
import { Api, delay, useQuery } from "@/lib/api-request";
import { IPatient } from "@/interfaces";
import { useConfirm } from "material-ui-confirm";
import toast from "react-hot-toast";
import { PatientDeleteService } from "@/services";

const Patients = () => {
  const router = useRouter();
  const confirm = useConfirm();
  const { data, isLoading } = useQuery({
    queryKey: ["patients"],
    queryFn: async () => {
      const response = await Api.get("/patient/list");
      return parseData(response.data);
    },
  });

  const parseData = (arr: any[]): IPatient[] => {
    return arr.map((item) => ({
      id: item.id,
      firstName: item.firstName,
      lastName: item.lastName,
      phone: item.phone,
      createdBy: {
        firstName: item.createdBy.firstName,
        lastName: item.createdBy.lastName,
      },
    }));
  };

  const handleBrowseAppoinments = (id: number) => {
    router.replace("appoinments/" + id);
  };

  const handleBrowseFiles = (id: number) => {
    router.replace("patients/files/" + id);
  };

  const handleEdit = (id: number) => {
    router.replace("patients/edit/" + id);
  };

  const handleDelete = (id: number) => {
    confirm({
      description: `This will permanently delete patient with it's files and appoinments. Do you want to proceed?`,
    })
      .then(async () => {
        PatientDeleteService({
          id: id,
          async success(res: any) {
            toast.success("Patient successfully has been deleted.");
            await delay(2000);
            window.location.reload();
          },
          error() {
            toast.error("Error occured. Patient could not been deleted.");
          },
        });
      })
      .catch(() => {
        toast("Delete cancelled");
      });
  };

  return (
    <PageContent
      header={
        <PageHeader
          breadcrumbs={[{ label: "Patients List", path: "/patients" }]}
        >
          <Box display="flex" flexWrap="wrap">
            <Typography
              variant="h6"
              marginRight={3}
              justifyContent="flex-start"
            >
              Patient List
            </Typography>
          </Box>
        </PageHeader>
      }
    >
      <Grid>
        <Toolbar
          sx={{
            my: 1,
            justifyContent: "space-between",
          }}
          disableGutters
        >
          <Button
            type="button"
            variant="contained"
            color="inherit"
            onClick={() => router.back()}
          >
            Back
          </Button>
          <Button
            sx={{ ml: 2 }}
            type="button"
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={() => router.replace("/patients/create")}
          >
            New Patient
          </Button>
        </Toolbar>
      </Grid>
      <Table
        data={!isLoading && data ? data : []}
        onBrowseFiles={handleBrowseFiles}
        onBrowseAppoinments={handleBrowseAppoinments}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
    </PageContent>
  );
};

export default Patients;
