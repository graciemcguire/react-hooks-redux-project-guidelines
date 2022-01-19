import { configureStore } from "@reduxjs/toolkit";
import habitsReducer from "./features/habits/habitsSlice";

const store = configureStore({
  reducer: {
    habits: habitsReducer,
  },
});

export default store;
