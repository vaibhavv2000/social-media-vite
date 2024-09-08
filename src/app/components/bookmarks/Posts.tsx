import {useAppSelector} from "../../hooks/redux";
import Post from "../home/Post";

const Posts = () => {
 const {bookmarks} = useAppSelector(state => state.post);

 const NoBookmarks = (
  <div className="grid place-items-center h-full">
   <div className="min-h-[400px] lg:min-h-full grid place-items-center">
    <h1 className="text-xl md:text-3xl font-inter font-medium text-gray-500 text-center">
     You haven't bookmarked anything yet
    </h1>
   </div>
  </div>
 );

 return (
  <div className="py-1 md:py-5 md:px-5 px-0 bg-gray-50 flex flex-col items-center dark:bg-[#0c0c0c] flex-[3] space-y-2 md:space-y-6">
  {bookmarks.length < 1 ? NoBookmarks : bookmarks.map(item => (
   <Post key={`post-${item.id}`} post={item} />
  ))}
  </div>
 );
};

export default Posts;