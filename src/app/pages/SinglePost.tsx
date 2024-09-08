import {useLocation} from "react-router-dom";
import Post from "../components/home/Post";
import {gql,useQuery} from "@apollo/client";

const FETCH_POST = gql`
 query getSinglePost($postId: ID!) {
  getSinglePost(postId: $postId) {
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
 }
`;

const SinglePost = (): JSX.Element => {
 const {state} = useLocation();
 const {data} = useQuery(FETCH_POST,{ variables: {postId: state.postId}});

 return (
  <div className="flex-1 dark:bg-dark_2 bg-gray-50 flex justify-center">
   <div className="w-full sm:w-[90%] md:w-[100%] lg:w-[700px] xl:w-[60%] p-2">
    {data && <Post post={data?.getSinglePost} />}
   </div>
  </div>
 );
};

export default SinglePost;