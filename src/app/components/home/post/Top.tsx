import {useEffect, useState} from "react";
import {type NavigateFunction,useNavigate} from "react-router-dom";
import {AiOutlineDelete} from "react-icons/ai";
import {BiEditAlt} from "react-icons/bi";
import {HiOutlineDotsHorizontal} from "react-icons/hi";
import {MdReportGmailerrorred} from "react-icons/md";
import {gql,useMutation} from "@apollo/client";
import {addImage,editPost,editStatus,removePost} from "../../../redux/postSlice";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import type {post} from "../../../utils/types";
import {showAlert} from "../../../redux/utilsSlice";
import AccountImage from "../../../assests/images/account.jpg";

const DELETE_POST = gql`
 mutation deletePost($postId: ID!, $photo: String) {
  deletePost(postId: $postId, photo: $photo) {
   message
  }
 }
`;

const Top = ({post}: {post: post}) => {
 const [optEnabled,setOptEnabled] = useState<boolean>(false);
 const [confirmDeletion, setConfirmDeletion] = useState(false);

 const [deletePost] = useMutation(DELETE_POST, {
  onCompleted: ({message}) => {
   if(message === "Post deleted") dispatch(showAlert({message, type: "success"})); 
  }
 });

 const navigate: NavigateFunction = useNavigate();
 const dispatch = useAppDispatch();

 const {user} = useAppSelector(state => state.user);

 useEffect(() => {
  window.addEventListener("click",function() {
   if(optEnabled) setOptEnabled(false);
  });
 }, []);

 const postEdit = () => {
  dispatch(editPost(post.id));

  if(post.status) dispatch(editStatus(post.status));
  if(post.photo) dispatch(addImage(post.photo));
 };

 const postDelete = async () => {
  const data = {postId: post.id} as Partial<post>;
  if(post?.photo) data.photo = post?.photo;
  await deletePost({variables: data});
  dispatch(removePost(post.id));
 };
 
 return (
  <div className="flex items-center justify-between dark:bg-black p-2 py-3">
   <div className="flex items-center space-x-2">
    <img
     src={post.profile || AccountImage}
     alt={post.username}
     className="h-10 w-10 rounded-full object-cover"
    />
    <div className="flex flex-col">
     <div className="flex flex-col">
      <span
       className="font-semibold text-[14px] dark:text-white hover:underline cursor-pointer"
       onClick={() => navigate(`/profile/${post.username}`)}
      >
       {post.name}
      </span>
      <span className="text-gray-600 text-[12px] -mt-1 dark:text-white/60">
       @{post.username}
      </span>
     </div>
    </div>
   </div>
   <div className="relative">
    <span
     className="cursor-pointer dark:text-white"
     onClick={(e) => {
      setOptEnabled(prev => !prev);
      e.stopPropagation();
     }}
    >
     <HiOutlineDotsHorizontal size={24} />
    </span>
    {optEnabled && (
    <div className={`bg-gray-50 dark:bg-black absolute right-2 top-4 shadow-lg duration-1000 ease-in-out rounded-sm`}
    >
    {String(post.userId) === String(user?.id) && (
     <div onClick={postEdit}
      className="flex space-x-3 items-center hover:bg-gray-50 cursor-pointer px-3 py-2 dark:hover:bg-dark_2"
     >
      <span className="dark:text-white">
       <BiEditAlt size={20} />
      </span>
      <span className="font-medium text-[12px] dark:text-white">Edit</span>
     </div>
    )}
    <div
     onClick={() => dispatch(showAlert({message: "Post reported successfully", type: "success" }))}
     className="flex space-x-3 items-center hover:bg-gray-50 cursor-pointer px-3 py-2 dark:hover:bg-dark_2"
    >
     <span className="dark:text-white">
      <MdReportGmailerrorred size={20} />
     </span>
     <span className="font-medium text-[12px] dark:text-white">Report</span>
    </div>
    {String(post.userId) === String(user?.id) && (
    <div
     className="flex space-x-3 items-center hover:bg-gray-50 cursor-pointer px-3 py-2 dark:hover:bg-dark_2"
     onClick={() => setConfirmDeletion(true)}
    >
     <span className="dark:text-white">
      <AiOutlineDelete size={20} />
     </span>
     <span className="font-medium text-[12px] dark:text-white">Delete</span>
    </div>
    )}
   </div>
   )}
   </div>
   {confirmDeletion && <div className="fixed top-0 h-screen w-full left-0 grid place-items-center bg-black/50 z-[99999999999999999999999]">
    <div className="max-w-[340px] w-[90%] justify-between shadow-2xl flex bg-gray-50 items-center space-x-4 p-2 px-3 rounded-sm">
     <p className="text-sm">Delete this post?</p>
     <div className="space-x-1">
     <button 
      className="text-xs px-3 py-1.5 hover:bg-red-200 font-medium rounded-sm" 
      onClick={postDelete}
     >Yes</button>
     <button 
      className="text-xs px-3 py-1.5 hover:bg-gray-200 font-medium rounded-sm" 
      onClick={() => setConfirmDeletion(false)}
     >No</button>
     </div>
    </div>
   </div>}
  </div>
 );
};

export default Top;