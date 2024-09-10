import {useState,useEffect} from "react";
import {AiOutlineSecurityScan} from "react-icons/ai";
import {BsStar} from "react-icons/bs";
import {MdOutlineAccountCircle, MdInfoOutline, MdOutlineBookmarkBorder, MdOutlineGroups3} from "react-icons/md";
import {RiDeleteBin6Line,RiLogoutCircleRLine,RiPagesLine} from "react-icons/ri";
import {NavigateFunction,useNavigate} from "react-router-dom";
import {MdSunny} from "react-icons/md";
import {GiNightSleep} from "react-icons/gi";
import {logout, updateDarkMode} from "../../redux/userSlice";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {showAlert} from "../../redux/utilsSlice";
import useMutationAPI from "../../hooks/useMutationAPI";

const SettingsOption = () => {
 const [showDel,setShowDel] = useState<boolean>(false);
 const {isDarkMode} = useAppSelector(state => state.user);

 const navigate: NavigateFunction = useNavigate();
 const dispatch = useAppDispatch();

 const {mutator} = useMutationAPI({
  endpoint: !showDel ? "/auth/logout" : "/user/deleteuser",
  clearError: 5000,
  method: "delete",
  onSuccess: () => {
   localStorage.removeItem("social-auth");
   dispatch(logout());
   window.location.reload();
   dispatch(updateDarkMode(false));
  },
  onError: () => dispatch(showAlert({message: "Some Error Occurred", type: "error"})),
 });

 useEffect(() => {
  document.title = `Settings`;
 }, []);

 return (
  <nav className="py-2 w-full md:w-[70%] lg:w-[50%] h-full dark:bg-[#121212]">
   <h1 className="text-xl px-4 md:text-2xl dark:text-white font-bold my-2">Settings</h1>
   <div className="p-1">
    {/*  */}
    <div className={"settings-link"} onClick={() => navigate(`/settings/update`)}>
     <span className="dark:text-white">
      <MdOutlineAccountCircle size={20} />
     </span>
     <span className={"settings-link-name"}>Edit Profile</span>
    </div>
    {/*  */}
    {/*  */}
    <div className={"settings-link"}>
     <span className="dark:text-white">
      <AiOutlineSecurityScan size={20} />
     </span>
     <span className={"settings-link-name"}>Security</span>
    </div>
    {/*  */}
    <div className={"settings-link"}>
     <span className="dark:text-white">
      <MdOutlineGroups3 size={20} />
     </span>
     <span className={"settings-link-name"}>Groups</span>
    </div>
    {/*  */}
    <div className={"settings-link"}>
     <span className="dark:text-white">
      <RiPagesLine size={20} />
     </span>
     <span className={"settings-link-name"}>Pages</span>
    </div>
    {/*  */}
    {/*  */}
    <div className={"settings-link"} onClick={() => navigate("/bookmarks")}>
     <span className="dark:text-white">
      <MdOutlineBookmarkBorder size={20} />
     </span>
     <span className={"settings-link-name"}>Bookmarks</span>
    </div>
    {/*  */}
    {/*  */}
    <div className={"settings-link"}>
     <span className="dark:text-white">
      <BsStar size={20} />
     </span>
     <span className={"settings-link-name"}>Featured</span>
    </div>
    {/*  */}
    <div className={"settings-link"}>
     <span className="dark:text-white">
      <MdInfoOutline size={20} />
     </span>
     <span className={"settings-link-name"}>About Us</span>
    </div>

    <div 
     className={`${"settings-link"} lg:hidden`} 
     onClick={() => dispatch(updateDarkMode(!isDarkMode))}
    >
     <span className="cursor-pointer">
      {!isDarkMode ? <MdSunny size={20} color="gold" /> : (
       <GiNightSleep size={20} color="gold" />
      )}
     </span>
     <span className={"settings-link-name"}>
      {isDarkMode ? "Dark Mode" : "Light Mode"}
     </span>
    </div>

    {/*  */}
    <div className="px-3 my-1">
     <hr />
    </div>
    {/*  */}
    <div className={`${"settings-link"} hover:!bg-blue-500 hover:!text-white`} onClick={mutator}>
     <span className="dark:text-white">
      <RiLogoutCircleRLine size={20} />
     </span>
     <span className={"settings-link-name"}>Logout</span>
    </div>
    {/*  */}
    <div 
     className={`${"settings-link"} hover:!bg-red-600 hover:!text-white`} 
     onClick={() => setShowDel(true)}>
     <span className="dark:text-white">
      <RiDeleteBin6Line size={20} />
     </span>
     <span className={"settings-link-name"}>Delete Account</span>
    </div>
    {/*  */}
    {/* delete */}
    {showDel && (
    <div
     className={`grid fixed top-0 left-0 h-screen w-full scale-125 bg-[rgba(0,0,0,0.444)] place-items-center z-[9999999999999999] dark:bg-[rgba(0,0,0,0.22222)]`}
    >
     <div className="bg-white dark:bg-dark_2 p-4 w-56 rounded-sm shadow-lg">
      <h1 className="dark:text-white text-lg font-bold">Account Deletion Request</h1>
      <p className="dark:text-white/80 text-xs text-gray-700 mt-2">
       Are you sure you want to delete your Account?
      </p>
     <div className="flex items-center justify-end mt-6 space-x-5 px-3">
     <span className="text-gray-400 text-xs cursor-pointer" onClick={() => setShowDel(false)}>
      Cancel
     </span>
     <span className="text-red-500 text-xs cursor-pointer" onClick={mutator}>
      Yes
     </span>
    </div>
   </div>
  </div>
  )}
  {/*  */}
 </div>
 </nav>
 );
};

export default SettingsOption;