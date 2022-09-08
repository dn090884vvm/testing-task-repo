import { configureStore } from "@reduxjs/toolkit";
import quoteReducer from "./quotes/quotesSlice";

const store = configureStore({ reducer: { quotes: quoteReducer } });

export default store;
