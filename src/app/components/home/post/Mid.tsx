import {API_URL} from "../../../lib/API";
import type {post} from "../../../utils/types";

const Mid = ({post}: {post: post}) => {
 return (
  <div className="dark:bg-black">
  {post.status && (
   <div className="p-2 text-[15px] text-gray-800 dark:text-white/90">
    {post.status}
   </div>
  )}
  {post.photo && (
   <div className="h-64 sm:h-96 md:h-96 lg:h-[480px] w-full">
    <img
     crossOrigin={post.photo.startsWith("https") ? undefined : "use-credentials"}
     src={`${post?.photo.startsWith("https") ? post.photo : `${API_URL}/images/${post.photo}`}`}
     alt={post?.username}
     className="h-full w-full object-cover"
    />
   </div>)}
  </div>
 );
};

export default Mid;