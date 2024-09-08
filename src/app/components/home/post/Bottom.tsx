import {Fragment,useEffect,useState} from "react";
import PostOptions from "./PostOptions";
import Comment from "../Comment";
import AddComment from "./AddComment";
import {gql,useLazyQuery} from "@apollo/client";
import {addComments} from "../../../redux/postSlice";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import type {comment, post} from "../../../utils/types";
import {showAlert} from "../../../redux/utilsSlice";

const GET_COMMENTS = gql`
 query getComments($postId: ID!) {
  getPostComments(postId: $postId) {
   id
   postId
   comment
   userInteracted
   username
  }
 }
`;

const Bottom = ({post}: {post: post}) => {
 const [showComments,setShowComments] = useState<boolean>(false);
 const {comments} = useAppSelector(state => state.post);
 const Comments = comments.filter(item => item.postId === post.id);

 const dispatch = useAppDispatch();

 const [getPostComments] = useLazyQuery(GET_COMMENTS,{
  variables: {postId: post.id},
  onCompleted: ({getPostComments}) => getPostComments && dispatch(addComments(getPostComments)),
 });

 const fetchPosts = async () => {
  try {
   await getPostComments();
  } catch(error) {
   dispatch(showAlert({message: "Some Error Occurred", type: "error"}));
  };
 };

 useEffect(() => {
  fetchPosts();
 }, []);

 return (
  <Fragment>
   <PostOptions
    bookmarks={post.bookmarks}
    likes={post.likes}
    comments={post.comments}
    postId={post.id}
    isLiked={post.isLiked}
    showComments={showComments}
    setShowComments={setShowComments}
    totalComments={Comments?.length || 0}
    isBookmarked={post.isBookmarked}
    post={post}
   />

   {showComments && <div>
    {Comments.length > 0 && Comments.map((comment: comment,index: number) => (
     <Comment key={`${comment.id}-${index}`} comment={comment} />
    ))}
   </div>}

   <AddComment postId={post.id} />
  </Fragment>
 );
};

export default Bottom;