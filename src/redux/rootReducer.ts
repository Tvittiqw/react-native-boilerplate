import {combineReducers} from "redux";
import authReducer from "./auth/authSlice"
import {PayloadAction} from "@reduxjs/toolkit";

const appReducer = combineReducers({
    auth: authReducer
});

export type RootStateType = ReturnType<typeof appReducer>

export const rootReducer = (state: RootStateType, action: PayloadAction) => {
    if (action.type === "logout") {
        return appReducer(undefined, action)
    }
    return appReducer(state, action)
}