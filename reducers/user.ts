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
    editUsername: (state, action: PayloadAction<string>) => {
      state.value.username = action.payload;
    },
    editAvatar: (state, action: PayloadAction<string>) => {
      state.value.avatar = action.payload;
    },
    editDescription: (state, action: PayloadAction<string>) => {
      state.value.description = action.payload;
    },
    logOutUser: (state) => {
      state.value = {
        username: "",
        token: "",
        friendList: [],
        avatar: "",
        description: "",
        team: "",
      };
    },
    addFriendtoFriendList: (state, action: PayloadAction<string>) => {
      if (!state.value.friendList.includes(action.payload)) {
        state.value.friendList.push(action.payload);
      } else {
        state.value.friendList = state.value.friendList.filter(
          (elem) => elem !== action.payload
        );
      }
    },
  },
});

export const {
  addUser,
  editAvatar,
  editDescription,
  editUsername,
  logOutUser,
  addFriendtoFriendList,
} = userSlice.actions;
export default userSlice.reducer;
