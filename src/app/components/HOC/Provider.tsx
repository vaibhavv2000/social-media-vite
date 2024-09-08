import {Fragment, type ReactNode, useEffect, useLayoutEffect} from 'react'
import {useAppDispatch} from '../../hooks/redux';
import {API} from '../../lib/API';
import {login, updateDarkMode} from '../../redux/userSlice';
import Alert from '../_common/Alert';

interface props {
 children: ReactNode;
};

const Provider = ({children}: props) => {
 const dispatch = useAppDispatch();

 useLayoutEffect(() => {
  const isDarkMode = localStorage.getItem("social-darkmode");
  if(isDarkMode) {
   const html = document.querySelector("html") as HTMLElement;
   html.classList.add("dark");
   dispatch(updateDarkMode(true));
  };
 }, []);

 useEffect(() => {
  const checkAuth = async () => {
   const user = localStorage.getItem("social-auth");
   if(!user) return;
     
   try {
    const res = await API.get("/auth/checkauth");
    if(res.data.email) dispatch(login(res.data));
   } catch (error) {
    localStorage.removeItem("social-auth");
   };
  };

  checkAuth();
 }, []);

 return (
  <Fragment>
   <Alert />
   {children}
  </Fragment>  
 );
};

export default Provider;