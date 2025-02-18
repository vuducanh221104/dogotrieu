import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    resendCooldown: 0,
    recoverCooldown: 0,
};

const verifyEmailSlice = createSlice({
    name: 'verifyEmail',
    initialState,
    reducers: {
        setResendCooldown: (state, action) => {
            state.resendCooldown = action.payload;
        },
        decrementResendCooldown: (state) => {
            if (state.resendCooldown > 0) {
                state.resendCooldown -= 1;
            }
        },
        resetResendCooldown: (state) => {
            state.resendCooldown = 0;
        },
        setRecoverCooldown: (state, action) => {
            state.recoverCooldown = action.payload;
        },
        decrementRecoverCooldown: (state) => {
            if (state.recoverCooldown > 0) {
                state.recoverCooldown -= 1;
            }
        },
        resetRecoverCooldown: (state) => {
            state.recoverCooldown = 0;
        },
    },
});

export const {
    setResendCooldown,
    decrementResendCooldown,
    resetResendCooldown,
    setRecoverCooldown,
    decrementRecoverCooldown,
    resetRecoverCooldown,
} = verifyEmailSlice.actions;
export default verifyEmailSlice.reducer;
