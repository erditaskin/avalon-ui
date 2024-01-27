"use client";
import * as React from "react";
import { Box, Toolbar } from "@mui/material";
import PageHeaderBreadCrumbs, { IBreadCrumb } from "./PageHeaderBreadCrumbs";

interface IProps {
  breadcrumbs?: IBreadCrumb[];
  children: any;
}

export default function PageHeader(props: IProps) {
  return (
    <Toolbar disableGutters>
      <Box
        sx={{
          flexGrow: 1,
          my: 1,
          flexDirection: { xs: "column", sm: "row" },
          alignItems: { xs: "start", sm: "center" },
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        {props.children}
      </Box>
      <Box sx={{ justifyContent: "flex-end" }}>
        <PageHeaderBreadCrumbs
          breadcrumbs={props.breadcrumbs}
        ></PageHeaderBreadCrumbs>
      </Box>
    </Toolbar>
  );
}
