import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userService from "../../services/userService";

export const getDashboardSummary = createAsyncThunk(
  "user/getDashboardSummary",
  async () => {
    try {
      const response = await userService.dashboardSummary();
      return response;
    } catch (error) {
      console.log(error)
      throw error;
    }
  }
);

export const getAccountBalance = createAsyncThunk(
  "user/getAccountBalance",
  async () => {
    try {
      const response = await userService.accountBalance();
      return response;
    } catch (error) {
      console.log(error)
      throw error;
    }
  }
);

export const getCustomerDetails = createAsyncThunk(
  "user/getCustomerDetails",
  async () => {
    try {
      const response = await userService.getCustomerDetails();
      return response;
    } catch (error) {
      console.log(error)
      throw error;
    }
  }
);

export const getContactDetails = createAsyncThunk(
  "user/getContactDetails",
  async () => {
    try {
      const response = await userService.getContactDetails();
      return response;
    } catch (error) {
      console.log(error)
      throw error;
    }
  }
);

export const getSetupStatus = createAsyncThunk(
  "user/getSetupStatus",
  async () => {
    try {
      const response = await userService.getSetupStatus();
      return response;
    } catch (error) {
      console.log(error)
      throw error;
    }
  }
);

export const getBvnInfo = createAsyncThunk("user/getBvnInfo", async () => {
  try {
    const response = await userService.getBvnInfo();
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
});

const saveToSessionStorage = (data) => {
  const existingData = sessionStorage.getItem("user");
  const parsedData = existingData ? JSON.parse(existingData) : {};
  const updatedData = { ...parsedData, ...data };
  sessionStorage.setItem("user", JSON.stringify(updatedData));
};

const loadFromSessionStorage = () => {
  const data = sessionStorage.getItem("user");
  return data ? JSON.parse(data) : null;
};

const initialState = {
  ...loadFromSessionStorage(),
  customerDetails: {},
  contactDetails: {},
  setupStatus: {
    emailAddressVerification: true,
    secretQuestion: true,
    transactionPIN: true,
    profile: {},
    identity: {
      bvn: true,
      nin: true,
      governmentIDCard: true,
      signature: true,
      proofOfAddress: true,
    }


  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserDetails: (_, action) => {
      saveToSessionStorage(action.payload.data);
      sessionStorage.setItem("authToken", action.payload.token.accessToken);
    },
    resetUserDetails: () => {
      sessionStorage.removeItem("user");
      sessionStorage.removeItem("authToken");
    },
    loadUserDetailsFromStorage: (state) => {
      const data = loadFromSessionStorage();
      if (data) {
        state.phoneNumber = data.phoneNumber;
        state.email = data.email;
        state.bvn = data.bvn;
        state.nin = data.nin;
        state.otpCode = data.otpCode;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDashboardSummary.pending, (state) => {
        state.loading = true;
      })
      .addCase(getDashboardSummary.fulfilled, (state, action) => {
        state.loading = false;
        state.value = action.payload;
        saveToSessionStorage(action.payload.result.data);
      })
      .addCase(getDashboardSummary.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getAccountBalance.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAccountBalance.fulfilled, (state, action) => {
        state.loading = false;
        state.accountBalance = action.payload.result.accountInfo;
      })
      .addCase(getAccountBalance.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getSetupStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSetupStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.setupStatus = action.payload.result.data;
      })
      .addCase(getSetupStatus.rejected, (state) => {
        state.loading = false;
      })

      .addCase(getCustomerDetails.pending, (state) => {
        state.loading = true;
        state.customerDetails = {};
      })
      .addCase(getCustomerDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.customerDetails = action.payload.result.data[0];
        console.log(state.customerDetails);
      })
      .addCase(getCustomerDetails.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getContactDetails.pending, (state) => {
        state.loading = true;
        state.contactDetails = {};
      })
      .addCase(getContactDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.contactDetails = action.payload.result.data[0];
        console.log(state.contactDetails);
      })
      .addCase(getContactDetails.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getBvnInfo.pending, (state) => {
        state.loading = true;
        state.contactDetails = {};
      })
      .addCase(getBvnInfo.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload.result);
        state.userBVN = action.payload.result.data[0];
        console.log(state.contactDetails);
      })
      .addCase(getBvnInfo.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setUserDetails, resetUserDetails, loadUserDetailsFromStorage } =
  userSlice.actions;

export default userSlice.reducer;
