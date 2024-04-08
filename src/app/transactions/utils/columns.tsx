import { UAH } from "@/app/components/shared/currency/UAH";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import Link from "next/link";
import React from "react";
export const columns: GridColDef[] = [
  { field: "col0", headerName: "Date created", width: 200 },
  { field: "col1", headerName: "Payment System", width: 250 },
  { field: "col2", headerName: "Game", width: 250, 
    renderCell: (params: GridRenderCellParams<any, String>) => {
      return <div style={{ whiteSpace: "wrap" }}>{params.value}</div>
    }
  },
  { field: "col3", headerName: "Total price", width: 150, 
    renderCell: (params: GridRenderCellParams<any, String>) => {
    return <div style={{ display: "flex", alignItems: "center" }}><span style={{ marginRight: "3px", marginTop: "1.4px"  }}>{params.value}</span><UAH /></div>
  }

  },

  {
    field: "col4",
    headerName: "Status",
    width: 200,
    renderCell: (params: GridRenderCellParams<any, String>) => {
      if (params.value) {
        return (
          <Link href={`/${params.value}`} style={{ color: "#fff" }}>
            Continue payment
          </Link>
        );
      } else {
        return "Paid";
      }
    },
  },
];
