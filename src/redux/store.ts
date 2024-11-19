import { configureStore } from "@reduxjs/toolkit";
import messengerReducer from "./messengerSlice";

export const store = configureStore({
    reducer: {
        messenger: messengerReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;