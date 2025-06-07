import React, { FC, useEffect, useRef, useState } from "react";
import style from './Login.module.css'
import { Input, Button, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { login } from "../../services/actions/user";
import { useAppDispatch, useAppSelector } from "../../hook/hook";
import { LocationState } from "../../utils/types";


const Login: FC = () => {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   
   const { userInfo } = useAppSelector(state => state.userSlice);

   const inputRef = useRef<HTMLInputElement>(null);

   const dispatch = useAppDispatch();
   const navigate = useNavigate();
   const location = useLocation();
   
   const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value)
   }

   const sendData: React.FormEventHandler<HTMLFormElement> = (e) => {
      e.preventDefault();

      if (!email || !password) {
         return;
      }
      navigate(-1);
      dispatch(login(email, password));
   }

   useEffect(() => {
      if (userInfo) {
         (location.state && (location.state as LocationState)?.from) ? navigate((location.state as LocationState)?.from.pathname) : navigate('/');
      }
   }, [userInfo, navigate, location])

   return (
      <>
         <form onSubmit={sendData} className={`${style.content} mt-30`}>
            <p className="text text_type_main-medium mb-6">
               Вход
            </p>
            <div className="mb-6">
               <Input
                  type={'email'}
                  placeholder={'E-mail'}
                  onChange={e => setEmail(e.target.value)}
                  icon={undefined}
                  value={email}
                  name={'e-mail'}
                  error={false}
                  ref={inputRef}
                  errorText={'Ошибка'}
                  size={'default'}
               />
            </div>

            <div className="mb-6">
               <PasswordInput onChange={onChange} value={password} name={'password'} />
            </div>

            <Button type="primary" size="medium">
               Войти
            </Button>
         </form>

         <div className={`${style.edit} mt-15`}>
            <p className="text text_type_main-default text_color_inactive">
               Вы — новый пользователь?
               <Link className={style.link} to="/register">
                  Зарегистрироваться
               </Link>
            </p>

            <p className="text text_type_main-default text_color_inactive">
               Забыли пароль?
               <Link className={style.link} to="/forgot-password">
                  Восстановить пароль
               </Link>
            </p>
         </div>

      </>
   )
}

export default Login;