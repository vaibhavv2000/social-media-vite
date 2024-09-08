import {useEffect} from "react";
import {AiFillLike, AiOutlineLike} from "react-icons/ai";
import {useMemo,useState,type Dispatch,type SetStateAction} from "react";
import {gql,useMutation} from "@apollo/client";
import NumberConvertor from "../../../utils/NumberConvertor";
import {COLORS} from "../../../utils/colors";
import {GoComment} from "react-icons/go";
import {IoBookmark, IoBookmarkOutline, IoShareSocialOutline} from "react-icons/io5";
import {API} from "../../../lib/API";
import {showAlert} from "../../../redux/utilsSlice";
import {useAppDispatch} from "../../../hooks/redux";
import {addBookmark, removeBookmark} from "../../../redux/postSlice";
import type {post} from "../../../utils/types";

interface props {
  likes: number;
  comments: number;
  bookmarks: number;
  postId: number;
  showComments: boolean;
  setShowComments: Dispatch<SetStateAction<boolean>>;
  isLiked: boolean;
  totalComments: number;
  isBookmarked: boolean;
  post: post;
};

const LIKE_POST = gql`
 mutation LikeUserPost($postId: ID!) {
  likePost(postId: $postId) {
   message
  }
 }
`;

const PostOptions = (props: props) => {
 const {likes,bookmarks,postId, post} = props;
 const {totalComments,setShowComments,showComments,isLiked, isBookmarked} = props;
 const [liked,setLiked] = useState<boolean>(false);
 const [bookmarked, setBookmarked] = useState(false);
 const [totalLikes,setTotalLikes] = useState<number>(0);
 const [totalBookmarks,setTotalBookmarks] = useState<number>(0);
 const shares: number = useMemo(() => Math.floor(Math.random() * 5),[]);

 const [likePost] = useMutation(LIKE_POST);
 const dispatch = useAppDispatch();

 useEffect(() => {
  setLiked(isLiked);
  setTotalBookmarks(bookmarks);
  setTotalLikes(likes);
  setBookmarked(isBookmarked);
 }, []);

 const like = async () => {
  setLiked(!liked);
  
  try {
   if(liked) setTotalLikes(prev => prev - 1);
   else setTotalLikes(prev => prev + 1);
   await likePost({variables: {postId: postId}});
  } catch(error) {
   dispatch(showAlert({message: "Some Error Occurred", type: "error"}));
  };
 };

 const bookmarkPost = async () => {
  setBookmarked(!bookmarked);

  try {
   if(bookmarked) {
    setTotalBookmarks(prev => prev - 1);
    await API.delete(`/post/bookmark?postId=${postId}`);
    dispatch(removeBookmark(postId));
   }
   else {
    setTotalBookmarks(prev => prev + 1);
    await API.post(`/post/bookmark?postId=${postId}`);
    dispatch(addBookmark(post));
   };
  } catch(error) {
   dispatch(showAlert({message: "Some Error Occurred", type: "error"}));
  };
 };

 return (
  <div className="pb-1 py-2 dark:bg-black">
   <div className="py-2 flex items-center justify-between px-3">
    <div className="flex items-center flex-1 space-x-2">
     <span className="dark:text-white cursor-pointer" onClick={like}>
      {liked ? <AiFillLike size={22} color={COLORS.primary} /> : <AiOutlineLike size={22} />}
     </span>
     <span className="dark:text-white ml-3 font-medium text-[12px] w-2">
      {NumberConvertor(totalLikes)}
     </span>
    </div>
    <div
     className="flex items-center space-x-2 flex-1 justify-center"
     onClick={() => setShowComments(!showComments)}
    >
     <span className="dark:text-white">
      <GoComment size={20} cursor={"pointer"} />
     </span>
     <span className="dark:text-white ml-3 font-medium text-[12px] w-2">
      {NumberConvertor(totalComments)}
     </span>
    </div>
    <div 
     className="flex items-center space-x-2 flex-1 justify-center">
     <span className="dark:text-white">
      <IoShareSocialOutline size={20} cursor={"pointer"} />
     </span>
     <span className="dark:text-white ml-3 font-medium text-[12px] w-2">
      {NumberConvertor(shares)}
     </span>
    </div>
    <div 
     className="flex items-center space-x-2 flex-1 justify-end">
     <span className="dark:text-white  cursor-pointer" onClick={bookmarkPost}>
      {bookmarked ? <IoBookmark size={20} /> : <IoBookmarkOutline size={20} />}
      </span>
      <span className="dark:text-white ml-3 font-semibold text-[12px] w-2">
       {NumberConvertor(totalBookmarks)}
      </span>
     </div>
    </div>
   </div>
 );
};

export default PostOptions;