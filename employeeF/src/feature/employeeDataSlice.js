import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Post method
export const postData = createAsyncThunk("postData", async (data) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_BASE_API}employee`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
});

// Get Method
export const fetchData = createAsyncThunk("data", async () => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_BASE_API}employee`);
    return response.data;
  } catch (error) {
    throw error;
  }
});

//edit Method
export const EditData = createAsyncThunk(
  "editData",
  async ({ _id, ...data }) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_BASE_API}employee/${_id}`,
        data
      );
      console.log("Edit response: ", response);
      return response.data;
    } catch (error) {
      console.error("Edit error: ", error);
      throw error;
    }
  }
);

//delete  method
export const deleteData = createAsyncThunk("deleteData", async (dataId) => {
  try {
    const response = await axios.delete(
        `${process.env.REACT_APP_BASE_API}employee/${dataId}`
    );
   return response.data;
  } catch (error) {
    throw error;
  }
});

//get Single by id
export const getData = createAsyncThunk("getData", async (dataId) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_API}employee/${dataId}`
    );
    console.log("get Single: ", response);
    return response.data;
  } catch (error) {
    throw error;
  }
});

const employeeSlice = createSlice({
  name: "EmployeeData",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      // For Create
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // For Edit
      .addCase(getData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      //For Delete
      .addCase(deleteData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(deleteData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default employeeSlice.reducer;
