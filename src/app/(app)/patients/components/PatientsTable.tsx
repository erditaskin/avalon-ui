"use client";
import * as React from "react";
import {
  MRT_ColumnDef,
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { IPatient } from "@/interfaces";
import { AccountCircle, Send } from "@mui/icons-material";
import { MenuItem, ListItemIcon } from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

interface IProps {
  data: IPatient[];
  onEdit: (id: number) => void;
  onBrowseFiles: (id: number) => void;
  onBrowseAppoinments: (id: number) => void;
  onDelete: (id: number) => void;
}

const Table = (props: IProps) => {
  const { data, onEdit, onBrowseFiles, onDelete, onBrowseAppoinments } = props;
  const columns = React.useMemo<MRT_ColumnDef<IPatient>[]>(
    () => [
      {
        accessorKey: "firstName",
        header: "First Name",
        size: 150,
      },
      {
        accessorKey: "lastName",
        header: "Last Name",
        size: 150,
      },
      {
        accessorKey: "phone",
        header: "Phone",
        size: 200,
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
        key={0}
        onClick={() => onBrowseFiles(row.original.id)}
        sx={{ m: 0 }}
      >
        <ListItemIcon>
          <AttachFileIcon />
        </ListItemIcon>
        Browse / Upload Files
      </MenuItem>,
      <MenuItem
        key={1}
        onClick={() => onBrowseAppoinments(row.original.id)}
        sx={{ m: 0 }}
      >
        <ListItemIcon>
          <CalendarMonthIcon />
        </ListItemIcon>
        Browse Appoinments
      </MenuItem>,
      <MenuItem key={2} onClick={() => onEdit(row.original.id)} sx={{ m: 0 }}>
        <ListItemIcon>
          <EditIcon />
        </ListItemIcon>
        Update Patient Info
      </MenuItem>,
      <MenuItem key={3} onClick={() => onDelete(row.original.id)} sx={{ m: 0 }}>
        <ListItemIcon>
          <DeleteIcon />
        </ListItemIcon>
        Delete Patient
      </MenuItem>,
    ],
  });

  return <MaterialReactTable table={table} />;
};

export default Table;
