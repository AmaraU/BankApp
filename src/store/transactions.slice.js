import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { handleErrors } from "../utils/handleResponse";
import transactionService from "../services/transactionService";

export const getTransactionHistory = createAsyncThunk(
  "transactions/getTransactionHistory",
  async (number) => {
    try {
      const response = await transactionService.transactionHistory(number);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

export const getBanks = createAsyncThunk("transactions/getBanks", async () => {
  try {
    const response = await transactionService.banks();
    return response;
  } catch (error) {
    handleErrors(error);
    throw error;
  }
});

export const getDefaultTransactionLimit = createAsyncThunk(
  "transactions/getDefaultTransactionLimit",
  async () => {
    try {
      const response = await transactionService.getDefaultTransactionLimit();
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

export const getTransactionLimit = createAsyncThunk(
  "transactions/getTransactionLimit",
  async () => {
    try {
      const response = await transactionService.getTransactionLimit();
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

const initialState = {
  transactions: [],
  defaultLimits: [],
  limit: [],
  bankloading: false,
  loading: false,
};

const transactionSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTransactionHistory.pending, (state) => {
        state.loading = true;
        state.transactions = [];
      })
      .addCase(getTransactionHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions = action.payload.result.data;
      })
      .addCase(getTransactionHistory.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getBanks.pending, (state) => {
        state.bankloading = true;
        state.banks = [];
      })
      .addCase(getBanks.fulfilled, (state, action) => {
        state.bankloading = false;
        state.banks = action.payload.data;
      })
      .addCase(getBanks.rejected, (state) => {
        state.bankloading = false;
      })
      .addCase(getDefaultTransactionLimit.pending, (state) => {
        state.loading = true;
        state.defaultLimits = [];
      })
      .addCase(getDefaultTransactionLimit.fulfilled, (state, action) => {
        state.loading = false;
        state.defaultLimits = action.payload.result.data;
      })
      .addCase(getDefaultTransactionLimit.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getTransactionLimit.pending, (state) => {
        state.loading = true;
        state.limit = [];
      })
      .addCase(getTransactionLimit.fulfilled, (state, action) => {
        state.loading = false;
        console.log("limitss", action.payload);
        state.limit = action.payload.result.data;
      })
      .addCase(getTransactionLimit.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default transactionSlice.reducer;
