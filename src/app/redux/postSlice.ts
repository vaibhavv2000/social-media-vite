import {createSlice,PayloadAction} from "@reduxjs/toolkit";
import type {comment, post} from "../utils/types";

interface state {
 showUpload: boolean;
 edit: {
  isEditing: boolean;
  status: string;
  image: null | string;
  postId: number | null | string;
 };
 timelinePosts: post[];
 usersPosts: post[];
 comments: comment[];
 bookmarks: post[];
};

const initialState: state = {
 showUpload: false,
 edit: {
  isEditing: false,
  status: "",
  image: null,
  postId: "",
 },
 timelinePosts: [],
 comments: [],
 bookmarks: [],
 usersPosts: [],
};

export const postSlice = createSlice({
 name: "post",
 initialState,
 reducers: {
  toggleUpload: (state) => {
   state.showUpload = !state.showUpload;
   state.edit.isEditing = false;
   state.edit.image = null;
   state.edit.status = "";
  },
  editPost: (state, {payload}) => {
   state.showUpload = true;
   state.edit.isEditing = true;
   state.edit.postId = payload;
  },
  editStatus: (state, {payload}: PayloadAction<string>) => {
   state.edit.status = payload;
  },
  addImage: (state, {payload}: PayloadAction<string>) => {
   state.edit.image = payload;
  },
  addPosts: (state, {payload}: PayloadAction<post[]>) => {
   state.timelinePosts = [...payload];
  },
  addPost: (state, {payload}: PayloadAction<post>) => {
   state.timelinePosts = [payload, ...state.timelinePosts];
   state.showUpload = !state.showUpload;
  },
  updatePost: (state, {payload}) => {
   const {id,status,image} = payload;
 
   const post = state.timelinePosts.find(item => item.id === id);
   if(!post) return;
   post.status = status;
   post.photo = image;
   const posts = state.timelinePosts.filter(item => item.id === id);
   posts.unshift(post);
   state.timelinePosts = posts;
   state.showUpload = !state.showUpload;
  },
  removePost: (state, {payload}: PayloadAction<number>) => {
   state.timelinePosts = [...state.timelinePosts.filter(item => item.id !== payload)];
  },
  addComments: (state, {payload}: PayloadAction<comment[]>) => {
   state.comments = [...state.comments, ...payload];
  },
  addComment: (state, {payload}) => {
   state.comments = [...state.comments, payload];
  },
  removeComment: (state, {payload}: PayloadAction<number>) => {
   state.comments = [...state.comments.filter(item => item.id !== payload)];
  },
  addBookmarks: (state, {payload}: PayloadAction<post[]>) => {
   state.bookmarks = [...payload]; 
  },
  addBookmark: (state, {payload}) => {
   state.bookmarks = [payload, ...state.bookmarks] 
  },
  removeBookmark: (state, {payload}) => {
   state.bookmarks = [...state.bookmarks.filter(item => item.id === payload)];
  },
  addUsersPosts: (state, {payload}: PayloadAction<post[]>) => {
   state.usersPosts = [...payload]; 
  },
 },
});

export const {
 toggleUpload,
 editStatus,
 addImage,
 editPost,
 addPost,
 addPosts,
 removePost,
 addComments,
 addComment,
 removeComment,
 updatePost,
 addBookmarks,
 addUsersPosts,
 addBookmark,
 removeBookmark,
} = postSlice.actions;

export default postSlice.reducer;