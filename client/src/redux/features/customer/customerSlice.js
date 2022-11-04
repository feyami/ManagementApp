import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API_URL = `${BACKEND_URL}/customer/`;

const initialState = {
    customer: null,
    customers: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};

export const createCustomer = createAsyncThunk(
    "customer/createCustomer",
    async (data, { rejectWithValue }) => {
        try {
            const response = await axios.post(API_URL, data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const getCustomers = createAsyncThunk(
    "customer/getCustomers",
    async (data, { rejectWithValue }) => {
        try {
            const response = await axios.get(API_URL);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const getCustomer = createAsyncThunk(
    "customer/getCustomer",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${API_URL}${id}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const getCustomersCompanyNames= createAsyncThunk(
    "customer/getCustomersCompanyNames",
    async (data, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${API_URL}getSpecific/companyNames`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const updateCustomer = createAsyncThunk(
    "customer/updateCustomer",
    async (data, { rejectWithValue }) => {
        try {
            const response = await axios.put(`${API_URL}${data.id}`, data.values);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const deleteCustomer = createAsyncThunk(
    "customer/deleteCustomer",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.delete(`${API_URL}${id}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const deleteCustomersByIds = createAsyncThunk(
    "customer/deleteCustomersByIds",
    async (ids, { rejectWithValue }) => {
        try {
            
            const response = await axios.delete(API_URL, { data: {ids}});
            return response.data;
             
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const customerSlice = createSlice({
    name: "customer",
    initialState,
    reducers: {
        resetCustomer: (state) => {
            state.customer = null;
            state.isError = false;
            state.isSuccess = false;
            state.isLoading = false;
            state.message = "";
        }
    },
    extraReducers: {
        [createCustomer.pending]: (state) => {
            state.isLoading = true;
        },
        [createCustomer.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.message = action.payload.message;
            toast.success("Customer created successfully");
        },
        [createCustomer.rejected]: (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload.message;
            toast.error("Customer creation failed");
        },
        [getCustomers.pending]: (state) => {
            state.isLoading = true;
        },
        [getCustomers.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.customers = action.payload;
            state.message = action.payload.message;
        },
        [getCustomers.rejected]: (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload.message;
        },
        [getCustomer.pending]: (state) => {
            state.isLoading = true;
        },
        [getCustomer.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.customer = action.payload;
            state.message = action.payload.message;
        },
        [getCustomer.rejected]: (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload.message;
        },
        [getCustomersCompanyNames.pending]: (state) => {
            state.isLoading = true;
        },
        [getCustomersCompanyNames.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.customers = action.payload;
            state.message = action.payload.message;
            
        },
        [getCustomersCompanyNames.rejected]: (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload.message;
        },
        [updateCustomer.pending]: (state) => {
            state.isLoading = true;
            toast.info("Updating customer...");
        },
        [updateCustomer.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.customer = action.payload;
            state.message = action.payload.message;
            toast.success("Customer updated successfully");
        },
        [updateCustomer.rejected]: (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload.message;
            toast.error("Customer update failed");
        },
        [deleteCustomer.pending]: (state) => {
            state.isLoading = true;
        },
        [deleteCustomer.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.message = action.payload.message;
            toast.success("Customer deleted successfully");
        },
        [deleteCustomer.rejected]: (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload.message;
            toast.error("Customer deletion failed");
        },
        [deleteCustomersByIds.pending]: (state) => {
            state.isLoading = true;
        },
        [deleteCustomersByIds.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.message = action.payload.message;
            toast.success("Customers deleted successfully");
        },
        [deleteCustomersByIds.rejected]: (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload.message;
            toast.error("Customers deletion failed");
        },
    },
});

export const { resetCustomer } = customerSlice.actions;



export default customerSlice.reducer;
 




 

 







