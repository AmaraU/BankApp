import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import transferService from "../services/transferService";

export const getBeneficiaries = createAsyncThunk(
  "transfers/getBeneficiaries",
  async () => {
    try {
      const response = await transferService.getBeneficiaries();
      return response;
    } catch (error) {
      console.log(error)
    }
  }
);

const initialState = {
  beneficiaries: [],
};

const transfersSlice = createSlice({
  name: "transfers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBeneficiaries.pending, (state) => {
        state.loading = true;
        state.beneficiaries = [];
      })
      .addCase(getBeneficiaries.fulfilled, (state, action) => {
        state.loading = false;
        state.beneficiaries = action.payload.result.data;
      })
      .addCase(getBeneficiaries.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default transfersSlice.reducer;
