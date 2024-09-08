import {useEffect, type CSSProperties} from "react";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {IoIosWarning} from "react-icons/io";
import {FaCircleCheck} from "react-icons/fa6";
import {IoIosInformationCircle} from "react-icons/io";
import {closeAlert} from "../../redux/utilsSlice";

const Alert = () => {
 const {showAlert, alert: {message, type, timeout}} = useAppSelector(state => state.utils);
 const dispatch = useAppDispatch();

 const colors = {
  success: "#3B82F6",
  warning: "#FFA900",
  error: "#E02802"
 };

 useEffect(() => {
  if(!showAlert) return;

  const timer = setTimeout(() => dispatch(closeAlert()), timeout);
  return () => clearTimeout(timer);
 }, [showAlert]);

 const styles: CSSProperties = {
  position: "fixed",
  top: "20px",
  background: colors[type],
  left: "50%",
  width: "90%",
  maxWidth: "320px",
  transition: "all 0.3s ease-in-out",
  transform: `translateX(-50%) scale(${showAlert ? 1 : 0})`,
  color: "#fff",
  padding: "14px 20px",
  borderRadius: "4px",
  zIndex: 999999999999,
  display: "flex",
  alignItems: "center",
  gap: "12px",
  fontSize: "14px",
  fontWeight: "500",
  boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)"
 };

 return (
  <p style={styles}>
   {type === "error" && <IoIosWarning size={20} />}
   {type === "success" && <FaCircleCheck size={20} />}
   {type === "warning" && <IoIosInformationCircle size={20} />}
   {message}
  </p>
 );
};

export default Alert;