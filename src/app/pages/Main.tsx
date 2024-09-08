import {lazy, Suspense} from "react";
import {Route, Routes} from "react-router-dom";
import Navbar from "../components/_common/Navbar";
import Sidebar from "../components/_common/Sidebar";
import BottomNav from "../components/_common/BottomNav";
import PageLoader from "../components/_common/PageLoader";
import {useAppSelector} from "../hooks/redux";
import Upload from "../components/_common/Upload";

const Home = lazy(() => import("../pages/Home"));
const Search = lazy(() => import("../pages/Search"));
const Explore = lazy(() => import("../pages/Explore"));
const Profile = lazy(() => import("../pages/Profile"));
const SinglePost = lazy(() => import("../pages/SinglePost"));
const Settings = lazy(() => import("../pages/Settings"));
const Bookmarks = lazy(() => import("../pages/Bookmarks"));

const Main = () => {
 const {showUpload} = useAppSelector(state => state.post);
    
 return ( 
  <main className="min-h-screen flex flex-col dark:bg-dark_2">
    {showUpload && <Upload />}
   <Navbar />
   <section className="flex pb-20 w-full flex-1 md:pb-0 max-w-[1440px] mx-auto">
    <Sidebar />
    <Suspense fallback={<PageLoader />}>
     <Routes>
      <Route path="/" Component={Home} />
      <Route path="/search" Component={Search} />
      <Route path="/explore" Component={Explore} />
      <Route path="/profile/:username" Component={Profile} />
      <Route path="/singlepost" Component={SinglePost} />
      <Route path="/bookmarks" Component={Bookmarks} />
      <Route path="/settings/*" Component={Settings} />
     </Routes>   
    </Suspense>
   </section>
   <BottomNav />
  </main>
 );
};

export default Main;