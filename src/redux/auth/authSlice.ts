import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {UserInfoType} from "../../types/userTypes";
import {LoginFormValuesType, SignUpFormValuesType} from "../../types/formsTypes";
import {authApi} from "../../api/fakeApi";

interface InitialAuthStateType {
    userInfo: UserInfoType | null
    isAuth: boolean
    isLoading: boolean
}

const initialState: InitialAuthStateType = {
    userInfo: null,
    isAuth: true,
    isLoading: false,
}

export const fetchLoginForm = createAsyncThunk<string | undefined, LoginFormValuesType>(
    "auth/login",
    async (loginFormData, thunkApi ) => {
        try {
            const data = await authApi.login(loginFormData);
            return data;
        } catch (err) {
            return thunkApi.rejectWithValue(err)
        }
    })

export const fetchSignUpForm = createAsyncThunk<string | undefined, SignUpFormValuesType>(
    "auth/login",
    async (signupFormData, thunkApi ) => {
        try {
            const data = await authApi.signUp(signupFormData);
            return data;
        } catch (err) {
            return thunkApi.rejectWithValue(err)
        }
    })

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
    },
    extraReducers: {
        [fetchLoginForm.pending.type]: (state) => {
            state.isLoading = true
        },
        [fetchLoginForm.fulfilled.type]: (state, { payload }: PayloadAction<string>) => {
            state.userInfo = { email: payload, accessToken: payload };
            state.isAuth = true;
            state.isLoading = false;
        },
        [fetchLoginForm.rejected.type]: (state) => {
            state.isLoading = false;
            state.isAuth = false;
        },
        [fetchSignUpForm.pending.type]: (state) => {
            state.isLoading = true
        },
        [fetchSignUpForm.fulfilled.type]: (state, { payload }: PayloadAction<string>) => {
            state.userInfo = { email: payload, accessToken: payload };
            state.isAuth = true;
            state.isLoading = false;
        },
        [fetchSignUpForm.rejected.type]: (state) => {
            state.isLoading = false;
            state.isAuth = false;
        }
    }
})

export default authSlice.reducer;