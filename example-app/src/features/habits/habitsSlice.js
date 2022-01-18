import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// save our base URL
const baseUrl = "http://localhost:4000/habits";

export const fetchHabits = createAsyncThunk("habits/fetchHabits", () => {
  // return a Promise containing the data we want
  return fetch(baseUrl).then((response) => response.json());
});

const habitsSlice = createSlice({
  name: "habits",
  initialState: {
    entities: [], // array of habits
    status: "idle", // loading state
  },
  reducers: {
    // add your reducers here
  },
  extraReducers: {
    // handle async actions: pending, fulfilled, rejected (for errors)
    [fetchHabits.pending](state) {
      state.status = "loading";
    },
    [fetchHabits.fulfilled](state, action) {
      state.entities = action.payload;
      state.status = "idle";
    },
  },
});

export default habitsSlice.reducer;
