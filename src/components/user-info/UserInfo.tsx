import { FC, useEffect, useRef, useState } from 'react';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './UserInfo.module.css';
import { sendUserData } from '../../services/actions/user';
import { useAppDispatch, useAppSelector } from '../../hook/hook';


const UserInfo: FC = () => {
   const { token, userInfo } = useAppSelector(state => state.userSlice);
   const dispatch = useAppDispatch();

   const [name, setName] = useState("");
   const [login, setLogin] = useState("");
   const [password, setPassword] = useState("");
   const [isDataChanged, setIsDataChanged] = useState(false);

   const nameRef = useRef<HTMLInputElement>(null);
   const emailRef = useRef<HTMLInputElement>(null);
   const passwordRef = useRef<HTMLInputElement>(null);

   const onNameClick = () => nameRef.current && nameRef.current.focus();
   const onEmailClick = () => emailRef.current && emailRef.current.focus();
   const onPasswordClick = () => passwordRef.current && passwordRef.current.focus();

   const onNameChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
      const value = evt.target.value;
      setName(value);
      value === (userInfo && userInfo.name) ? setIsDataChanged(false) : setIsDataChanged(true)
   }
   const onEmailChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
      const value = evt.target.value
      setLogin(value)
      value === (userInfo && userInfo.email) ? setIsDataChanged(false) : setIsDataChanged(true)
   }
   const onPasswordChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
      const value = evt.target.value
      setPassword(value)
      value === password ? setIsDataChanged(false) : setIsDataChanged(true)
   }

   const onSubmit: React.FormEventHandler<HTMLFormElement> = (evt) => {
      evt.preventDefault();
      dispatch(sendUserData(token, name, login, password))
      setIsDataChanged(false)
   }

   const onCancelEditing = (evt: React.SyntheticEvent<Element, Event>) => {
      evt.preventDefault();
      if (userInfo) {
         setName(userInfo.name)
         setLogin(userInfo.email)
         setPassword('')
         setIsDataChanged(false)
      }
   }

   useEffect(() => {
      if (userInfo) {
         setLogin(userInfo.email);
         setName(userInfo.name);
         setPassword('');
      }
   }, [userInfo]);

   return (
      <form onSubmit={onSubmit} className={style.form}>
         <div className="mb-6">
            <Input
               type={"text"}
               placeholder={"Имя"}
               onChange={onNameChange}
               icon={"EditIcon"}
               value={name}
               name={"name"}
               error={false}
               ref={nameRef}
               onIconClick={onNameClick}
               errorText={"Ошибка"}
               size={"default"}
            />
         </div>
         <div className="mb-6">
            <Input
               type={"email"}
               placeholder={"Логин"}
               onChange={onEmailChange}
               icon={"EditIcon"}
               value={login}
               name={"name"}
               error={false}
               ref={emailRef}
               onIconClick={onEmailClick}
               errorText={"Ошибка"}
               size={"default"}
            />
         </div>
         <div className="mb-6">
            <Input
               type={"password"}
               placeholder={"Пароль"}
               onChange={onPasswordChange}
               icon={"EditIcon"}
               value={password}
               name={"name"}
               error={false}
               ref={passwordRef}
               onIconClick={onPasswordClick}
               errorText={"Ошибка"}
               size={"default"}
            />
         </div>

         {
            isDataChanged &&
            (<div className={style.buttons}>
               <Button onClick={onCancelEditing} type="secondary" size="medium">
                  Отмена
               </Button>
               <Button type="primary" size="medium">
                  Сохранить
               </Button>
            </div>)
         }
      </form>
   )
}

export default UserInfo;