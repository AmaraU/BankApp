import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { handleErrors } from "../../utils/handleResponse";
import utilsService from "../../services/utilsService";

export const getDocumentTypes = createAsyncThunk(
  "document/getDocumentTypes",
  async () => {
    try {
      const response = await utilsService.getDocumentTypes();
      return response;
    } catch (error) {
      console.log(error)
      throw error;
    }
  }
);

const saveToSessionStorage = (data) => {
  sessionStorage.setItem("document", JSON.stringify(data));
};

const loadFromSessionStorage = () => {
  const data = sessionStorage.getItem("document");
  return data ? JSON.parse(data) : null;
};

const initialState = { ...loadFromSessionStorage(), documentTypes: [] };

const documentSlice = createSlice({
  name: "document",
  initialState,
  reducers: {
    setDocumentDetails: (_, action) => {
      saveToSessionStorage(action.payload.customerDocumentUpload);
    },
    resetDocumentDetails: () => {
      sessionStorage.removeItem("document");
    },
    loadDocumentDetailsFromStorage: (state) => {
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
      .addCase(getDocumentTypes.pending, (state) => {
        state.loading = true;
      })
      .addCase(getDocumentTypes.fulfilled, (state, action) => {
        state.loading = false;
        state.documentTypes = action.payload.result.data;
      })
      .addCase(getDocumentTypes.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const {
  setDocumentDetails,
  resetDocumentDetails,
  loadDocumentDetailsFromStorage,
} = documentSlice.actions;

export default documentSlice.reducer;
