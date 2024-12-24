import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITrack } from "@entities/track/model/track";

const initialState: ITrack = {
  track_id: 0,
  name: "",
  author: null,
  genre: null,
  duration: "",
  logo_path: null,
  track_path: "",
  isActive: false,
};

export const currentTrackSlice = createSlice({
  name: "currentTrack",
  initialState,
  reducers: {
    selectedTrack: (state, actions: PayloadAction<ITrack>) => {
      state.track_id = actions.payload.track_id;
      state.name = actions.payload.name;
      state.author = actions.payload.author;
      state.genre = actions.payload.genre;
      state.duration = actions.payload.duration;
      state.logo_path = actions.payload.logo_path;
      state.track_path = actions.payload.track_path;
      state.isActive = true;
    },
    toggleStart: (state) => {
      
      state.isActive = !state.isActive;
      console.log("togglestart", state.isActive)
    },
  },
});

export const { selectedTrack, toggleStart } = currentTrackSlice.actions;
export default currentTrackSlice.reducer;
