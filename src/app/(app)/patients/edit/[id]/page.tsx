"use client";
import * as React from "react";
import PageContent from "@/components/cards/PageContent";
import { Box, Typography } from "@mui/material";
import PageHeader from "@/components/cards/PageHeader";
import Form from "../../components/PatientForm";
import { Api } from "@/lib/api-request";
import { IPatient } from "@/interfaces";
import toast from "react-hot-toast";

const Page = ({ params }: { params: { id: number } }) => {
  const [data, setData] = React.useState<null | IPatient>(null);
  const [loading, setLoading] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (!data && !loading && params.id) {
      const fetchData = async () => {
        setLoading(true);
        try {
          await Api.get(`/patient/show/${params.id}`).then((res) => {
            setData(parseData(res.data));
          });
        } catch (error) {
          toast.error("Patient data could not fetch.");
        }
        setLoading(false);
      };

      fetchData();
    }
  }, [data, params.id, setData, loading]);

  const parseData = (data: any): IPatient => {
    return {
      id: data.id,
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
    };
  };

  return (
    <PageContent
      header={
        <PageHeader
          breadcrumbs={[
            { label: "Patients List", path: "/patients" },
            { label: "Update Patient", path: "/patients/edit/" + params.id },
          ]}
        >
          <Box display="flex" flexWrap="wrap">
            <Typography
              variant="h6"
              marginRight={3}
              justifyContent="flex-start"
            >
              Update Patient
            </Typography>
          </Box>
        </PageHeader>
      }
    >
      <Box sx={{ mt: 3 }}>
        <Form
          type="edit"
          id={data ? data.id : null}
          initialValues={data ? data : {}}
          isLoading={loading}
        />
      </Box>
    </PageContent>
  );
};

export default Page;
