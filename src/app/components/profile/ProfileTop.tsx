import {gql,useMutation} from "@apollo/client";
import {useState,useEffect} from "react";
import {useParams} from "react-router-dom";
import {updateFollowings, type Users} from "../../redux/userSlice";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import AccountImage from "../../assests/images/account.jpg";

const FOLLOW_USER = gql`
 mutation followUserProfile($userId: ID!) {
  followUser(userId: $userId) {
   message
  }
 }
`;

interface props {
 data: Users;
 setFollowers: React.Dispatch<React.SetStateAction<number>>;
 setFollowings: React.Dispatch<React.SetStateAction<number>>;
};

const ProfileTop = (props: props) => {
 const {data, setFollowers, setFollowings} = props;

 const [Image, setImage] = useState("");
 const [isFollowing,setIsFollowing] = useState<boolean>(false);

 const {username} = useParams();
 const [followUser] = useMutation(FOLLOW_USER);
 const {user} = useAppSelector(state => state.user);
 const dispatch = useAppDispatch();

 const follow = (mode: "follow" | "unfollow") => {
  if(mode === "follow") {
   setFollowers(prev => prev + 1);
   setIsFollowing(true);
   dispatch(updateFollowings("incr"));
  } else {
   setFollowers(prev => prev - 1);
   setIsFollowing(false);
   dispatch(updateFollowings("decr"));
  }
    
  followUser({variables: {userId: data?.id}});
 };

 useEffect(() => {
  if(data) {
   setFollowers(data?.followers);
   setIsFollowing(data?.isFollowing);
   setFollowings(data?.followings);
  }
 },[data,setFollowers]);

 return (
  <div>
   {Image && <div 
    className="fixed top-0 left-0 h-full w-full bg-black/80 z-[99999999999999] grid place-items-center cursor-pointer" 
    onClick={() => setImage("")}
   >
    <img 
     src={Image} 
     alt={username} 
     className="h-96 w-96 rounded-sm shadow-xl object-cover cursor-default" 
     onClick={e => e.stopPropagation()} 
    />
   </div> 
   }
   <img
    src={data?.cover || AccountImage}
    alt={username}
    className="w-full h-60 md:h-80 object-cover cursor-pointer"
    onClick={()  => setImage(data?.cover || AccountImage)}
   />
   <div className="h-20 w-20 md:h-32 md:w-32 ml-4 -mt-10 md:-mt-20 z-20">
    <img
     src={data?.profile || AccountImage}
     alt={username}
     className="h-full w-full object-cover rounded-md cursor-pointer"
     onClick={()  => setImage(data?.profile || AccountImage)}
    />
   </div>
   
  {user.username !== username && 
   <div className="flex justify-end pr-4">
    <button
     onClick={() => follow(isFollowing ? "unfollow" : "follow")}
     className={`text-[14px] scale-75 md:scale-100 hover:shadow-md rounded-sm px-6 py-2 ${!isFollowing ? "bg-primary text-white" : "text-primary border border-primary"}`}>
     {isFollowing ? "Unfollow" : "Follow"}
    </button>
   </div>}
  </div>
 );
};

export default ProfileTop;