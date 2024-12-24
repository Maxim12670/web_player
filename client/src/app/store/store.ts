import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./storeSlices/userSlice";
import currentTrackSlice from "./storeSlices/currentTrackSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    currentTrack: currentTrackSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
