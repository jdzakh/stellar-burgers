import React, { FC, useEffect } from "react";
import ReactDOM from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './Modal.module.css';
import ModalOverlay from '../modal-overlay/ModalOverlay';
import { IModalProps } from "../../utils/types";

const modalRoot: HTMLElement = document.getElementById("modals") as HTMLElement;

const Modal: FC<IModalProps> = ({ title, children, onClick }) => {

   useEffect(
      () => {
         const pressEcs = (e: KeyboardEvent) => {
            e.key === 'Escape' && onClick()
         };

         document.addEventListener('keydown', pressEcs);
         return () => {
            document.removeEventListener('keydown', pressEcs)
         }
      }, [onClick])

   return ReactDOM.createPortal(
      <>
         <div className={`${style.modal} p-10`}>
            <div className={style.heder} >
               <p className="text text_type_main-large">
                  {title}
               </p>
               <button className={style.button} onClick={onClick}>
                  <CloseIcon type="primary" />
               </button>
            </div>
            <div className={style.content}>
               {children}
            </div>
         </div>

         <ModalOverlay onClick={onClick} />
      </>,
      modalRoot
   );
}

export default Modal;
