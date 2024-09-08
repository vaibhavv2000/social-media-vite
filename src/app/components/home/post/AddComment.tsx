import {gql,useMutation} from "@apollo/client";
import {useState} from "react";
import {RiSendPlane2Fill} from "react-icons/ri";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {addComment} from "../../../redux/postSlice";
import AccountImage from "../../../assests/images/account.jpg";

const COMMENT_POST = gql`
 mutation Comment($postId: ID!, $comment: String!) {
  commentPost(postId: $postId, comment: $comment) {
   id postId comment userInteracted username createdAt
  }
 }
`;

const AddComment = ({postId}: {postId: number}) => {
 const [comment,setComment] = useState<string>("");
 const dispatch = useAppDispatch();
 const {user} = useAppSelector(state => state.user)

 const [postComment,{data}] = useMutation(COMMENT_POST,{
  onCompleted: ({commentPost}) => {
   dispatch(addComment({...commentPost, username: user.username}));
  }  
 });

 const handleAddComment = async () => {
  if(comment) {
   await postComment({variables: {postId,comment}});
   setComment("");
  };
 };

 return (
  <div className="mb-3 p-1">
   <div
    className="flex bg-gray-50 items-center p-2 space-x-3 rounded-full dark:bg-dark_2 md:mx-2">
    <img
     src={user.profile || AccountImage}
     alt={user.username}
     className="h-6 w-6 rounded-full"
    />
    <input
     className="flex-1 text-sm sm:text-[14px] outline-none px-1 bg-transparent dark:text-white"
     placeholder="Add a comment"
     value={comment}
     onChange={e => setComment(e.target.value)}
     onKeyDown={e => e.key === "Enter" && handleAddComment()}
    />
    <span 
     className="p-1 dark:text-white/70 scale-75 sm:scale-100 text-gray-600 cursor-pointer" 
     onClick={handleAddComment}
    >
     <RiSendPlane2Fill size={20} />
    </span>
   </div>
  </div>
 );
};

export default AddComment;