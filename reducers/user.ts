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
    addFriendtoFriendList: (state, action: PayloadAction<FriendListState>) => {
      if (
        !state.value.friendList.some(
          (e) => e.username === action.payload.username
        )
      ) {
        console.log("coucou");
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
