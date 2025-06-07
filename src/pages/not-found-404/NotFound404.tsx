import style from './NotFound404.module.css';
import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import pageNotFound from "../../images/404 Error-bro.png";

const NotFound404: FC = () => {
   return (
      <>
         <div className={style.container}>
            <div className={style.content}>
               <img className={style.img} alt="page not found" src={pageNotFound} />
               <br />
               <Link to='/' className='text text_type_main-medium mt-6'>На главную</Link>
            </div>
         </div>
      </>
   );
}

export default NotFound404;