import { configureStore } from '@reduxjs/toolkit';
import authorityReducer from './slices/authoritySlice';

export const store = configureStore({
	reducer: {
		authority: authorityReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 