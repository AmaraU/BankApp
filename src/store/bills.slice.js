import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { handleErrors } from "../utils/handleResponse";
import billsService from "../services/billsService";

export const getNetworkPlans = createAsyncThunk(
  "bills/getNetworkPlans",
  async () => {
    try {
      const response = await billsService.getNetworkPlans();
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

export const getBillerGroup = createAsyncThunk(
  "bills/getBillerGroup",
  async () => {
    try {
      const response = await billsService.getBillerGroup();
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

export const getBillerGroupProvider = createAsyncThunk(
  "bills/getBillerGroupProvider",
  async (id) => {
    try {
      const response = await billsService.getBillerGroupProvider(id);
      return response;
    } catch (error) {
      handleErrors(error);
      throw error;
    }
  }
);

export const getBillerGroupPackage = createAsyncThunk(
  "bills/getBillerGroupPackage",
  async (slug) => {
    try {
      const response = await billsService.getBillerGroupPackage(slug);
      return response;
    } catch (error) {
      handleErrors(error);
      throw error;
    }
  }
);

const initialState = {
  networks: [],
  bills: [],
  providers: [],
  packages: [],
};

const billsSlice = createSlice({
  name: "bills",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getNetworkPlans.pending, (state) => {
        state.loading = true;
        state.networks = [];
      })
      .addCase(getNetworkPlans.fulfilled, (state, action) => {
        state.loading = false;
        state.networks =
          action.payload.result.data.responseEntity.body.subscribedServices;
      })
      .addCase(getNetworkPlans.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getBillerGroup.pending, (state) => {
        state.loading = true;
      })
      .addCase(getBillerGroup.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload.data.responseData);
        state.bills = action.payload.data.responseData;
      })
      .addCase(getBillerGroup.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getBillerGroupProvider.pending, (state) => {
        state.loading = true;
      })
      .addCase(getBillerGroupProvider.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload.data.responseData);
        state.providers = action.payload.data.responseData;
      })
      .addCase(getBillerGroupProvider.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getBillerGroupPackage.pending, (state) => {
        state.loading = true;
      })
      .addCase(getBillerGroupPackage.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload.data.responseData);
        state.packages = action.payload.data.responseData;
      })
      .addCase(getBillerGroupPackage.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default billsSlice.reducer;
