import style from './Profile.module.css'
import UserInfo from "../../components/user-info/UserInfo";
import { FC } from 'react';
import ProfileSidebar from '../../components/profile-sidebar/ProfileSidebar';


const Profile: FC = () => { 
   return (
      <div className={style.wrapper}>
         <ProfileSidebar/>
         <UserInfo />
      </div>
   )
}

export default Profile;