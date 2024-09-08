import {gql,useMutation} from "@apollo/client";
import {type ChangeEvent,FormEvent,useEffect,useState} from "react";
import {login} from "../../redux/userSlice";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {showAlert} from "../../redux/utilsSlice";

let input = "outline-none p-3 border-b min-w-[260px] border-gray-300 dark:bg-[#0f0f0f] dark:text-white";

const UPDATE_USER = gql`
 mutation UserUpdate(
  $name: String
  $username: String
  $email: String
  $bio: String
  $profile: String
  $cover: String
 ) {
  updateUser (
   name: $name
   username: $username
   email: $email
   bio: $bio
   profile: $profile
   cover: $cover
  ) {
   name
   username
   email
   bio
   profile
   cover
  }
 }
`;

const UpdateProfile = (): JSX.Element => {
 const {user: currentUser} = useAppSelector(state => state.user);
 const [user,setUser] = useState(currentUser);
 const {name,bio,email,username,profile,cover} = user;
 const dispatch = useAppDispatch();

 const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  setUser((prev) => ({...prev, [e.target.name]: e.target.value}));
 };

 const [handleUpdateUser] = useMutation(UPDATE_USER, {
  onCompleted: ({updateUser: {__typename, ...userdata}}) => {
   setUser(prev => ({...prev, ...userdata}));
   dispatch(login({...user, ...userdata}));
   dispatch(showAlert({
    message: "You Account has been updated",
    type: "success" 
   }));
  },
  onError: () => {
   dispatch(showAlert({
    message: "Something went wrong",
    type: "error"
   })); 
  }
 });

 useEffect(() => {
  document.title = `Update your profile`;
 },[]);

 const handleUpdate = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  await handleUpdateUser({variables: {name,email,bio,username,profile,cover}});
 };

 return (
  <div className="p-4 w-full md:w-[70%] lg:w-[50%] shadow-md h-full dark:bg-dark_2">
   <h1 className="text-2xl font-bold dark:text-white p-2">Update Profile</h1>
   <form className="flex flex-col space-y-4 p-3" onSubmit={handleUpdate}>
    <div className="flex items-center space-x-5">
     <label className="w-20 dark:text-white">Name:</label>
     <input
      value={name}
      name="name"
      onChange={handleChange}
      className={input}
     />
    </div>
    {/*  */}
    <div className="flex items-center space-x-5">
     <label className="w-20 dark:text-white">Username:</label>
     <input
      value={username}
      name="username"
      onChange={handleChange}
      className={input}
     />
    </div>
    {/*  */}
    <div className="flex items-center space-x-5">
     <label className="w-20 dark:text-white">Email:</label>
     <input
      value={email}
      name="email"
      onChange={handleChange}
      className={input}
     />
    </div>
    {/*  */}
    <div className="flex items-start space-x-5">
     <label className="w-20 mt-2 dark:text-white">Bio:</label>
     <textarea
      value={bio || ""}
      name="bio"
      onChange={handleChange}
      className="outline-none p-2 border-b border-gray-300 resize-none dark:bg-[#0f0f0f] dark:text-white w-[235px] h-24"
     ></textarea>
    </div>
    {/*  */}
    <div className="flex items-center space-x-5">
     <label className="w-20 dark:text-white">Profile:</label>
     <input
      value={profile || ""}
      name="profile"
      onChange={handleChange}
      className={input}
     />
    </div>
    {/*  */}
    <div className="flex items-center space-x-5">
     <label className="w-20 dark:text-white">Cover:</label>
     <input
      value={cover || ""}
      name="cover"
      onChange={handleChange}
      className={input}
     />
    </div>
    {/*  */}
    <div className="flex justify-end p-1">
     <button
      type="submit"
      className="bg-primary hover:shadow-xl shadow-md text-white rounded-sm font-medium py-2 px-6 duration-500 text-[14px]"
     >
      Update
     </button>
    </div>
   </form>
  </div>
 );
};

export default UpdateProfile;