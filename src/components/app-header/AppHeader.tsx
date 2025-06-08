import React, { FC } from 'react';
import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './AppHeader.module.css';
import { NavLink, Link } from 'react-router-dom';

const AppHeader: FC = () => {
  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? style.link_active : style.link;

  return (
    <header className={`${style.header} text text_type_main-default`}>
      <nav className={`${style.content} p-4`}>
        {/* Навигация по разделам */}
        <div className={`${style.navigation} mr-30`}>
          <NavLink to='/' className={getLinkClass}>
            <BurgerIcon type='secondary' />
            <p className='m-2'>Конструктор</p>
          </NavLink>

          <NavLink to='feed' className={getLinkClass}>
            <ListIcon type='secondary' />
            <p className='m-2'>Лента заказов</p>
          </NavLink>
        </div>

        {/* Логотип */}
        <Link to='/' className={style.logo}>
          <Logo />
        </Link>

        {/* Личный кабинет */}
        <NavLink to='profile/' className={getLinkClass}>
          <ProfileIcon type='secondary' />
          <p className='m-2'>Личный кабинет</p>
        </NavLink>
      </nav>
    </header>
  );
};

export default AppHeader;