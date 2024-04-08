import { components } from "@/app/types/shema";
import { AllTransactionsInfoResponse } from "@/app/types/types";
export interface ITransactionsDataGridProps {
    allTransactions: AllTransactionsInfoResponse;
  }
export type TransactionGames = AllTransactionsInfoResponse[0]["transactionGames"];
export type TransactionGamesDTO = components["schemas"]["TransactionGamesDTO"];

