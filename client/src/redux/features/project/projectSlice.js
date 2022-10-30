import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API_URL = `${BACKEND_URL}/project/`;

const initialState = {
    project: null,
    projects: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};

export const createProject = createAsyncThunk(
    "project/createProject",
    async (data, { rejectWithValue }) => {
        try {
            const response = await axios.post(API_URL, data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const getProjects = createAsyncThunk(
    "project/getProjects",
    async (data, { rejectWithValue }) => {
       
        try {
            const response = await axios.get(API_URL);
            console.log("getProjects response.data: ", response.message);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const getProject = createAsyncThunk(
    "project/getProject",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${API_URL}${id}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const getProjectsNames= createAsyncThunk(
    "project/getProjectsNames",
    async (data, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${API_URL}getSpecific/projectNames`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const getProjectsByCustomer = createAsyncThunk(
    "project/getProjectsByCustomer",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${API_URL}getSpecific/customer/${id}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const updateProject = createAsyncThunk(
    "project/updateProject",
    async (data, { rejectWithValue }) => {
        try {
            const response = await axios.put(`${API_URL}${data.id}`, data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const deleteProject = createAsyncThunk(
    "project/deleteProject",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.delete(`${API_URL}${id}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const projectSlice = createSlice({
    name: "project",
    initialState,
    reducers: {
        resetProjectState: (state) => {
            state.isError = false;
            state.isSuccess = false;
            state.isLoading = false;
            state.message = "";
        }
    },
    extraReducers: {
        [createProject.pending]: (state) => {
            state.isLoading = true;
        },
        [createProject.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.message = action.payload.message;
            toast.success(state.message);
        },
        [createProject.rejected]: (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload.message;
            toast.error(state.message);
        },
        [getProjects.pending]: (state) => {
            state.isLoading = true;
        },
        [getProjects.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.projects = action.payload;
            state.message = action.payload.message;
        },
        [getProjects.rejected]: (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload.message;
            toast.error(state.message);
        },
        [getProject.pending]: (state) => {
            state.isLoading = true;
        },
        [getProject.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.project = action.payload;
        },
        [getProject.rejected]: (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload.message;
            toast.error(state.message);
        },
        [getProjectsNames.pending]: (state) => {
            state.isLoading = true;
        },
        [getProjectsNames.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.projects = action.payload;
        },
        [getProjectsNames.rejected]: (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload.message;
            toast.error(state.message);
        },
        [getProjectsByCustomer.pending]: (state) => {
            state.isLoading = true;
        },
        [getProjectsByCustomer.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.projects = action.payload;
        },
        [getProjectsByCustomer.rejected]: (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload.message;
            toast.error(state.message);
        },
        [updateProject.pending]: (state) => {
            state.isLoading = true;
        },
        [updateProject.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.message = action.payload.message;
            toast.success(state.message);
        },
        [updateProject.rejected]: (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload.message;
            toast.error(state.message);
        },
        [deleteProject.pending]: (state) => {
            state.isLoading = true;
        },
        [deleteProject.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.message = action.payload.message;
            toast.success(state.message);
        },
        [deleteProject.rejected]: (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload.message;
            toast.error(state.message);
        },
    },
});

export const { resetProjectState } = projectSlice.actions;



export default projectSlice.reducer;


   







