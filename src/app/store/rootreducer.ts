import { combineReducers } from "@reduxjs/toolkit";
import cartReducer from "./cartslice";

const rootReducer = combineReducers({
  cartStore: cartReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
