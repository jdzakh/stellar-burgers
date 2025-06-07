import React, { FC } from "react";
import style from './ModalOverlay.module.css';
import { IModalOverlayProps } from "../../utils/types";

const ModalOverlay: FC<IModalOverlayProps> = ({ onClick }) => {
   return (
      <div className={style.overlay} onClick={onClick}></div>
   )
}

export default ModalOverlay;