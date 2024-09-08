import {useParams} from 'react-router-dom';
import {useAppSelector} from '../../hooks/redux';
import Posts from './Posts';
import type {post} from '../../utils/types';

interface props {
 data: post[];
};

const ProfileBottom = ({data}: props) => {
 const {username} = useParams();
 const {user} = useAppSelector(state => state.user);

 return (
  <>
   <h1 className="dark:text-white font-extrabold text-3xl p-4">
    Posts by {username === user.username ? "you" : username}
   </h1>
   {data && <Posts data={data} />}
  </>
 );
};

export default ProfileBottom;