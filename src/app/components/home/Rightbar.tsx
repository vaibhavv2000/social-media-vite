import {type NavigateFunction,useNavigate} from "react-router-dom";
import People from "./People";
import {API_URL} from "../../lib/API";
import {setUsers, Users} from "../../redux/userSlice";
import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";

interface props {
 randomUsers: Users[];
 randomPhotos: {photo: string; postId: number}[];
};

const Rightbar = (props: props) => {
 const {randomPhotos,randomUsers} = props;
 const navigate: NavigateFunction = useNavigate();
 const dispatch = useAppDispatch();
 const {users} = useAppSelector(state => state.user);

 useEffect(() => {
  dispatch(setUsers(randomUsers));
 }, []);

 return (
  <div className="sticky w-full top-12 p-3 max-w-[680px] dark:bg-black lg:h-[calc(100vh-48px)]">
   <div className="dark:bg-[#111] px-3 py-1.5 rounded-md mb-3 shadow-sm w-full">
    <h1 className="text-lg dark:text-white font-bold my-2 mb-3">
     Photos Around The World
    </h1>
    <div className="w-full gap-1 grid grid-cols-3 md:grid-cols-[repeat(auto-fill,minmax(32%,1fr))] grid-rows auto-rows-[100px] sm:auto-rows-[140px] md:auto-rows-[140px] lg:auto-rows-[100px]">
    {randomPhotos.map((item,index: number) => (
     <div
      className="rounded-sm relative overflow-hidden cursor-pointer"
      key={`pp${index}`}
      onClick={() => navigate(`/singlepost?post=${item.postId}`,{state: {postId: item.postId}})}
     >
      <div className="absolute h-full w-full bg-transparent hover:bg-[rgba(0,0,0,0.1)] duration-300"></div>
       <img
        alt="Photo"
        crossOrigin={item.photo.startsWith("https") ? undefined : "use-credentials"}
        src={`${item.photo.startsWith("https") ? item.photo : `${API_URL}/images/${item.photo}`}`}
        className="object-cover h-full w-full"
       />
      </div>
    ))}
    </div>
   </div>

   {/* People you may know  */}
   <div className="dark:bg-[#111] p-1 rounded-md w-full shadow-sm">
    <h1 className="text-lg dark:text-white px-3 font-bold my-2 mb-3">
      People you may know
    </h1>
    <People users={users} />
   </div>
  </div>
 );
};

export default Rightbar;
