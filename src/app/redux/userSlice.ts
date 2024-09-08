import {createSlice,PayloadAction} from "@reduxjs/toolkit";
import {type user as usertype} from "../utils/types";

export interface Users extends usertype {
 isFollowing: boolean;
};

let user: usertype = {
 id: -1,
 bio: "",
 name: "",
 username: "",
 email: "",
 profile: "",
 posts: 0,
 cover: "",
 followings: 0,
 followers: 0,
};

interface state {
 isAuth: boolean;
 isDarkMode: boolean;
 user: usertype;
 users: Users[];
};

const initialState: state = {
 isAuth: false,
 isDarkMode: false,
 user,
 users: [],
};

export const userSlice = createSlice({
 name: "user",
 initialState,
 reducers: {
  login: (state,action: PayloadAction<usertype>) => {
   state.isAuth = true;
   state.user = action.payload;
  },
  logout: (state) => {
   state.isAuth = false;
   state.user = user;
  },
  updateFollowings: (state, action) => {
   const {payload} = action;

   if(state.user) {
    if(payload === "incr") state.user.followings = state.user.followings + 1;
    if(payload === "decr") state.user.followings = state.user.followings - 1;
   };
  },
  updateDarkMode: (state, {payload}: PayloadAction<boolean>) => {
   state.isDarkMode = payload;
   const html = document.querySelector("html") as HTMLElement;
   if(!state.isDarkMode) {
    localStorage.removeItem("social-darkmode");
    html.classList.remove("dark");
   } else {
    localStorage.setItem("social-darkmode", "true");
    html.classList.add("dark");
   };
  },
  setUsers: (state, {payload}: PayloadAction<Users[]>) => {
   state.users = [...payload]; 
  },
  updateUsersFollowings: (state, {payload}: PayloadAction<number>) => {
   state.users = [...state.users.map(item => {
    if(item.id === payload) {
     item.isFollowing = !item.isFollowing;
     if(item.isFollowing) state.user.followings += 1
     else state.user.followings -= 1
    };
    return {...item};
   })];
  },
 },
});

export const {login, logout, updateFollowings, updateDarkMode, setUsers, updateUsersFollowings} = userSlice.actions;

export default userSlice.reducer;