import {AiOutlinePlus} from "react-icons/ai";
import {MdSunny} from "react-icons/md";
import {GiNightSleep} from "react-icons/gi";
import {BiMessageSquare} from "react-icons/bi";
import {IoEarthOutline, IoSettingsOutline} from "react-icons/io5";
import {type NavigateFunction,useNavigate, useParams} from "react-router-dom";
import {toggleUpload} from "../../redux/postSlice";
import {FiHome} from "react-icons/fi";
import {LuSearch} from "react-icons/lu";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {updateDarkMode} from "../../redux/userSlice";
import {useEffect, useState} from "react";

let link = "flex items-center justify-center lg:justify-start space-x-4 hover:bg-gray-50 cursor-pointer p-2 py-3 my-3 rounded-tr-[28px] rounded-br-[28px] lg:pl-5 dark:hover:bg-[rgba(255,255,255,0.09999)]";

let name = "hidden lg:!inline font-medium dark:text-white";

const Sidebar = (): JSX.Element => {
 const [path, setPath] = useState("");
 const {user,isDarkMode} = useAppSelector(state => state.user);
    
 let isActive = (name: string) => {
  return `${path.includes(name) ? (isDarkMode ? "bg-[rgba(255,255,255,0.09999)]" : "bg-gray-50") : "bg-transparent"}`; 
 }

 const pathname = useParams() as any;
 const navigate: NavigateFunction = useNavigate();
 const dispatch = useAppDispatch();

 const setDarkMode = () => dispatch(updateDarkMode(!isDarkMode));

 useEffect(() => {
  setPath(pathname["*"]);
 }, [pathname]);

 return (
  <aside className="w-[40px] hidden md:!block bg-white sm:w-[80px] lg:w-[20%] sticky top-12 dark:bg-black h-[calc(100vh-48px)]">
   <div
    className={`${link} ${path === "" && "bg-gray-50 dark:bg-[rgba(255,255,255,0.09999)]"}`} onClick={() => navigate(`/`)}>
    <span className="dark:text-white">
     <FiHome size={20} />
    </span>
    <span className={name}>Home</span>
   </div>
   <div className={`${link} ${isActive("search")}`} onClick={() => navigate(`/search`)}>
    <span className="dark:text-white">
     <LuSearch size={20} />
    </span>
    <span className={name}>Search</span>
   </div>
   <div className={`${link} ${isActive("explore")}`} onClick={() => navigate(`/explore`)}>
    <span className="dark:text-white">
     <IoEarthOutline size={20} />
    </span>
    <span className={name}>Explore</span>
   </div>
   <div className={link} onClick={() => dispatch(toggleUpload())}>
    <span className="dark:text-white">
     <AiOutlinePlus size={20} />
    </span>
    <span className={name}>Upload</span>
   </div>
   {/* <div className={`${link} ${isActive("messages")}`}>
    <span className="dark:text-white">
     <BiMessageSquare size={20} />
    </span>
    <span className={name}>Messages</span>
   </div> */}
   <div 
    className={`${link} ${isActive("profile")}`} 
    onClick={() => navigate(`/profile/${user?.username}`)}
   >
    <img
     className="h-6 w-6 rounded-full"
     alt={user?.name}
     src={user?.profile ? user.profile : "https://cdn-icons-png.flaticon.com/128/149/149071.png"}
    />
    <span className={name}>Profile</span>
   </div>
   <div className={`${link} ${isActive("settings")}`} onClick={() => navigate(`/settings`)}>
    <span className="dark:text-white">
     <IoSettingsOutline size={20} />
    </span>
    <span className={name}>Settings</span>
   </div>
   <hr className="bg-gray-50 opacity-40" />
   <div className={`${link} hidden lg:!flex`}>
    <span className={name}>{isDarkMode ? "DarkMode" : "LightMode"}</span>
    <div className="bg-gray-50 dark:bg-dark_2 h-5 w-12 rounded-full relative">
     <span
      style={{transition: "all 0.3s linear",left: isDarkMode ? "20px" : "0px"}}
      className='rounded-full p-1 bg-white dark:bg-[#111] shadow-md inline-block absolute top-[-5px]'
     >
      {isDarkMode ? (
       <MdSunny size={22} color="gold" onClick={setDarkMode} />
      ) : (
       <GiNightSleep size={22} color="gold" onClick={setDarkMode} />
      )}
     </span>
    </div>
   </div>
   {/* mobile darkmode */}
   <div className="lg:hidden flex justify-center my-4">
    <span className="cursor-pointer">
    {!isDarkMode ? (
     <MdSunny size={22} color="gold" onClick={setDarkMode} />
    ) : (
     <GiNightSleep size={22} color="gold" onClick={setDarkMode} />
    )}
    </span>
   </div>
  </aside>
 );
};

export default Sidebar;