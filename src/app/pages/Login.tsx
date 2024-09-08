import {useState, useEffect, type FormEvent} from "react";
import {Link, useNavigate, type NavigateFunction} from "react-router-dom";
import {login} from "../redux/userSlice";
import {AiFillEye, AiFillEyeInvisible} from "react-icons/ai";
import {useAppDispatch} from "../hooks/redux";
import useMutationAPI from "../hooks/useMutationAPI";
import Loader from "../components/_common/Loader";
import Button from "../components/UI/Button";

export let input = "outline-none bg-gray-50 p-3 w-full text-[15px] rounded-sm";

const Login = (): JSX.Element => {
 const [user, setUser] = useState("");
 const [password, setPassword] = useState("");
 const [error, setError] = useState("");
 const [showPwd, setShowPwd] = useState(false);

 useEffect(() => {
  if(error) setTimeout(() => setError(""),5000);
 },[error]);

 useEffect(() => {
  document.title = "Login";
 },[]);

 const navigate: NavigateFunction = useNavigate();
 const dispatch = useAppDispatch();

 const {loading, mutator} = useMutationAPI({
  endpoint: "/auth/login",
  clearError: 5000,
  onError: (error) => setError(error),
  onSuccess: (data) => {
   if(data["id"]) {
    dispatch(login(data));
    localStorage.setItem("social-auth", "true");
    navigate("/");
   };
  },
 });

 const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  if(loading) return;

  if(!user.trim() || !password.trim()) return setError("All fields are necessary");
  if(password.length < 8) return setError("Password must have atleast 8 characters");
  if(user.includes(" ")) return setError("Username or Email can not have ' ' character");
  if(password.includes(" ")) return setError("Password can not have ' ' character");

  await mutator({password, user});
 };

 return (
  <main className="h-screen w-full grid place-items-center bg-white">
   <form 
    className="w-[90%] max-w-80 bg-white shadow-xl p-4 pt-6 rounded-md flex flex-col space-y-3" 
    onSubmit={handleLogin}
   >
    <div>
     <h1 className="text-3xl font-bold mb-1.5 tracking-[0.4px]">Sign In</h1>
     <p className="text-gray-600">
      Sign In to meet the new people around the world
     </p>
    </div>
    <input
     className={input}
     placeholder="Username or Email"
     value={user}
     onChange={e => setUser(e.target.value)}
    />
    <div className="relative my-2">
     <input
      className={input}
      placeholder="Enter your Password"
      type={showPwd ? "text" : "password"}
      maxLength={30}
      value={password}
      onChange={e => setPassword(e.target.value)}
     />
     <div 
      className="absolute right-0 top-0 h-full w-10 z-20 grid place-items-center cursor-pointer rounded-md"
      onClick={() => setShowPwd(prev => !prev)}
     >
      {!showPwd ? <AiFillEye color="#888" size={20} /> : <AiFillEyeInvisible color="#888" size={20} />}
     </div>
    </div>
    <p className="underline text-right text-gray-500 text-xs cursor-pointer">
     <Link to={"/account-recovery"}>Forgot Password?</Link>
    </p>
    {error && <p className="text-red-500 font-medium px-1 text-[13px] -my-2">{error}</p>}
    <Button title="Sign In">{loading && <Loader />}</Button>
    <p className="my-3 text-center text-[13px] text-gray-500 flex gap-1 justify-center items-center">
     Don't have an Account? 
     <Link to={"/register"} className="underline text-black font-medium">Register</Link>
    </p>
   </form>
  </main>
 );
};

export default Login;