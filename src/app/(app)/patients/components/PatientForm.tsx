"use client";
import * as React from "react";
import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { PatientCreateService, PatientUpdateService } from "@/services";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { TextField, Toolbar } from "@mui/material";
import Loading from "@/components/common/Loading";
import { delay } from "@/lib/api-request";

interface IProps {
  type: "create" | "edit";
  id?: number | null;
  isLoading?: boolean;
  initialValues?: {
    firstName?: string;
    lastName?: string;
    phone?: string;
  };
}

const PatientForm = (props: IProps) => {
  const router = useRouter();
  const [formLoading, setFormLoading] = React.useState<true | false>(false);
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("* Required"),
    lastName: Yup.string().required("* Required"),
    phone: Yup.string().required("* Required"),
  });

  const formSubmit = async (values: any) => {
    setFormLoading(true);
    if (props.type === "edit" && props.id) {
      values.id = props.id;
    }
    let parameters = {
      values: values,
      async success(res: any) {
        toast.success(
          "Patient has been " +
            (props.type === "create" ? "created" : "updated")
        );
        await delay(2000);
        router.replace("/patients");
      },
      error() {
        toast.error("Error occured, patients could not been saved.");
      },
      async final() {
        setFormLoading(false);
      },
    };

    if (props.type === "edit") {
      PatientUpdateService(parameters);
    } else {
      PatientCreateService(parameters);
    }
  };

  if (props.isLoading) {
    return <Loading />;
  }

  console.log(props);

  return (
    <Formik
      initialValues={
        props.initialValues ?? {
          firstName: "",
          lastName: "",
          phone: "",
        }
      }
      validationSchema={validationSchema}
      onSubmit={formSubmit}
    >
      {(formik) => (
        <Box component="form" onSubmit={formik.handleSubmit}>
          <Grid container spacing={1}>
            <Grid item sm={4}>
              <TextField
                margin="normal"
                size="small"
                required
                fullWidth
                id="firstName"
                label="First Name"
                name="firstName"
                autoFocus
                value={formik.values.firstName}
                onChange={formik.handleChange("firstName")}
                onBlur={formik.handleBlur("firstName")}
                error={formik.touched.firstName && !!formik.errors.firstName}
                helperText={formik.errors.firstName}
              />
            </Grid>
            <Grid item sm={4}>
              <TextField
                margin="normal"
                size="small"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                value={formik.values.lastName}
                onChange={formik.handleChange("lastName")}
                onBlur={formik.handleBlur("lastName")}
                error={formik.touched.lastName && !!formik.errors.lastName}
                helperText={formik.errors.lastName}
              />
            </Grid>
            <Grid item sm={4}>
              <TextField
                margin="normal"
                size="small"
                required
                fullWidth
                id="phone"
                label="Phone Number"
                name="phone"
                value={formik.values.phone}
                onChange={formik.handleChange("phone")}
                onBlur={formik.handleBlur("phone")}
                error={formik.touched.phone && !!formik.errors.phone}
                helperText={formik.errors.phone}
              />
            </Grid>
          </Grid>

          <Toolbar
            sx={{
              pt: 3,
              mt: 3,
              borderTop: "1px solid",
              borderColor: "divider",
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
              Cancel
            </Button>
            <Button
              sx={{ ml: 2 }}
              type="submit"
              variant="contained"
              disabled={formLoading}
            >
              {formLoading
                ? "Loading"
                : props.type === "create"
                ? "Create"
                : "Save"}
            </Button>
          </Toolbar>
        </Box>
      )}
    </Formik>
  );
};

export default PatientForm;
