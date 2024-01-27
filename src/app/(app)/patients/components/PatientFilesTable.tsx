"use client";
import * as React from "react";
import {
  MRT_ColumnDef,
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { IPatientFile } from "@/interfaces";
import { MenuItem, ListItemIcon } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import DownloadIcon from "@mui/icons-material/Download";

interface IProps {
  data: IPatientFile[];
  onDownloadFile: (fileName: string) => void;
  onDelete: (id: number) => void;
}

const Table = (props: IProps) => {
  const { data, onDownloadFile, onDelete } = props;
  const columns = React.useMemo<MRT_ColumnDef<IPatientFile>[]>(
    () => [
      {
        accessorKey: "fileName",
        header: "File Name",
        size: 150,
      },
      {
        accessorKey: "note",
        header: "Note",
        size: 150,
      },
      {
        accessorKey: "createdAt",
        header: "createdAt",
        size: 150,
      },
      {
        accessorFn: (row) =>
          `${row?.createdBy?.firstName} ${row?.createdBy?.lastName}`,
        id: "createdBy",
        header: "Created By",
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data,
    initialState: {
      showColumnFilters: false,
      showGlobalFilter: false,
      columnPinning: {
        right: ["mrt-row-actions"],
      },
    },
    enableRowActions: true,
    renderRowActionMenuItems: ({ row }) => [
      <MenuItem
        key={1}
        onClick={() => onDownloadFile(row.original.fileName)}
        sx={{ m: 0 }}
      >
        <ListItemIcon>
          <DownloadIcon />
        </ListItemIcon>
        Download File
      </MenuItem>,
      <MenuItem key={2} onClick={() => onDelete(row.original.id)} sx={{ m: 0 }}>
        <ListItemIcon>
          <DeleteIcon />
        </ListItemIcon>
        Delete File
      </MenuItem>,
    ],
  });

  return <MaterialReactTable table={table} />;
};

export default Table;
