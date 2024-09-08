import {useEffect} from "react";
import {gql,useLazyQuery} from "@apollo/client";
import Posts from "../components/home/Posts";
import Rightbar from "../components/home/Rightbar";
import Loader from "../components/_common/Loader";
import {addPosts} from "../redux/postSlice";
import {useAppDispatch} from "../hooks/redux";

const FETCH_TIMELINE_POSTS = gql`
 query getPosts {
  getTimelinePosts {
   id
   status
   photo
   userId
   likes
   comments
   bookmarks
   createdAt
   name
   username
   profile
   isLiked
   isBookmarked
  }

  getRandomPhotos {
   photo
   postId
   likes
   comments
  }

  getRecommendedUsers {
   id
   name
   username
   profile
   isFollowing
  }
 }
`;

interface data {
 getRandomPhotos: [];
 getRecommendedUsers: [];
 getTimelinePosts: [];
};

const Home = () => {
 const dispatch = useAppDispatch();

 const [getPosts, {data,loading}] = useLazyQuery<data>(FETCH_TIMELINE_POSTS,{
  onCompleted: (data) => dispatch(addPosts(data.getTimelinePosts)),
 });

 useEffect(() => {
  getPosts();
  document.title = `Home`;
 }, []);

 if(loading) return <Loader size={20} color="dodgerblue" />;

 return (
  <div className="flex flex-col lg:flex-row flex-1">
   <Posts />
   <div className="sticky flex flex-col items-center top-0 flex-[1.5]">
    {data && (
     <Rightbar
      randomUsers={data?.getRecommendedUsers}
      randomPhotos={data?.getRandomPhotos}
     />
    )}
   </div>
  </div>
 );
};

export default Home;