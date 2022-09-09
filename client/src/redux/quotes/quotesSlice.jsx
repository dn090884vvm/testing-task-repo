import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  quotes: [],
};

const quotesSlice = createSlice({
  name: "quotes",
  initialState,
  reducers: {
    getQuote: (state, action) => {
      if (state.quotes.length === 0) {
        return {
          quotes: [
            ...action.payload.map((item) => ({
              ...item,
              change: 0,
              change_percent: 0,
            })),
          ],
        };
      }
      return {
        quotes: [
          ...action.payload.map((item, num) => ({
            ...item,

            change: parseFloat(item.price - state.quotes[num].price).toFixed(2),

            change_percent: parseFloat(
              100 - (state.quotes[num].price / item.price) * 100
            ).toFixed(2),
          })),
        ],
      };
    },
  },
});

export default quotesSlice.reducer;
export const { getQuote } = quotesSlice.actions;
