import React, { FC, useRef, useState } from "react";
import style from './ForgotPassword.module.css'
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useNavigate } from "react-router-dom";
import { forgotPassword } from "../../services/actions/user";
import { useAppDispatch } from "../../hook/hook";


const ForgotPassword: FC = () => {
   const [email, setEmail] = useState('')
   const inputRef = useRef<HTMLInputElement>(null)

   const dispatch = useAppDispatch();
   const navigate = useNavigate();

   
   const sendData: React.FormEventHandler<HTMLFormElement> = (e) => {
      e.preventDefault();

      if (!email) {
         return;
      }

      dispatch(forgotPassword(email));
      setEmail("");
      navigate("/reset-password");
   }

   return (
      <>
         <form onSubmit={sendData} className={`${style.form} mt-30 mb-20`}>
            <p className="text text_type_main-medium mb-6">
               Востановление пароля
            </p>

            <div className="mb-6">
               <Input
                  type={'email'}
                  placeholder={'Укажите e-mail'}
                  onChange={e => setEmail(e.target.value)}
                  icon={undefined}
                  value={email}
                  name={'Укажите e-mail'}
                  error={false}
                  ref={inputRef}
                  
                  errorText={'Ошибка'}
                  size={'default'}
               />
            </div>

            <Button type="primary" size="medium">
               Востановить
            </Button>
         </form>

         <div className={`${style.edit} mt-10`}>
            <p className="text text_type_main-default text_color_inactive ">
               Вспомнили пароль?
               <Link className={style.link} to="/login">
                  Войти
               </Link>
            </p>
         </div>

      </>
   )
}

export default ForgotPassword;