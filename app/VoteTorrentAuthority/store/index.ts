import { configureStore } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { authorityApi } from './api/authorityApi';

const dummyReducer = createSlice({
  name: 'dummy',
  initialState: {
    value: 0,
  },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
  },
});

export const { increment, decrement } = dummyReducer.actions;


export const store = configureStore({
  reducer: {
    dummy: dummyReducer.reducer,
    [authorityApi.reducerPath]: authorityApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authorityApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 