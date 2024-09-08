import {useState, useEffect, type FormEvent} from "react";
import {useNavigate, type NavigateFunction} from "react-router-dom";
import Loader from "../components/_common/Loader";
import Button from "../components/UI/Button";
import {validateEmail} from "../utils/emailValidator";
import {input} from "./Login";
import useQueryAPI from "../hooks/useQueryAPI";

const ForgotPassword = () => {
 const [email, setEmail] = useState("");
 const [error, setError] = useState("");

 const navigate: NavigateFunction = useNavigate();

 useEffect(() => {
  if(error) setTimeout(() => setError(""),5000);
 },[error]);

 useEffect(() => {
  document.title = "Account Recovery";
 }, []);

 const {loading, fetcher} = useQueryAPI({
  endpoint: `/auth/forgotpassword?email=${email}`,
  clearError: 5000,
  defaultFetch: false,
  onError: (error) => setError(error),
  onSuccess: (data)  => {
   if(data.token && data.code) navigate("/reset-password", {state: data});
  },
 });

 const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  if(loading) return;

  let Email = email.trim();
  if(!Email) return setError("Please enter your Email");
  if(!validateEmail(Email)) return setError("Email is Invalid");

  await fetcher();
 };

 return (
  <main className="h-screen w-full grid place-items-center bg-white">
   <form onSubmit={handleLogin}
    className="w-[90%] max-w-80 bg-white shadow-xl p-4 pt-6 rounded-md flex flex-col space-y-3">
    <div>
     <h1 className="text-2xl font-bold mb-1.5 tracking-[0.4px]">Account Recovery</h1>
     <p className="text-gray-600 text-sm">
      We will send you a code to your Email
     </p>
    </div>
    <input
     className={input}
     placeholder="Enter your Email"
     value={email}
     onChange={e => setEmail(e.target.value)}
    />
    {error && <p className="text-red-500 font-medium px-1 text-[13px] -my-2">{error}</p>}
    <Button title="Send Code">{loading && <Loader />}</Button>
   </form>
  </main>
 );
};

export default ForgotPassword;