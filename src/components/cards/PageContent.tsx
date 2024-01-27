"use client";
import * as React from "react";
import { Box, Stack, Divider } from "@mui/material";

interface IProps {
  header: any;
  children: any;
}

export default function PageContent({ header, children }: IProps) {
  return (
    <Box
      sx={{
        flex: 1,
        width: "100%",
      }}
    >
      <Box
        sx={{
          position: "sticky",
          top: {
            sm: -100,
            md: -110,
          },
          bgcolor: "background.body",
          zIndex: 995,
        }}
      >
        {header}
        <Divider />
      </Box>
      {children}
    </Box>
  );
}
