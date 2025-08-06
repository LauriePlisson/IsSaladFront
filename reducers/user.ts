import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type UserState = {
  value: {
    username: string;
    token: string;
    friendList: string[];
    avatar: string;
    description: string;
    team: string;
  };
};

const initialState: UserState = {
  value: {
    username: "",
    token: "",
    friendList: [],
    avatar: "",
    description: "",
    team: "",
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state: UserState, action: PayloadAction<UserState["value"]>) => {
      state.value = action.payload;
    },
  },
});

export const { addUser } = userSlice.actions;
export default userSlice.reducer;
