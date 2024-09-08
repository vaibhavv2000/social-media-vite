import {LuSearch} from "react-icons/lu";
import {type NavigateFunction,useNavigate} from 'react-router-dom';
import {useState} from "react";
import {toggleUpload} from "../../redux/postSlice";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {FiHome} from "react-icons/fi"
import {FaRegSquarePlus} from "react-icons/fa6";
import {IoEarthOutline} from "react-icons/io5";
import AccountImage from "../../assests/images/account.jpg";

let link = 'grid h-full flex-1 place-items-center cursor-pointer';

const BottomNav = () => {
 const [isActive,setIsActive] = useState<number>();
 const navigate: NavigateFunction = useNavigate();
 const dispatch = useAppDispatch();
 const {user} = useAppSelector(state => state.user);

 function nav(name: number, path?: string) {
  setIsActive(name);
  if(path) navigate(`${path}`);
 };

 return (
  <nav className='fixed md:!hidden flex justify-evenly bg-white w-full bottom-0 dark:bg-black left-0 border-t border-gray-200 dark:border-transparent py-4 dark:text-white'>
   <div className={link} onClick={() => nav(1,"/")}>
    <FiHome size={20} />
   </div>
   <div className={link} onClick={() => nav(2,"/search")}>
    <LuSearch size={20} />
   </div>
   <div className={link} onClick={() => {
     nav(3); 
     dispatch(toggleUpload());
   }}>
    <FaRegSquarePlus size={20} />
   </div>
   <div className={link} onClick={() => nav(4,"/explore")}>
    <IoEarthOutline size={20} />
   </div>
   <div className={link} onClick={() => nav(5,`/profile/${user?.username}`)}>
    <img
     className="h-5 w-5 rounded-full"
     alt={user.username}
     src={user?.profile ? user.profile : AccountImage}
    />
   </div>
  </nav>
 );
};

export default BottomNav;