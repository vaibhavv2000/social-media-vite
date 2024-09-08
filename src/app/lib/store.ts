import {configureStore} from "@reduxjs/toolkit";
import userSlice from "../redux/userSlice";
import postSlice from "../redux/postSlice";
import utilsSlice from "../redux/utilsSlice";

const store = configureStore({
 reducer: {
  user: userSlice,
  post: postSlice,
  utils: utilsSlice,
 },
 devTools: false,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;