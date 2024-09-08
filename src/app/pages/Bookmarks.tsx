import {gql, useQuery} from "@apollo/client";
import Posts from "../components/bookmarks/Posts";
import {useAppDispatch} from "../hooks/redux";
import {addBookmarks} from "../redux/postSlice";

const FETCH_BOOKMARKS = gql`
 query getPosts {
  getBookmarks {
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

const Bookmarks = () => {
 const dispatch = useAppDispatch();

 useQuery(FETCH_BOOKMARKS,{
  onCompleted:({getBookmarks}) => dispatch(addBookmarks(getBookmarks)),
 });

 return (
  <div className="flex flex-col lg:flex-row flex-1">
   <Posts />
  </div>
 );
};

export default Bookmarks;