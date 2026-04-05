import { createSlice } from "@reduxjs/toolkit";
import { mockTransactions } from "../../data/mockData";

const slice = createSlice({
  name: "transactions",
  initialState: mockTransactions,

  reducers: {
    addTransaction: (state, action) => {
      state.push({
        id: Date.now(),
        ...action.payload,
      });
    },

    updateTransaction: (state, action) => {
      const index = state.findIndex((t) => t.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },

    deleteTransaction: (state, action) => {
      return state.filter((t) => t.id !== action.payload);
    },
  },
});

export const { addTransaction, updateTransaction, deleteTransaction } =
  slice.actions;

export default slice.reducer;
