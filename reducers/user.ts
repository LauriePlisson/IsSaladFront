import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type FriendListState = {
  _id: string;
  username: string;
  avatar: string;
  team: string;
  description: string;
};

export type UserState = {
  value: {
    username: string;
    token: string;
    friendList: FriendListState[];
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
    // Action to set the complete user state with authentication data
    addUser: (state, action: PayloadAction<UserState["value"]>) => {
      state.value = action.payload;
    },
    // Action to update the user's username
    editUsername: (state, action: PayloadAction<string>) => {
      state.value.username = action.payload;
    },
    // Action to update the user's avatar URL
    editAvatar: (state, action: PayloadAction<string>) => {
      state.value.avatar = action.payload;
    },
    // Action to update the user's description/bio
    editDescription: (state, action: PayloadAction<string>) => {
      state.value.description = action.payload;
    },
    // Action to clear user data on logout
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
    // Action to add or remove a friend from the user's friend list
    addFriendtoFriendList: (state, action: PayloadAction<FriendListState>) => {
      if (
        !state.value.friendList.some(
          (e) => e.username === action.payload.username
        )
      ) {
        state.value.friendList.push(action.payload);
      } else {
        state.value.friendList = state.value.friendList.filter(
          (elem) => elem.username !== action.payload.username
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
