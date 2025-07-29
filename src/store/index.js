import { configureStore } from "@reduxjs/toolkit";
import movieReducer from '../slice/movieSlice';

export const store = configureStore({
    reducer: {
        movies: movieReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST'],
            },
        }),
})