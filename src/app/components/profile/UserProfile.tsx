import {gql,useQuery} from "@apollo/client";
import {useState,useEffect} from "react";
import {useParams} from "react-router-dom";
import ProfileTop from "./ProfileTop";
import ProfileMid from "./ProfileMid";
import ProfileBottom from "./ProfileBottom";
import {useAppSelector} from "../../hooks/redux";

export const GET_USER = gql`
 query getUser($username: String!) {
  getUser(username: $username) {
   id
   name
   username
   email
   bio
   profile
   cover
   posts
   followers
   followings
   isFollowing
  }

  getUserPosts (username: $username) {
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

const UserProfile = () => {
 const [followings, setFollowings] = useState(0);
 const [followers,setFollowers] = useState(0);
 const {username} = useParams();
 const {data} = useQuery(GET_USER,{variables: {username}});
 const {user} = useAppSelector(state => state.user);

 useEffect(() => {
  document.title = `Profile - ${username}`;
 }, [username]);

 return (
  <div>
   {data && <>
    <ProfileTop
     data={user.username === username ? user : data.getUser}
     setFollowers={setFollowers}
     setFollowings={setFollowings}
    />
    <ProfileMid
     data={user.username === username ? user : data.getUser}
     followers={followers}
     followings={followings}
    />
   </>}
   <ProfileBottom data={data?.getUserPosts} />
  </div>
 );
};

export default UserProfile;
