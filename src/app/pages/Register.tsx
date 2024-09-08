import {useState, useEffect} from "react";
import type {ChangeEvent, FormEvent} from "react";
import {useNavigate,NavigateFunction, Link} from "react-router-dom";
import {input} from "./Login";
import {validateEmail} from "../utils/emailValidator";
import useMutationAPI from "../hooks/useMutationAPI";
import Button from "../components/UI/Button";
import Loader from "../components/_common/Loader";

const Register = () => {
 const [user,setUser] = useState({
  name: "",
  username: "",
  email: "",
 });
 const [error,setError] = useState<string>("");

 const navigate: NavigateFunction = useNavigate();

 const {loading, mutator} = useMutationAPI({
  endpoint: "/auth/register",
  clearError: 5000,
  onError: (error) => setError(error),
  onSuccess: ({token}) => token && navigate("/register-confirm", {state: {token}}),
 });
  
 useEffect(() => {
  if(error) setTimeout(() => setError(""), 5000);
 },[error]);

 useEffect(() => {
  document.title = "Register";  
 }, []);

 const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
  setUser(prev => ({...prev, [e.target.name]: e.target.value}));
 };

 const handleRegister = async (event: FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  if(loading) return;

  const {name, username, email} = user;
  let Name = name.trim();
  let userName = username.trim();
  let mail = email.trim();

  if(!Name || !userName || !mail) return setError("All fields are necessary");
  if(userName.length < 3) return setError("Username must have atleast 3 characters");
  if(userName.includes(" ")) return setError("Username must not include ' ' characters");
  if(!validateEmail(mail)) return setError("Email is Invalid");

  await mutator({name: Name, username: userName, email: mail});
 };

 return (
  <main className="h-screen w-full grid place-items-center bg-white">
   <form onSubmit={handleRegister}
    className="w-[90%] max-w-80 bg-white shadow-xl p-4 rounded-md flex-col space-y-3"  
   >
    <div>
     <h1 className="text-3xl font-bold mb-1.5 tracking-[0.4px]">Register</h1>
     <p className="text-gray-600">
      Sign In to meet the new people around the world
     </p>
    </div>
    <input
     className={input}
     placeholder="Name"
     name="name"
     onChange={handleChange}
    />
    <input
     className={input}
     placeholder="Username"
     name="username"
     onChange={handleChange}
    />
    <input
     className={input}
     placeholder="Email"
     name="email"
     onChange={handleChange}
    />
    {error && <p className="text-red-500 font-medium px-1 text-xs my-1">{error}</p>}
    <Button title="Sign Up">{loading && <Loader />}</Button>
    <p className="my-3 text-center text-[13px] text-gray-500 flex gap-1 justify-center items-center">
     Already have an Account? 
     <Link to={"/login"} className="underline text-black font-semibold">Login</Link>
    </p>
   </form>
  </main>
 );
};

export default Register;