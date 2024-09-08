import {memo} from "react";
import {FaCommentAlt} from "react-icons/fa";
import {AiFillLike} from "react-icons/ai";
import {type NavigateFunction, useNavigate} from "react-router-dom";

interface props {
 photos: {
  photo: string;
  postId: number;
  likes: number;
  comments: number;
 }[];
};

const ExplorePosts = ({photos}: props): JSX.Element => {
 const navigate: NavigateFunction = useNavigate();

 return (
  <div className="p-3 w-full gap-3 grid grid-cols-3 md:grid-cols-[repeat(auto-fit,minmax(200px,1fr))] grid-rows auto-rows-[100px] sm:auto-rows-[150px] md:auto-rows-[200px]">
  {photos.map((item, index) => (
   <div
    key={String(`explore-post-${index}`)}
    className="rounded-sm overflow-hidden cursor-pointer relative"
    onClick={() => navigate(`/singlepost?post=${item.postId}`,{state: {postId: item.postId}})}
   >
    <div className="h-full w-full absolute bg-transparent opacity-0 hover:opacity-100 hover:bg-[rgba(0,0,0,0.333)] duration-300 flex items-center justify-center space-x-3">
     <div className="flex items-center space-x-2 text-white">
      <AiFillLike size={18} color={"#FFF"} />
      <span className="text-sm">{item.likes}</span>
     </div>
     <div className="flex items-center space-x-2 text-white">
      <FaCommentAlt size={16} color={"#FFF"} />
      <span className="text-sm">{item.comments}</span>
     </div> 
    </div>
    <img
     alt={"Random photo"}
     className="h-full w-full object-cover"
     crossOrigin={item.photo.startsWith("https") ? undefined : "use-credentials"}
     src={`${item.photo.startsWith("https") ? item.photo : `http://localhost:9000/images/${item.photo}`}`} 
    />
   </div>
   ))}
  </div>
 );
};

export default memo(ExplorePosts);