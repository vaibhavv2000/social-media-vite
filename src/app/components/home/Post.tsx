import Top from "./post/Top";
import Mid from "./post/Mid";
import Bottom from "./post/Bottom";
import type {post} from "../../utils/types";

const Post = ({post}: {post: post}) => {
 return (
  <div className="w-[100%] shadow-md max-w-[620px] bg-white dark:bg-black mb-3 relative pb-2">
   <Top post={post} />
   <Mid post={post} />
   <Bottom post={post} />
  </div>
 );
};

export default Post;