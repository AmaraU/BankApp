import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth/auth.slice";
import userSlice from "./auth/user.slice";
import documentSlice from "./auth/document.slice";
import transactionsSlice from "./transactions.slice";
import utilsSlice from "./utils.slice";
import billsSlice from "./bills.slice";
import transfersSlice from "./transfer.slice"

export const store = configureStore({
  reducer: {
    auth: authSlice,
    user: userSlice,
    document: documentSlice,
    transactions: transactionsSlice,
    utils: utilsSlice,
    bills: billsSlice,
    transfers: transfersSlice
  },
});
