import { configureStore } from '@reduxjs/toolkit';
// import userSlice from '@shared/store/user/userSlice';

export const store = configureStore({
	reducer: {
		// userStore: userSlice,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;