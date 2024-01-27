"use client";
import * as React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { PatientFileCreateService } from "@/services";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { FormControl, TextField, Toolbar } from "@mui/material";
import Loading from "@/components/common/Loading";
import AttachFileIcon from "@mui/icons-material/AttachFile";

import { MuiFileInput } from "mui-file-input";

interface IProps {
  id?: number | null;
  isLoading?: boolean;
}

const PatientFileForm = (props: IProps) => {
  const router = useRouter();
  const [formLoading, setFormLoading] = React.useState<true | false>(false);
  const validationSchema = Yup.object().shape({
    note: Yup.string().required("* Required"),
    file: Yup.mixed()
      .required("required")
      .test(
        "fileFormat",
        "Only jpg, png, gif, pdf files are allowed",
        (value: any) => {
          if (value) {
            const supportedFormats = ["jpg", "jpeg", "png", "gif", "pdf"];
            return supportedFormats.includes(value.name.split(".").pop());
          }
          return true;
        }
      )
      .test("fileSize", "File size must be less than 3MB", (value: any) => {
        if (value) {
          return value.size <= 3145728;
        }
        return true;
      }),
  });

  const formSubmit = async (values: any) => {
    console.log(values, "sub2");
    setFormLoading(true);
    PatientFileCreateService({
      data: {
        ...values,
        patientId: props.id,
      },
      async success(res: any) {
        toast.success("Patient File has been uploaded successfully");
        router.replace("/patients/files/" + props.id);
      },
      error() {
        toast.error("Error occured, patient file could not been uploaded");
        setFile(null);
      },
      async final() {
        setFormLoading(false);
      },
    });
  };

  const formik = useFormik({
    initialValues: {
      file: "",
      note: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      formSubmit(values);
    },
  });

  const [file, setFile] = React.useState<File | null>(null);
  const handleChange = (newFile: File | null) => {
    setFile(newFile);
    formik.setFieldValue("file", newFile);
  };

  if (props.isLoading) {
    return <Loading />;
  }

  return (
    <Box component="form" onSubmit={formik.handleSubmit}>
      <Grid container spacing={1}>
        <Grid item sm={4}>
          <TextField
            margin="normal"
            size="small"
            required
            fullWidth
            id="note"
            label="File Note"
            name="note"
            autoFocus
            value={formik.values.note}
            onChange={formik.handleChange("note")}
            onBlur={formik.handleBlur("note")}
            error={formik.touched.note && !!formik.errors.note}
            helperText={formik.errors.note}
          />
        </Grid>
        <Grid item sm={4}>
          <FormControl sx={{ mt: 2 }}>
            <MuiFileInput
              size="small"
              placeholder=".jpg, .png, .gif, .pdf files only"
              fullWidth
              variant="outlined"
              value={file}
              onChange={handleChange}
              InputProps={{
                inputProps: {
                  accept: ["image/*", "application/pdf"],
                },
                startAdornment: <AttachFileIcon />,
              }}
              onBlur={formik.handleBlur("file")}
              error={formik.touched.file && !!formik.errors.file}
              helperText={formik.errors.file}
            />
          </FormControl>
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
          {formLoading ? "Loading" : "Upload"}
        </Button>
      </Toolbar>
    </Box>
  );
};

export default PatientFileForm;
