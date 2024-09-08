import {useAppSelector} from "../../hooks/redux";
import Post from "./Post";

const Posts = () => {
 const {timelinePosts} = useAppSelector(state => state.post);

 const NoPosts = (
  <div className="grid place-items-center h-full">
   <div className="min-h-[400px] lg:min-h-full grid place-items-center">
    <h1 className="text-xl md:text-3xl font-inter font-medium text-gray-500 text-center">
     No post on Timeline <br />
     Start following people to see their posts
    </h1>
   </div>
  </div>
 );

 return (
  <div 
   className="py-1 md:py-5 md:px-5 px-0 bg-gray-50 flex flex-col items-center dark:bg-[#0c0c0c] flex-[3] space-y-2 md:space-y-6">
  {timelinePosts.length < 1 ? NoPosts : timelinePosts.map(item => (
   <Post key={`post-${item.id}`} post={item} />
  ))}
  </div>
 );
};

export default Posts;