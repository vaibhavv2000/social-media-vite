import {useParams} from "react-router-dom";
import {useAppSelector} from "../../hooks/redux";
import Post from "../home/Post";
import {useState} from "react";
import type {post} from "../../utils/types";

interface props {
 data: post[];
};

const Posts = ({data}: props) => {
 const {timelinePosts} = useAppSelector(state => state.post);
 const {user} = useAppSelector(state => state.user);
 const userPosts = timelinePosts.filter(item => String(item.userId) === String(user.id));
 const {username} = useParams();
 const [posts, setPosts] = useState(user.username === username ? userPosts : data);

 const NoPosts = (
  <div className="grid place-items-center h-full">
   <div className="min-h-[400px] lg:min-h-full grid place-items-center">
    <h1 className="text-xl md:text-3xl font-inter font-medium text-gray-500 text-center">
     No Posts From {username === user.username ? "you" : username} <br />
     {username === user.username ? "You haven't" : `${username} hasn't`} posted Anything Yet
    </h1>
   </div>
  </div>
 );

 return (
  <div className="p-4 flex flex-col items-center dark:bg-dark_2 space-y-2 md:space-y-6">
   {Array.isArray(posts) && posts?.length < 1 ? NoPosts : posts.map(item => <Post key={`post-${item.id}`} post={item} />)}
  </div>
 );
};

export default Posts;