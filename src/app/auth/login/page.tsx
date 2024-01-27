"use client";
import * as React from "react";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { AuthLoginService } from "@/services";
import { useSession } from "@/components/contexts/session";
import { toast } from "react-hot-toast";
import { delay } from "@/lib/api-request";

const Login = () => {
  const session = useSession();
  const router = useRouter();
  const [formLoading, setFormLoading] = React.useState<true | false>(false);

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("* Required"),
    password: Yup.string().required("* Required"),
  });

  const formSubmit = async (values: any) => {
    setFormLoading(true);
    AuthLoginService({
      values: values,
      async success(res: any) {
        session?.signIn(res?.token);
        toast.success(
          "Your have successfully signed in. You'll be redirected to Dashboard."
        );
        await delay(2000);
        router.replace("/");
      },
      error() {
        toast.error("Please check your credentials and try again.");
      },
      async final() {
        setFormLoading(false);
      },
    });
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      formSubmit(values);
    },
  });

  const src = `${process.env.NEXT_PUBLIC_S3_URL}assets/logo.png`;
  return (
    <>
      <Typography component="h1" variant="h5">
        Sign in
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
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          value={formik.values.email}
          onChange={formik.handleChange("email")}
          onBlur={formik.handleBlur("email")}
          error={formik.touched.email && !!formik.errors.email}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          value={formik.values.password}
          onChange={formik.handleChange("password")}
          onBlur={formik.handleBlur("password")}
          error={formik.touched.password && !!formik.errors.password}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          disabled={formLoading}
        >
          {formLoading ? "Loading" : "Sign In"}
        </Button>
        <Grid container>
          <Grid item>
            <Link href="/auth/register" variant="body2">
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Login;
