"use client";
import * as React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { ProfileUpdateService } from "@/services";
import { toast } from "react-hot-toast";
import { MuiFileInput } from "mui-file-input";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { useSession } from "@/components/contexts/session";
import { IAuthUser } from "@/interfaces";
import { useRouter } from "next/navigation";
import { Toolbar } from "@mui/material";

const Form = () => {
  const session = useSession();
  const router = useRouter();
  const [formLoading, setFormLoading] = React.useState<true | false>(false);
  const validationSchema = Yup.object().shape({
    avatar: Yup.mixed()
      .required("required")
      .test(
        "fileFormat",
        "Only jpg, png, gif files are allowed",
        (value: any) => {
          if (value) {
            const supportedFormats = ["jpg", "jpeg", "png", "gif"];
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
    setFormLoading(true);
    ProfileUpdateService({
      data: values,
      async success(res: any) {
        toast.success("Your profile picture has been uploaded successfully");
        session?.updateUser(res.user as IAuthUser);
      },
      error() {
        toast.error(
          "Error occured, your profile picture could not been uploaded"
        );
        setFile(null);
      },
      async final() {
        setFormLoading(false);
      },
    });
  };

  const formik = useFormik({
    initialValues: {
      avatar: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      formSubmit(values);
    },
  });

  const [file, setFile] = React.useState<File | null>(null);
  const handleChange = (newFile: File | null) => {
    setFile(newFile);
    formik.setFieldValue("avatar", newFile);
  };

  return (
    <Box component="form" onSubmit={formik.handleSubmit}>
      <Grid container spacing={1}>
        <Grid item sm={2}>
          Profile Picture
        </Grid>
        <Grid>
          <MuiFileInput
            size="small"
            placeholder="Please select an image file to update"
            fullWidth
            variant="outlined"
            value={file}
            onChange={handleChange}
            InputProps={{
              inputProps: {
                accept: "image/*",
              },
              startAdornment: <AttachFileIcon />,
            }}
            onBlur={formik.handleBlur("avatar")}
            error={formik.touched.avatar && !!formik.errors.avatar}
            helperText={formik.errors.avatar}
          />
        </Grid>
      </Grid>

      <Grid>
        <Toolbar
          sx={{
            pt: 5,
            mt: 5,
            borderTop: "1px solid",
            borderColor: "divider",
            justifyContent: "flex-end",
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
      </Grid>
    </Box>
  );
};

export default Form;
