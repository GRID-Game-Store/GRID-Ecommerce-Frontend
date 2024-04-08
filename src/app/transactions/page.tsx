

import { Box, Typography } from "@mui/material";
import { getAccessToken } from "../utils/sessionTokenAccessor";
import { AllTransactionsInfoResponse } from "../types/types";
import { TransactionsDataGrid } from "./components/transactionsDataGrid";

const getData = async () => {

    let access_token = await getAccessToken();
    let url = `${process.env.URL}transactions`;
    let res = await fetch(url, {
        cache: "no-store",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + access_token
        }
    });
    return res.json();
}

export default async function Transactions() {
  let allTransactions : AllTransactionsInfoResponse = await getData();

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
      <Box>
        <Typography fontSize={"28px"} fontWeight={"600"}>
          Transactions
        </Typography>
        <Typography fontSize={"20px"} fontWeight={"300"}>
          All Transactions Info
        </Typography>
        <TransactionsDataGrid allTransactions={allTransactions} />
      </Box>
    </main>
  );
}
