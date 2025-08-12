import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type SearchState = {
  value: {
    username: string;
  };
};

const initialState: SearchState = {
  value: {
    username: "",
  },
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    newSearch: (state, action: PayloadAction<string>) => {
      state.value.username = action.payload;
    },
  },
});

export const { newSearch } = searchSlice.actions;
export default searchSlice.reducer;
