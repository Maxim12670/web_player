import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "@entities/user/model/user";

const initialState: IUser = {
  person_id: 0,
  login: "",
  email: "",
  password: "",
  avatar_path: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setInfo: (state, actions: PayloadAction<IUser>) => {
      state.person_id = actions.payload.person_id;
      state.login = actions.payload.login;
      state.email = actions.payload.email;
      state.password = actions.payload.password;
      state.avatar_path = actions.payload.avatar_path ?? "";
    }
  },
});

export const { setInfo } = userSlice.actions;
export default userSlice.reducer;
