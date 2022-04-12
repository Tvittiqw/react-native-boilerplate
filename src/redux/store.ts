import {configureStore} from "@reduxjs/toolkit";

const store = configureStore({
    reducer: () => {}
})

export default store;

export type RootStateType = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;