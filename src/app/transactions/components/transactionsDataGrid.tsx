"use client";
import { SxProps } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";
import { ITransactionsDataGridProps } from "../types/transactions";
import { compareGameTitles } from "../utils/compareGameTitles";
import { columns } from "../utils/columns";

const DataGridStyle: SxProps = {
  color: "#fff",
  borderStyle: "none !important",
};

const TransactionsDataGrid: React.FC<ITransactionsDataGridProps> = ({
  allTransactions,
}) => {
  let rows: any = [];
  allTransactions.forEach((el, i) => {
    rows.push({
      id: i,
      col0: el.createdAt,
      col1: el.paymentMethods,
      col2: compareGameTitles(el.transactionGames),
      col3: el.totalAmount,
      col4: el.redirectUrl,
    });
  });

  return (
    <DataGrid sx={DataGridStyle} rows={rows} columns={columns} hideFooter />
  );
};

export { TransactionsDataGrid };
