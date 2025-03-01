import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const now = Math.floor(Date.now() / 1000);

interface VerifyEmailState {
    recoverCooldown: number;
    recoverCooldownExpiry: number;
    infoCooldown: number;
    infoCooldownExpiry: number;
    resendCooldown: number;
    resendCooldownExpiry: number;
    infoChangePasswordCooldown: number;
    infoChangePasswordCooldownExpiry: number;
}

const initialState: VerifyEmailState = {
    recoverCooldown: 0,
    recoverCooldownExpiry: now,
    infoCooldown: 0,
    infoCooldownExpiry: now,
    resendCooldown: 0,
    resendCooldownExpiry: now,
    infoChangePasswordCooldown: 0,
    infoChangePasswordCooldownExpiry: now,
};

const verifyEmailSlice = createSlice({
    name: 'verifyEmail',
    initialState,
    reducers: {
        setCooldown: (state: any, action: PayloadAction<{ key: string; value: number }>) => {
            const now = Math.floor(Date.now() / 1000);
            state[action.payload.key] = action.payload.value;
            state[`${action.payload.key}Expiry`] = now + action.payload.value;
            localStorage.setItem(`${action.payload.key}Expiry`, (now + action.payload.value).toString());
        },
        decrementCooldown: (state: any, action: PayloadAction<string>) => {
            if (state[action.payload] > 0) {
                state[action.payload] -= 1;
            }
        },
        resetCooldown: (state: any, action: PayloadAction<string>) => {
            state[action.payload] = 0;
            state[`${action.payload}Expiry`] = 0;
            localStorage.removeItem(`${action.payload}Expiry`);
        },
    },
});

export const { setCooldown, decrementCooldown, resetCooldown } = verifyEmailSlice.actions;

export default verifyEmailSlice.reducer;
