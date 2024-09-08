import {useState, useEffect} from "react";
import type {ChangeEvent, FormEvent} from "react";
import {useNavigate, type NavigateFunction, Link, useLocation} from "react-router-dom";
import {input} from "./Login";
import {useAppDispatch} from "../hooks/redux";
import {AiFillEye, AiFillEyeInvisible} from "react-icons/ai";
import useMutationAPI from "../hooks/useMutationAPI";
import Loader from "../components/_common/Loader";
import Button from "../components/UI/Button";
import {showAlert} from "../redux/utilsSlice";

const ResetPassword = () => {
 const [user,setUser] = useState({
  code: "",
  password: "",
  confirmPassword: "",
 });
 const [error,setError] = useState<string>("");
 const [showPassword, setShowPassword] = useState(false);
 const [showConfirmPassword, setShowConfirmPassword] = useState(false);

 const {state} = useLocation();
 const dispatch = useAppDispatch();
 const navigate: NavigateFunction = useNavigate();

 const {mutator, loading} = useMutationAPI({
  endpoint: "/auth/resetpassword",
  method: "put",
  clearError: 5000,
  onError: (error) => setError(error),
  onSuccess: ({success}) => {
   if(success) {
    dispatch(showAlert({
     message: "Your password was updated successfully",
     type: "success",
     timeout: 5000
    }));

    setTimeout(() => navigate("/login"), 2000);
   };
  } 
 });

 const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
  setUser((p) => ({...p, [e.target.name]: e.target.value}));
 };

 useEffect(() => {
  if(!state.token || !state.code) return navigate("/account-recovery");

  dispatch(showAlert({
   message: "We have sent a code to your Email valid for 10 minutes",
   type: "success",
   timeout: 12000
  }));

  document.title = "Reset Password";
 },[]);

 useEffect(() => {
  if(error) setTimeout(() => setError(""),5000);
 },[error]);

 const handleRegister = async (event: FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  if(loading) return;

  const {code, password, confirmPassword} = user;

  let Code = code.trim();
  let Password = password.trim();
  let ConfirmPassword = confirmPassword.trim();

  if(!Code || !Password || !ConfirmPassword) return setError("All fields are necessary");
  if(Code.length !== 6) return setError("Code must contain 6 characters");
  if(Code !== state.code) return setError("Invalid code");
  if(Password.includes(" ")) return setError("Username must not include ' ' characters");
  if(Password.length < 8) return setError("Password must be atleast 8 characters");
  if(Password !== ConfirmPassword) return setError("Passwords don't match with each other");

  await mutator({token: state.token,code: Code,password: Password});
 };

 return (
  <main className="h-screen w-full grid place-items-center bg-white">
   <form onSubmit={handleRegister}
    className="w-[90%] max-w-80 bg-white shadow-xl p-4 rounded-md flex-col space-y-3">
    <div>
     <h1 className="text-2xl font-extrabold mb-1.5 tracking-[0.4px]">
      Password Recovery  
     </h1>
     <p className="text-gray-600 text-sm">
      Enter code and new password for your Account
     </p>
    </div>
    <input
     className={input}
     placeholder="Enter Code"
     name="code"
     onChange={handleChange}
    />
    <div className="relative my-2">
     <input
      className={input}
      placeholder="Enter New Password"
      type={showPassword ? "text" : "password"}
      maxLength={30}
      value={user.password}
      name="password"
      onChange={handleChange}
     />
     <div 
      className="absolute right-0 top-0 h-full w-10 z-20 grid place-items-center cursor-pointer rounded-md"
      onClick={() => setShowPassword(prev => !prev)}
     >
      {!showPassword ? <AiFillEye color="#888" size={20} /> : <AiFillEyeInvisible color="#888" size={20} />}
     </div>
    </div>
    <div className="relative my-2">
     <input
      className={input}
      placeholder="Confirm New Password"
      type={showConfirmPassword ? "text" : "password"}
      maxLength={30}
      value={user.confirmPassword}
      name="confirmPassword"
      onChange={handleChange}
     />
     <div 
      className="absolute right-0 top-0 h-full w-10 z-20 grid place-items-center cursor-pointer rounded-md"
      onClick={() => setShowConfirmPassword(prev => !prev)}
     >
      {!showConfirmPassword ? <AiFillEye color="#888" size={20} /> : <AiFillEyeInvisible color="#888" size={20} />}
     </div>
    </div>
    {error && <p className="text-red-500 font-medium px-1 text-xs my-1">{error}</p>}
    <Button title="Create Account">{loading && <Loader />}</Button>
    <p className="my-3 text-center text-[13px] text-gray-500 flex gap-1 justify-center items-center">
     Already have an Account? 
     <Link to={"/login"} className="underline text-black font-semibold">Login</Link>
    </p>
   </form>
  </main>
 );
};

export default ResetPassword;