import { AuthState, LoginAuth, RegisAuth } from '@/app/constatnts/types';
import AuthService from '@/app/services/auth.service';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

const AUTH_STATE: AuthState = {
    email: '',
    isAuth: false,
    error: null,
};
export const loginThunk = createAsyncThunk(
    'auth/login',
    async function (data: LoginAuth, { rejectWithValue }) {
        try {
            return await AuthService.login(data);
        } catch {
            return rejectWithValue('Server Error!');
        }
    },
);
export const logoutThunk = createAsyncThunk(
    'auth/logout',
    async function (_, { rejectWithValue }) {
        try {
            return await AuthService.logout();
        } catch {
            return rejectWithValue('Server Error!');
        }
    },
);
export const registrationThunk = createAsyncThunk(
    'auth/registration',
    async function (data: RegisAuth, { rejectWithValue }) {
        try {
            return await AuthService.registration(data);
        } catch (error: any) {
            if (error.response && error.response.data)
                return rejectWithValue({ error: error.response.data });
        }
    },
);

const authSlice = createSlice({
    name: 'auth',
    initialState: AUTH_STATE,
    reducers: {
        setIsLogin: (state, action: PayloadAction<boolean>) => {
            state.isAuth = action.payload
        },
        incrementByAmount: (state, action: PayloadAction<AuthState>) => {
            state.email = action.payload.email;
            state.token = action.payload.token;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(loginThunk.fulfilled, (state, action) => {
                console.log('fulfilled');
                state.isAuth = true;
                state.accessToken = action.payload.accessToken;
                localStorage.setItem('accessToken', action.payload.accessToken);
            })
            .addCase(loginThunk.pending, ()=>{
                console.log('pending');
            })
            .addCase(loginThunk.rejected, (state, action) => {
                console.log('rejected');
                state.isAuth = true;
                if (
                    action.payload &&
                    action.payload.error &&
                    action.payload.error.Message
                ) {
                    state.error = action.payload.error.Message;
                } else {
                    state.error = 'Unknown error occurred';
                }
            })

            .addCase(logoutThunk.fulfilled, (state, action) => {
                state.isAuth = false;
                state.accessToken = undefined;
                localStorage.removeItem('accessToken');
            })
            .addCase(registrationThunk.fulfilled, (state, action) => {
                state.isAuth = true;
                state.accessToken = action.payload.accessToken;
                localStorage.setItem('accessToken', action.payload.accessToken);
                state.userFormId = action.payload.userFormId;
            })
            .addCase(registrationThunk.rejected, (state, action) => {
                if (
                    action.payload &&
                    action.payload.error &&
                    action.payload.error.Message
                ) {
                    state.error = action.payload.error.Message;
                } else {
                    state.error = 'Unknown error occurred';
                }
            });
    },
});

export const { incrementByAmount, setIsLogin } = authSlice.actions;
export default authSlice.reducer;
