import {useState} from "react";
import {AiOutlineDelete} from "react-icons/ai";
import {HiOutlineDotsVertical} from "react-icons/hi";
import {MdReportGmailerrorred} from "react-icons/md";
import {gql,useMutation} from "@apollo/client";
import {removeComment} from "../../redux/postSlice";
import {NavigateFunction,useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import type {comment} from "../../utils/types";
import {showAlert} from "../../redux/utilsSlice";
import AccountImage from "../../assests/images/account.jpg";

const DELETE_COMMENT = gql`
 mutation DeleteComment($id: ID!, $postId: ID!) {
  deleteComment(id: $id, postId: $postId) {
   message
  }
 }
`;

interface props {
 comment: comment; 
};

const Comment = ({comment}: props) => {
 const [showOpt,setShowOpt] = useState<boolean>(false);

 const navigate: NavigateFunction = useNavigate();
 const dispatch = useAppDispatch();
 const user = useAppSelector(state => state.user.user);

 const [deleteComment] = useMutation(DELETE_COMMENT,{
  variables: {postId: comment.postId, id: comment.id},
 });

 const commentDelete = async () => {
  try {
   dispatch(removeComment(comment.id));
   setShowOpt(false);
   await deleteComment();
  } catch(error) {
   dispatch(showAlert({message: "Some Error Occurred", type: "error"}));
  };
 };

 return (
 <div className="flex items-center p-1 px-2 space-x-2 my-1">
  <img 
   src={user.profile || AccountImage}
   alt={"Account"}
   className="h-8 w-8 rounded-full"
  />

  <div className="flex-1">
   <h4
    className="dark:text-white font-semibold text-sm hover:underline cursor-pointer"
    onClick={() => navigate(`/profile/${comment.username}`)}
   >
    {comment.username}
   </h4>
   <div className="dark:text-white/80 text-[14px] w-full -mt-1">
    {comment.comment}
   </div>
  </div>
  <div className="relative">
   <span
    className="dark:text-white cursor-pointer"
    onClick={() => setShowOpt(!showOpt)}
   >
    <HiOutlineDotsVertical size={16} />
   </span>

  {showOpt && (
   <div className="bg-white dark:bg-black absolute right-2 top-0 shadow-sm rounded-sm">
    <div onClick={() => setShowOpt(false)}
     className="flex space-x-3 items-center hover:bg-gray-50 cursor-pointer px-3 py-2 dark:hover:bg-dark_2"
    >
     <span className="dark:text-white">
      <MdReportGmailerrorred size={20} />
     </span>
     <span className="font-medium dark:text-white text-[12px]">Report</span>
    </div>

    {String(user?.id) === String(comment.userInteracted) && (
     <div className="flex space-x-3 items-center hover:bg-gray-50 cursor-pointer px-3 py-2 dark:hover:bg-dark_2"
      onClick={commentDelete}
     >
      <span className="dark:text-white"><AiOutlineDelete size={20} /></span>
      <span className="font-medium dark:text-white text-[12px]">Delete</span>
     </div>
    )}
    </div>
   )}
   </div>
  </div>
 );
};

export default Comment;