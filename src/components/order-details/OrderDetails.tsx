import React, { FC } from "react";
import style from './OrderDetails.module.css';
import img from '../../images/done.gif';
import { useAppSelector } from "../../hook/hook";


const OrderDetails: FC = () => {
   const { createdOrder } = useAppSelector(state => state.ingredientSlice);

   return (
      <div className={`${style.modal}`}>
         <p className="text text_type_digits-large mb-8">{createdOrder && createdOrder.order.number}</p>

         <p className="text text_type_main-default">
            Индификатор заказа
         </p>

         <img src={img} alt="" className={`${style.img} m-15`} />

         <p className="text text_type_main-default mb-2">
            Ваш заказ начали готовить
         </p>

         <p className={`${style.text} text text_type_main-default mb-30`}>
            Дождитесь готовности на орбитальной станции
         </p>
      </div>
   )
}



export default OrderDetails;