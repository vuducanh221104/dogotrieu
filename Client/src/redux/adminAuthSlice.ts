import { createSlice } from '@reduxjs/toolkit';

const adminAuthSlice = createSlice({
    name: 'adminAuth',
    initialState: {
        login: {
            currentAdmin: null,
            isFetching: false,
            error: false,
        },
        logout: {},
    },
    reducers: {
        adminLoginStart: (state) => {
            state.login.isFetching = true;
        },
        adminLoginSuccess: (state, action) => {
            state.login.isFetching = false;
            state.login.currentAdmin = action.payload;
            state.login.error = false;
        },
        adminLoginFailed: (state) => {
            state.login.isFetching = false;
            state.login.error = true;
        },
        adminLogOutStart: (state) => {
            state.login.isFetching = true;
        },
        adminLogOutSuccess: (state) => {
            state.login.isFetching = false;
            state.login.currentAdmin = null;
            state.login.error = false;
        },
        adminLogOutFailed: (state) => {
            state.login.isFetching = false;
            state.login.error = true;
        },
        updateAdminAccessToken: (state: any, action) => {
            if (state.login.currentAdmin) {
                state.login.currentAdmin.accessToken = action.payload;
            }
        },
    },
});

export const {
    adminLoginStart,
    adminLoginSuccess,
    adminLoginFailed,
    adminLogOutStart,
    adminLogOutSuccess,
    adminLogOutFailed,
    updateAdminAccessToken,
} = adminAuthSlice.actions;

export default adminAuthSlice.reducer;
