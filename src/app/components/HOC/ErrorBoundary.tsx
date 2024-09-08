import {Component,type ReactNode} from "react";
import {useAppSelector} from "../../hooks/redux";
import {NavigateFunction, useNavigate} from "react-router-dom";

interface props {
  children?: ReactNode;
};

interface state {
  error: boolean;
};

export class ErrorBoundary extends Component<props,state> {
 constructor(props: props) {
  super(props);

  this.state = {
   error: false,
  };
 };

 static getDerivedStateFromError() {
  return {error: true};
 };

 render() {
  return (
   <div className="h-screen w-full bg-gray-50 dark:bg-black grid place-items-center">  
    <div className="flex flex-col space-y-4">
     <h1 className="text-black dark:text-white text-4xl md:text-6xl font-semibold md:font-black text-center">
      Something Went Wrong
     </h1>
     <Button />
    </div>
   </div>
  );
 }
};

export default ErrorBoundary;

const Button = () => {
 const {isAuth} = useAppSelector(state => state.user);
 const navigate: NavigateFunction = useNavigate();

 return (
  <button className="bg-primary text-white max-w-max p-2.5 px-6 shadow-sm hover:shadow-xl font-medium mx-auto" onClick={() => navigate(isAuth ? "/" : "/login")}>
   Go Home
  </button> 
 );
};