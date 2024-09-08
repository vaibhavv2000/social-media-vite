import {useParams} from "react-router-dom";
import {useAppSelector} from "../../hooks/redux";
import type {user} from "../../utils/types";

interface props {
 data: user;
 followers: number;
 followings: number;
};

const ProfileMid = (props: props) => {
 const {data, followers, followings} = props;
 const {user} = useAppSelector(state => state.user);
 const {username} = useParams();

 return (
  <div className={`flex flex-col px-4 space-y-3 ${username === user.username && "mt-5"}`}>
   <div>
    <span className="font-semibold dark:text-white">
     {data?.name}
    </span>
    <span className="dark:text-gray-400 text-gray-700 text-[14px] ml-1">
     @{data?.username}
    </span>
   </div>
   <div className="flex items-center w-10/12 justify-start space-x-8 md:space-x-5 flex-wrap">
    <div className="flex space-y-0.5 sm:space-y-0 items-center space-x-1">
     <span className="dark:text-white font-semibold">
      {data?.posts}
     </span>
     <span className="dark:text-white/80 text-xs sm:text-sm text-gray-800">Posts</span>
    </div>
    <div className="flex space-y-0.5 sm:space-y-0 items-center space-x-1">
     <span className="dark:text-white font-semibold">
      {followers}
     </span>
     <span className="dark:text-white/80 text-xs sm:text-sm text-gray-800">Followers</span>
    </div>
    <div className="flex space-y-0.5 sm:space-y-0 items-center space-x-1">
     <span className="dark:text-white font-semibold">
      {followings}
     </span>
     <span className="dark:text-white/80 text-xs sm:text-sm text-gray-800">Following</span>
    </div>
   </div>
   <div>
    {data?.bio && <p className="text-black/80 font-medium dark:text-white/90">{data.bio}</p>}
   </div>
  </div>
 );
};

export default ProfileMid;