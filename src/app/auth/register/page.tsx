"use client";
import * as React from "react";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { AuthRegisterService } from "@/services";
import { toast } from "react-hot-toast";
import { Api, delay, useQuery } from "@/lib/api-request";
import { IOccupation } from "@/interfaces";

const Register = () => {
  const router = useRouter();

  const [formLoading, setFormLoading] = React.useState<true | false>(false);
  const [occupations, setOccupations] = React.useState<IOccupation[]>([]);

  const occupationsQuery = useQuery({
    queryKey: ["occupationList"],
    queryFn: () => Api.get("/occupation/list"),
  });

  React.useEffect(() => {
    if (!occupationsQuery?.isLoading) {
      setOccupations(occupationsQuery.data?.data ?? []);
    }
  }, [occupationsQuery]);

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("* Required"),
    lastName: Yup.string().required("* Required"),
    occupation_id: Yup.number().required("* Required"),
    email: Yup.string().email("Invalid email").required("* Required"),
    password: Yup.string()
      .required("* Required")
      .min(6, "Password is too short - should be 8 chars minimum."),
    passwordConfirmation: Yup.string()
      .required("* Required")
      .oneOf([Yup.ref("password")], "Passwords must match"),
  });

  const formSubmit = async (values: any) => {
    setFormLoading(true);
    AuthRegisterService({
      data: values,
      async success() {
        toast.success(
          "Your account has been successfully registered. You can sign in."
        );
        await delay(2000);
        router.replace("/");
      },
      error() {
        toast.error("Error occured, your account could not be registered.");
      },
      async final() {
        setFormLoading(false);
      },
    });
  };

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      occupation_id: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      formSubmit(values);
    },
  });

  const logoSrc = `${process.env.NEXT_PUBLIC_S3_URL}assets/logo.png`;

  return (
    <>
      <Typography component="h1" variant="h5">
        Register
      </Typography>
      <Box
        component="form"
        onSubmit={formik.handleSubmit}
        noValidate
        sx={{ mt: 1 }}
      >
        <TextField
          margin="normal"
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
        <TextField
          margin="normal"
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
        <Autocomplete
          disablePortal
          fullWidth
          id="occupation_id"
          options={occupations}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Occupation"
              margin="normal"
              required
              fullWidth
              error={
                formik.touched.occupation_id && !!formik.errors.occupation_id
              }
              helperText={formik.errors.occupation_id}
            />
          )}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          getOptionLabel={(option) => option.name}
          onChange={(e, value) =>
            formik.setFieldValue("occupation_id", value?.id || 0)
          }
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange("email")}
          onBlur={formik.handleBlur("email")}
          error={formik.touched.email && !!formik.errors.email}
          helperText={formik.errors.email}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          value={formik.values.password}
          onChange={formik.handleChange("password")}
          onBlur={formik.handleBlur("password")}
          error={formik.touched.password && !!formik.errors.password}
          helperText={formik.errors.password}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="passwordConfirmation"
          label="Confirm Password"
          type="password"
          id="passwordConfirmation"
          autoComplete="off"
          value={formik.values.passwordConfirmation}
          onChange={formik.handleChange("passwordConfirmation")}
          onBlur={formik.handleBlur("passwordConfirmation")}
          error={
            formik.touched.passwordConfirmation &&
            !!formik.errors.passwordConfirmation
          }
          helperText={formik.errors.passwordConfirmation}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          disabled={formLoading}
        >
          {formLoading ? "Loading" : "Sign Up"}
        </Button>
        <Grid container>
          <Grid item>
            <Link href="/auth/login" variant="body2">
              {"Have an account already? Sign In"}
            </Link>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Register;
