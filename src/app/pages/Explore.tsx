import {useState,useEffect,useRef} from "react";
import ExplorePosts from "../components/explore/ExplorePosts";
import Loader from "../components/_common/Loader";
import {API} from "../lib/API";
import {Fragment} from "react";
import {useAppDispatch} from "../hooks/redux";
import {showAlert} from "../redux/utilsSlice";

const Explore = () => {
 const [skip, setSkip] = useState<number>(0);
 const [posts, setPosts] = useState<any[]>([]);
 const [loading, setLoading] = useState<boolean>(false);

 const dispatch = useAppDispatch();

 const postRef = useRef<HTMLDivElement>(null);

 useEffect(() => {
  document.title = `Explore posts from people`;
 },[]);

 useEffect(() => {
  const get_posts = async () => {
   try {
    const res = await API.get(`/post/exploreposts?skip=${skip}`);
    if(res.data.length > 0) setSkip(prev => prev + 20);
    setPosts([...posts,...res.data]);
   } catch(error: any) {
    const message = error?.response?.data?.message || error?.message;
    dispatch(showAlert({
     message,
     type: "error"   
    }));
   }
  };

  get_posts();
 },[]);

 useEffect(() => {
  const get_posts = async () => {
   if(window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || loading) return;

   setLoading(true);

   try {
    const res = await API.get(`/post/exploreposts?skip=${skip}`);
    if(res.data.length > 0) setSkip(prev => prev + 20);
    setPosts([...posts,...res.data]);
   } catch(error: any) {
    const message = error?.response?.data?.message || error?.message;
    dispatch(showAlert({
     message,
     type: "error"   
    }));;
   } finally {
    setLoading(false);
   };
  };

  window.addEventListener("scroll",get_posts);

  return () => {
   window.removeEventListener("scroll",get_posts)
  };
 },[]);

 return (
  <Fragment>
   <div className="flex flex-1 dark:bg-[#191919]" ref={postRef}>
    <ExplorePosts photos={posts} />
   </div>
   {loading && <Loader size={20} color="darkblue" />}
  </Fragment>
 );
};

export default Explore;