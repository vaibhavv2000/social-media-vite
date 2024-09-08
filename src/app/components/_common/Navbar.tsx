import {IoSettingsOutline} from "react-icons/io5";
import {useNavigate} from "react-router-dom";

const Navbar = () => {
 const navigate = useNavigate();
  
 return (
  <nav className="sticky z-50 top-0 shadow-sm dark:shadow-none h-12">
   <div className="dark:bg-black bg-white w-full flex justify-between items-center max-w-[1440px] mx-auto">
    <h1 onClick={() => navigate(`/`)}
     className="text-2xl font-lora font-black tracking-wider p-2 pl-5 shadow-sm dark:text-white cursor-pointer">
     SOCIOAPP
    </h1>
    <span 
     className="dark:text-white pr-4 md:!hidden cursor-pointer" 
     onClick={() => navigate(`/settings`)}
    >
     <IoSettingsOutline size={20} />
    </span>
   </div>
  </nav>
 );
};

export default Navbar;