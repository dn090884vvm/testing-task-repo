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
          //   ...state,
          //   ...action.payload,
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
        // ...state,
        quotes: [
          ...action.payload.map((item, num) => ({
            ...item,
            // ...action.payload,
            change: parseFloat(state.quotes[num].price - item.price).toFixed(2),

            change_percent: parseFloat(
              100 - (state.quotes[num].price / item.price) * 100
            ).toFixed(2),
          })),
        ],
      };
      //   if (state.quotes !== action.payload) {
      //     // console.log("changed");
      //     // state.quotes = action.payload;
      //   }
    },
  },
});

export default quotesSlice.reducer;
export const { getQuote } = quotesSlice.actions;
