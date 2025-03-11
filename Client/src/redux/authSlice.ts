import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        login: {
            currentUser: null,
            isFetching: false,
            error: false,
        },
        logout: {},
    },
    reducers: {
        changeUser: (state, action) => {
            state.login.currentUser = action.payload;
        },
        loginStart: (state) => {
            state.login.isFetching = true;
        },
        loginSuccess: (state, action) => {
            state.login.isFetching = false;
            state.login.currentUser = action.payload;
            state.login.error = false;
        },
        loginFailed: (state) => {
            state.login.isFetching = false;
            state.login.error = true;
        },
        logOutStart: (state) => {
            state.login.isFetching = true;
        },
        logOutSuccess: (state) => {
            state.login.isFetching = false;
            state.login.currentUser = null;
            state.login.error = false;
        },
        logOutFailed: (state) => {
            state.login.isFetching = false;
            state.login.error = true;
        },
        updatePhoneNumber: (state: any, action) => {
            if (state.login.currentUser) {
                state.login.currentUser.phone_number = action.payload;
            }
        },
        updateFullName: (state: any, action) => {
            if (state.login.currentUser) {
                state.login.currentUser.full_name = action.payload;
            }
        },
        updateIsVerified: (state: any, action) => {
            if (state.login.currentUser) {
                state.login.currentUser.is_verified = action.payload;
            }
        },
        updateAccessToken: (state: any, action) => {
            if (state.login.currentUser) {
                state.login.currentUser.accessToken = action.payload;
            }
        },
    },
});

export const {
    changeUser,
    loginStart,
    loginSuccess,
    loginFailed,
    logOutStart,
    logOutSuccess,
    logOutFailed,
    updatePhoneNumber,
    updateFullName,
    updateIsVerified,
    updateAccessToken,
} = authSlice.actions;

export default authSlice.reducer;
