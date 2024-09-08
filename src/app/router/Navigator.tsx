import {lazy,Suspense} from "react";
import {createBrowserRouter,Navigate,RouterProvider} from "react-router-dom";
import PageLoader from "../components/_common/PageLoader";
import {useAppSelector} from "../hooks/redux";
import NotFound from "../pages/NotFound";
const ResetPassword = lazy(() => import("../pages/ResetPassword"));
const RegisterConfirm = lazy(() => import("../pages/RegisterConfirm"));
const ForgotPassword = lazy(() => import("../pages/ForgotPassword"));
const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));
const Main = lazy(() => import("../pages/Main"));
const ErrorBoundary = lazy(() => import("../components/HOC/ErrorBoundary"));

const Navigator = () => {
 const {isAuth} = useAppSelector(state => state.user);

 const router = createBrowserRouter([
  {
   path: "/*",
   element: isAuth ? <Main /> : <Navigate to="/login" replace />,
   errorElement: <ErrorBoundary />,
  },
  {
   path: "/register",
   element: !isAuth ? <Register /> : <Navigate to="/" replace />,
   errorElement: <ErrorBoundary />,
  },
  {
    path: "/register-confirm",
    element: !isAuth ? <RegisterConfirm /> : <Navigate to="/" replace />,
    errorElement: <ErrorBoundary />,
   },
  {
   path: "/login",
   element: !isAuth ? <Login /> : <Navigate to="/" replace />,
   errorElement: <ErrorBoundary />,
  },
  {
   path: "/account-recovery",
   element: !isAuth ? <ForgotPassword /> : <Navigate to="/" replace />,
   errorElement: <ErrorBoundary />,
  },
  {
   path: "/reset-password",
   element: !isAuth ? <ResetPassword /> : <Navigate to="/" replace />,
   errorElement: <ErrorBoundary />,
  },
  {
   path: "*",
   element: <NotFound />,
  },
 ]);

 return (
  <Suspense fallback={<PageLoader />}>
   <RouterProvider router={router} />
  </Suspense>
 );
};

export default Navigator;