import {useEffect,useRef,useState} from "react";
import {IoSearchOutline} from "react-icons/io5";
import {HiXMark} from "react-icons/hi2";
import {gql,useLazyQuery} from "@apollo/client";
import People from "../home/People";
import {API} from "../../lib/API";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {showAlert} from "../../redux/utilsSlice";
import {type Users, setUsers} from "../../redux/userSlice";

const FETCH_USERS = gql`
 query Getusers($query: String) {
  getRecommendedUsers(query: $query) {
   id name username profile
  }
 }
`;

const Searchbar = () => {
 const [query,setQuery] = useState<string>("");
 const {users} = useAppSelector(state => state.user);

 const inputRef = useRef<HTMLInputElement>(null);
 const dispatch = useAppDispatch();

 const [searchUsers,{data}] = useLazyQuery(FETCH_USERS);

 useEffect(() => {
  inputRef.current && inputRef.current.focus();
 }, []);

 function debounce(fn: Function,delay: number) {
  let timer;
  return (() => {
   clearTimeout(timer);
   timer = setTimeout(fn,delay);
  })();
 };

 useEffect(() => {
  async function getUsers() {
   try {
    const res = await API.get(`/user/searchusers?query=${query}`);
    dispatch(setUsers(res.data));
   } catch(error: any) {
    let message = error?.response?.data?.message || error?.message;
    dispatch(showAlert({message, type: "error"}));
   };
  };

  if(query) debounce(getUsers,1000);
  else dispatch(setUsers([]));
 }, [query]);

 return (
  <div className="my-3 w-full flex justify-center">
   {/* input */}
   <div className="px-3 w-full max-w-lg">
    <div className="flex dark:bg-black bg-gray-50 items-center p-3 px-6 shadow-sm space-x-4 rounded-sm">
     <span className="dark:text-white cursor-pointer text-gray-500">
      <IoSearchOutline size={20} />
     </span>
     <input
      className="outline-none bg-transparent dark:text-white flex-1"
      placeholder="Search users"
      value={query}
      ref={inputRef}
      onChange={e => setQuery(e.target.value)}
     />
     <span
      className="dark:text-white cursor-pointer text-gray-500"
      onClick={() => {
       setQuery("");
       inputRef.current && inputRef.current.focus();
      }}
     >
      <HiXMark size={20} />
     </span>
    </div>
    {/* results */}
    {users.length > 0 && (
    <div className="shadow-sm py-1 dark:bg-black">
     <People users={users} />
    </div>
   )}
   </div>
  </div>
 );
};

export default Searchbar;