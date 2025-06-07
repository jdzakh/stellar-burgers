import style from './ProfileSidebar.module.css'
import { NavLink, Outlet } from "react-router-dom";
import { logout } from '../../services/actions/user';
import { useAppDispatch } from '../../hook/hook';


const ProfileSidebar = () => {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    const refreshToken = localStorage.getItem('refreshToken');
    dispatch(logout(refreshToken))
  }

  return (
    <nav className={style.navigation}>
      <ul className={`${style.list}`}>
        <li className={style.list_item}>
          <Outlet />
          <NavLink
            className={({ isActive }) => isActive ? `${style.link_active} text text_type_main-medium` : `${style.link} text text_type_main-medium`} to='/profile/'
          >
            Профиль
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) => isActive ? `${style.link_active} text text_type_main-medium` : `${style.link} text text_type_main-medium`} to='/profile/orders'
          >
            История заказов
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) => isActive ? `${style.link_active} text text_type_main-medium` : `${style.link} text text_type_main-medium`} to="/login"
            onClick={handleLogout}
          >
            Выход
          </NavLink>
        </li>
      </ul>
      <p
        className={`${style.text} text text_type_main-default text_color_inactive`}
      >
        В этом разделе вы можете изменить свои персональные данные
      </p>
    </nav>
  );
};

export default ProfileSidebar;
