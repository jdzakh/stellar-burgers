import React, { FC, useRef, useState } from "react";
import style from './Registration.module.css'
import { Input, Button, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useNavigate } from "react-router-dom";
import { registration } from "../../services/actions/user";
import { useAppDispatch } from "../../hook/hook";

const Registration: FC = () => {
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const [name, setName] = useState('')

   const inputRef = useRef<HTMLInputElement>(null)

   const dispatch = useAppDispatch()
   const navigate = useNavigate()

   const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value)
   }

   const sendData: React.FormEventHandler<HTMLFormElement> = (e) => {
      e.preventDefault();

      if (!name || !email || !password) {
         return;
      }

      dispatch(registration(email, name, password));
      navigate('/');
   }

   return (
      <>
         <form onSubmit={sendData} className={`${style.content} mt-30`}>
            <p className="text text_type_main-medium mb-6">
               Регистрация
            </p>
            <div className="mb-6">
               <Input
                  type={'text'}
                  placeholder={'Имя'}
                  onChange={e => setName(e.target.value)}
                  icon={undefined}
                  value={name}
                  name={'name'}
                  error={false}
                  ref={inputRef}
                  errorText={'Ошибка'}
                  size={'default'}
               />
            </div>
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
               Зарегистрироваться
            </Button>
         </form>

         <div className={`${style.edit} mt-15`}>
            <p className="text text_type_main-default text_color_inactive">
               Уже зарегистрированы?
               <Link className={style.link} to="/login">
                  Войти
               </Link>
            </p>
         </div>

      </>
   )
}

export default Registration;