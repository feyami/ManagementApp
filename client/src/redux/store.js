import { configureStore } from "@reduxjs/toolkit";
import themeSlice from "./features/theme/themeSlice";
import counterReducer from "./features/counter";
import authReducer from "../redux/features/auth/authSlice";
import userReducer from "./features/user/userSlice";
import contactReducer from "./features/contact/contactSlice";
import customerReducer from "./features/customer/customerSlice";
import projectReducer from "./features/project/projectSlice";
import globalValues from "./features/globalValues";
import chatSlicer from "./features/chat/chatSlice";
import messageSlicer from "./features/chat/messageSlice";

export const store = configureStore({
    reducer: {
        theme: themeSlice,
        counter: counterReducer,
        auth: authReducer,
        user: userReducer,
        contact: contactReducer,
        customer: customerReducer,
        project: projectReducer,
        globalValues: globalValues,
        chat: chatSlicer,
        message: messageSlicer,

    }
});