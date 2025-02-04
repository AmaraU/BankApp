import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import utilsService from "../services/utilsService";

export const getNationalities = createAsyncThunk(
  "utils/getNationalities",
  async () => {
    try {
      const response = await utilsService.getNationaties();
      return response;
    } catch (error) {
      console.log(error)
      throw error;
    }
  }
);

export const getSourceOfFunds = createAsyncThunk(
  "utils/getSourceOfFunds",
  async () => {
    try {
      const response = await utilsService.getSourceOfFunds();
      return response;
    } catch (error) {
      console.log(error)
      throw error;
    }
  }
);

export const getSecurityQuestions = createAsyncThunk(
  "utils/getSecurityQuestions",
  async () => {
    try {
      const response = await utilsService.getSecurityQuestion();
      return response;
    } catch (error) {
      console.log(error)
      throw error;
    }
  }
);

const initialState = {
  loading: false,
  nationalities: [],
  sourceOfFunds: [],
  securityQuestions: [],
};

const utilsSlice = createSlice({
  name: "utils",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getNationalities.pending, (state) => {
        state.loading = true;
      })
      .addCase(getNationalities.fulfilled, (state, action) => {
        state.loading = false;
        state.nationalities = action.payload.result.data;
      })
      .addCase(getNationalities.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getSourceOfFunds.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSourceOfFunds.fulfilled, (state, action) => {
        state.loading = false;
        state.sourceOfFunds = action.payload.result.data;
      })
      .addCase(getSourceOfFunds.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getSecurityQuestions.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSecurityQuestions.fulfilled, (state, action) => {
        state.loading = false;
        state.securityQuestions = action.payload.result.data;
      })
      .addCase(getSecurityQuestions.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default utilsSlice.reducer;
