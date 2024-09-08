import {useState} from "react";
import {AiFillAudio} from "react-icons/ai";
import {HiOutlineXMark} from "react-icons/hi2";
import {BsFillEmojiHeartEyesFill,BsFillCameraVideoFill,BsImageFill} from "react-icons/bs";
import {addImage,editStatus,toggleUpload,updatePost,addPost} from "../../redux/postSlice";
import {API} from "../../lib/API";
import {gql} from "@apollo/client";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import uuid from "../../utils/uuid";
import {showAlert} from "../../redux/utilsSlice";
import {post} from "../../utils/types";
import AccountImage from "../../assests/images/account.jpg";

let opt = "flex justify-evenly items-center border border-gray-400 dark:border-white/80 rounded-2xl p-1.5 px-2 cursor-pointer space-x-1.5 hover:bg-primary hover:text-white";

const ADD_POST = gql`
 mutation AddPost($status: String, $photo: String) {
  add_post(status: $status, photo: $photo) {
   post
  }
 }
`;

const EDIT_POST = gql`
 mutation EditPost($postId: ID!, $status: String, $photo: String) {
  edit_post(postId: $postId, status: $status, photo: $photo) {
   msg
  }
 }
`;

const Upload = () => {
 const [file,setFile] = useState<null | Blob>();

 const {edit} = useAppSelector(state => state.post);
 const {isEditing,image,status,postId} = edit;
 const {user} = useAppSelector(state => state.user);
 const dispatch = useAppDispatch();

 const handleUpload = async () => { 
  if(!status && !file) {
   return dispatch(showAlert({message: "Both fields can't be empty", type: "error"}));
  };

  try {
   if(!isEditing) {
    const post = {} as post;
    if(status) post.status = status;

    if(file) {
     let data = new FormData();
     const filename = `${uuid(40)}.jpg`;
     data.append("name",filename);
     data.append("file",file);
     post.photo = filename;
     await API.post("/upload",data);
    };

    const res = await API.post("/post/addpost",post);

    dispatch(showAlert({message: "Post uploaded successfully", type: "success"}));
    dispatch(editStatus(""));
    dispatch(addImage(""));

    const newPost = {
     id: res.data.id,
     userId: user.id,
     status,
     name: user.name,
     username: user.username,
     likes: 0,
     comments: 0,
     bookmarks: 0,
     createdAt: res.data.createdAt,
     isLiked: false,
     profile: user?.profile,
    } as post;

    if(post.photo) newPost.photo = post.photo;
    dispatch(addPost(newPost));
   } else {
    const post = {postId} as Partial<post>;
    if(status) post.status = status;

    if(file) {
     let data = new FormData();
     const filename = `${uuid(40)}.jpg`;
     data.append("name",filename);
     data.append("file",file);
     post.photo = filename;

     await API.post("/upload",data);
    } else {
     if(image) post.photo = image;
    };

    await API.put("/post/editpost",post);

    dispatch(showAlert({message: "Post Upload Successfully", type: "success"}));
    dispatch(editStatus(""));
    dispatch(addImage(""));

    dispatch(updatePost({image: post.photo,status,id: postId}));
   }
  } catch(error: any) {
   let message = error?.response?.data?.message || error?.message;
   dispatch(showAlert({message, type: "error"}));
  };
 };

 return (
  <div className={`grid fixed h-screen w-full bg-[rgba(0,0,0,0.6)] place-items-center z-[99999] dark:bg-[rgba(0,0,0,0.444)]`}>
   <div className="dark:bg-black rounded-lg p-4 bg-white shadow-xl w-full max-w-[360px]">
    {/* top */}
    <div className="flex items-center justify-between p-2">
     <img
      src={user.profile || AccountImage}
      alt={user.username}
      className="h-8 w-8 rounded-full object-cover"
     />
     <p className="text-lg sm:text-xl md:text-2xl font-semibold dark:text-white">
      {isEditing ? "Edit Post" : "Post Something"}
     </p>
     <span
      className="dark:text-white cursor-pointer"
      onClick={() => dispatch(toggleUpload())}
     >
      <HiOutlineXMark size={24} />
     </span>
    </div>

    {/* middle */}
    <div className="p-2">
     <textarea
      className="border-b-2 border-slate-400 dark:border-primary hover:border-primary h-32 dark:text-white bg-transparent resize-none outline-none w-full p-2"
      placeholder="How are you feeling today?"
      value={status}
      onChange={e => dispatch(editStatus(e.target.value))}
     ></textarea>
    </div>

    <div className="flex justify-evenly px-2 pb-2 space-x-3 items-center">
     <div className={opt}>
      <span className="dark:text-white">
       <BsFillEmojiHeartEyesFill size={16} />
      </span>
      <span className="dark:text-white text-[12px] hidden sm:!inline">
       Emoji
      </span>
     </div>
     <div className={opt}>
      <span className="dark:text-white">
       <AiFillAudio size={16} />
      </span>
      <span className="dark:text-white text-[12px] hidden sm:!inline">
       Audio
      </span>
     </div>
     <div className={opt}>
      <span className="dark:text-white">
       <BsFillCameraVideoFill size={16} />
      </span>
      <span className="dark:text-white text-[12px] hidden sm:!inline">
       Video
      </span>
     </div>
     <input
      className="hidden"
      type="file"
      id="imgFile"
      onChange={(e) => e.target.files && setFile(e.target.files[0])}
      accept="images/*"
      multiple={false}
     />
     <label htmlFor="imgFile" className={opt}>
      <span className="dark:text-white">
        <BsImageFill size={16} />
      </span>
      <span className="dark:text-white text-[12px] hidden sm:!inline">
       Image
      </span>
     </label>
    </div>

    <div className="p-2">
     <button
      className="bg-[#194a98] duration-300 hover:opacity-75 w-full p-2.5 text-white font-medium text-[15px] rounded-full"
      onClick={handleUpload}>
      Post
     </button>
    </div>
    {/* end */}
   </div>
  </div>
 );
};

export default Upload;