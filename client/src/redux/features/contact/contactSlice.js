import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API_URL = `${BACKEND_URL}/contact/`;

const initialState = {
  contact: null,
  contacts: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "", 
};

export const createContact = createAsyncThunk(
  "contact/createContact",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(API_URL, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getContacts = createAsyncThunk(
  "contact/getContacts",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getContact = createAsyncThunk(
  "contact/getContact",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateContact = createAsyncThunk(
  "contact/updateContact",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_URL}${data.id}`, data.values);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteContact = createAsyncThunk(
  "contact/deleteContact",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${API_URL}${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteContactsByIds = createAsyncThunk(
  "contact/deleteContactsByIds",
  async (ids, { rejectWithValue }) => {
    try {
      const response = await axios.delete(API_URL, { data: { ids } });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    resetContact: (state) => {
      state.contact = null;
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = "";
    }
  },
  extraReducers: {
    [createContact.pending]: (state) => {
      state.isLoading = true;
    },
    [createContact.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.message = action.payload.message;
      toast.success("New Contact Added Successfully");
      
    },
    [createContact.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload.message;
      toast.error("Error Adding New Contact");
    },
    [getContacts.pending]: (state) => {
      state.isLoading = true;
    },
    [getContacts.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      
      state.contacts = action.payload;
    },
    [getContacts.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload.message;
     
    },
    [getContact.pending]: (state) => {
      state.isLoading = true;
    },
    [getContact.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.contact = action.payload.contact;
    },
    [getContact.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload.message;
      
    },
    [updateContact.pending]: (state) => {
      state.isLoading = true;
      toast.info("Updating Contact...");
    },
    [updateContact.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.message = action.payload.message;
      toast.success("Contact Updated Successfully");
       
    },
    [updateContact.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload.message;
      toast.error("Error Updating Contact");
    },
    [deleteContact.pending]: (state) => {
      state.isLoading = true;
    },
    [deleteContact.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.message = action.payload.message;
       
    },
    [deleteContact.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload.message;
       
    },
  },
});

 
export const { resetContact } = contactSlice.actions;

export default contactSlice.reducer;




















