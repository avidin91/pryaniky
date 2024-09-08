import { configureStore } from '@reduxjs/toolkit';
import mainSlice from "./slices/main.slice";

export const store = configureStore({
	reducer: {
		mainStore: mainSlice,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
