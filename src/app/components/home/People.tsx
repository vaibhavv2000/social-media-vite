import {gql,useMutation} from "@apollo/client";
import {type NavigateFunction,useNavigate} from "react-router-dom";
import {useAppDispatch} from "../../hooks/redux";
import {updateUsersFollowings, Users} from "../../redux/userSlice";
import AccountImage from "../../assests/images/account.jpg";

const FOLLOW_USER = gql`
 mutation follow($userId: ID!) {
  followUser(userId: $userId) {
   message
  }
 }
`;

const People = ({users}: {users: Users[]}) => {
 const navigate: NavigateFunction = useNavigate();
 const dispatch = useAppDispatch();
 const [followUser] = useMutation(FOLLOW_USER);

 const follow = async (id: number) => {
  await followUser({variables: {userId: id}});
  dispatch(updateUsersFollowings(id));
 };

 return (
  <div className="px-2">
   {users.map(user => (
   <div key={`ur-${user.id}`} className="flex items-center my-3 w-full justify-between px-1.5">
    <div className="flex items-center space-x-2">
     <img
      src={user.profile || AccountImage}
      alt=""
      className="h-10 w-10 rounded-full object-cover"
     />
     <div className="flex flex-col">
      <h4 onClick={() => navigate(`/profile/${user.username}`)}
      className="dark:text-white text-[14px] text-black/70 hover:underline cursor-pointer font-bold" 
      >
       {user.name}
      </h4>
      <span className="dark:text-white/70 text-black/70 text-[12px] -mt-[3px]">
       @{user.username}
      </span>
     </div>
     </div>
     <div>
      <button
       className={`text-[12px] hover:shadow-md rounded-sm px-2 py-1 ${!user.isFollowing ? "bg-primary text-white" : "text-primary border border-primary"}`}
       onClick={() => follow(user.id)}
      >
       {user.isFollowing ? "Unfollow" : "Follow"}
      </button>
     </div>
   </div>
  ))}
  </div>
 );
};

export default People;