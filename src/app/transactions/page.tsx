/* eslint-disable @next/next/no-async-client-component */
"use client";
import { Box, Typography } from "@mui/material";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";

const rows: GridRowsProp = [
  { id: 1, col1: "Hello", col2: "World" },
  { id: 2, col1: "DataGridPro", col2: "is Awesome" },
  { id: 3, col1: "MUI", col2: "is Amazing" },
];

const columns: GridColDef[] = [
  { field: "col1", headerName: "Payment System", width: 150 },
  { field: "col2", headerName: "Game", width: 150 },
  { field: "col3", headerName: "Price", width: 150 },
  { field: "col4", headerName: "Status", width: 150 },
];

// const getData = async () => {

//     let access_token = await getAccessToken();
//     let url = `${process.env.URL}transactions`;
//     let res = await fetch(url, {
//         cache: "no-store",
//         headers: {
//             "Content-Type": "application/json",
//             "Authorization": "Bearer " + access_token
//         }
//     });
//     return res.json();
// }

export default async function Transactions() {
  // let allTransactions : AllTransactionsInfoResponse = await getData();
  const DataGridStyle = {
    color: "#fff",
    borderStyle: "none !important",
  };
  return (
    <main
      style={{
        marginTop: "200px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Box >
      <Typography fontSize={"28px"} fontWeight={"600"}>
          Transactions
        </Typography>
        <Typography fontSize={"20px"} fontWeight={"300"}>
          All Transactions Info
        </Typography>
        <DataGrid sx={DataGridStyle} rows={rows} columns={columns} hideFooter />
      </Box>
    </main>
  );
}
