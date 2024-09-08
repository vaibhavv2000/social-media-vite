import type {ButtonHTMLAttributes, ReactNode} from "react";

interface props extends ButtonHTMLAttributes<HTMLButtonElement> {
 children?: ReactNode;
 title: string;
};

const Button = ({children, title, ...other}: props) => {
 return (
  <button className="text-white bg-primary w-full p-2.5 font-semibold border-none outline-none cursor-pointer rounded-sm mt-1 text-[14px] !text-center" {...other}>
   {children}
   <span className="ml-2">{title}</span>
  </button>
 );
};

export default Button;