"use client";
import * as React from "react";
import PageContent from "@/components/cards/PageContent";
import { Box, Button, Grid, Toolbar, Typography } from "@mui/material";
import PageHeader from "@/components/cards/PageHeader";
import { useRouter } from "next/navigation";
import Table from "../../components/PatientFilesTable";
import { Api, delay, useQuery } from "@/lib/api-request";
import { IPatient, IPatientFile } from "@/interfaces";
import { useConfirm } from "material-ui-confirm";
import toast from "react-hot-toast";
import { PatientDeleteService, PatientFileDeleteService } from "@/services";
import FileUploadIcon from "@mui/icons-material/FileUpload";

const PatientFiles = ({ params }: { params: { id: number } }) => {
  const router = useRouter();
  const confirm = useConfirm();
  const { data, isLoading } = useQuery({
    queryKey: ["patientsFileList"],
    queryFn: async () => {
      const response = await Api.get("/patient/file/list/" + params?.id);
      return parseData(response.data);
    },
  });

  const parseData = (arr: any[]): IPatientFile[] => {
    return arr.map((item) => ({
      id: item.id,
      fileName: item.fileName,
      note: item.note,
      createdAt: item.createdAt,
      createdBy: {
        firstName: item.createdBy.firstName,
        lastName: item.createdBy.lastName,
      },
    }));
  };

  const handleDownloadFile = (fileName: string) => {
    window.open(
      process.env.NEXT_PUBLIC_S3_URL + fileName,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const handleDelete = (id: number) => {
    confirm({
      description: `This will permanently delete patient file. Do you want to proceed?`,
    })
      .then(async () => {
        PatientFileDeleteService({
          id: id,
          async success(res: any) {
            toast.success("Patient File successfully has been deleted.");
            await delay(2000);
            window.location.reload();
          },
          error() {
            toast.error("Error occured. Patient File could not been deleted.");
          },
        });
      })
      .catch(() => {
        toast("File Delete cancelled");
      });
  };

  const [patient, setPatient] = React.useState<null | IPatient>(null);
  const [patientLoading, setPatientLoading] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (!patient && !patientLoading && params.id) {
      const fetchData = async () => {
        setPatientLoading(true);
        try {
          await Api.get(`/patient/show/${params.id}`).then((res) => {
            setPatient(parsePatientData(res.data));
          });
        } catch (error) {
          toast.error("Patient data could not fetch.");
        }
        setPatientLoading(false);
      };

      fetchData();
    }
  }, [patient, params.id, setPatient, patientLoading]);

  const parsePatientData = (data: any): IPatient => {
    return {
      id: data.id,
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      createdBy: data.createdBy,
    };
  };

  return (
    <PageContent
      header={
        <PageHeader
          breadcrumbs={[
            { label: "Patients List", path: "/patients" },
            { label: "Patient Files", path: "/patients/files/" + params.id },
          ]}
        >
          <Box display="flex" flexWrap="wrap">
            <Typography
              variant="h6"
              marginRight={3}
              justifyContent="flex-start"
            >
              {"Patient's File List"}
            </Typography>
          </Box>
        </PageHeader>
      }
    >
      {patient && !patientLoading && (
        <Grid container spacing={0} sx={{ my: 1 }}>
          <Grid item xs={12}>
            Patient :{" "}
            <strong>{patient?.firstName + " " + patient?.lastName}</strong>
          </Grid>
          <Grid item xs={12}>
            Created By :{" "}
            <strong>
              {patient?.createdBy?.firstName +
                " " +
                patient?.createdBy?.lastName}
            </strong>
          </Grid>
        </Grid>
      )}
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
          startIcon={<FileUploadIcon />}
          onClick={() =>
            router.replace("/patients/files/" + params.id + "/upload")
          }
        >
          Upload New File
        </Button>
      </Toolbar>

      <Table
        data={!isLoading && data ? data : []}
        onDownloadFile={handleDownloadFile}
        onDelete={handleDelete}
      />
    </PageContent>
  );
};

export default PatientFiles;
