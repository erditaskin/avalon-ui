"use client";
import React from "react";
import Header from "./Header";
import { Container } from "@mui/material";

const BaseLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <Container component="main" maxWidth={"xl"} sx={{ paddingTop: 10 }}>
        {children}
      </Container>
    </>
  );
};

export default BaseLayout;
