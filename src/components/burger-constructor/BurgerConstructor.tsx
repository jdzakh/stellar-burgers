import React, { FC, useMemo } from 'react';
import style from './BurgerConstructor.module.css';
import { ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/Modal';
import OrderDetails from '../order-details/OrderDetails';
import AddedIngredient from '../added-ingredient/AddedIngredient';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useDrop } from "react-dnd";
import { useNavigate } from "react-router-dom";
import { sendOrder } from '../../services/actions/sendOrder';
import { closeCreatedOrder } from '../../services/reducers/modal';
import { sortConstructorIngredients } from '../../services/reducers/ingredient';
import { IBurgerConstructorProps, IIngredient } from '../../utils/types';
import { useAppDispatch, useAppSelector } from '../../hook/hook';
import Loader from '../loader/Loader';

const BurgerConstructor: FC<IBurgerConstructorProps> = ({ onDropHandler }) => {
   const { userInfo } = useAppSelector(state => state.userSlice)
   const { constructorIngredients, createdOrder, orderRequest, orderFailed } = useAppSelector(state => state.ingredientSlice)
   const { modalCreatedOrderActive } = useAppSelector(state => state.modalSlice)
   const { token } = useAppSelector(state => state.userSlice)
   const dispatch = useAppDispatch()
   const navigate = useNavigate();

   const sum = useMemo(() =>
      constructorIngredients.reduce((acc, cur) => cur.type === 'bun' ? acc + (cur.price * 2) : acc + cur.price, 0)
      , [constructorIngredients])

   const [{ isHover }, dropRef] = useDrop({
      accept: 'ingredient',
      drop(item: IIngredient) {
         onDropHandler(item);
      },
      collect: (monitor) => ({
         isHover: monitor.canDrop(),
      }),
   });

   const colorBorder = isHover ? style.constructor_container_one : style.constructor_container_two;

   const bun = constructorIngredients.find((item) => item.type === 'bun');

   const bunHandler = (constructorIngredients: IIngredient[], property: string, trueValue: string, falseValue: string) => constructorIngredients.find(ingredient => ingredient.type === 'bun')
      // @ts-ignore
      ? `${(constructorIngredients.find(ingredient => ingredient.type === 'bun'))[property]} ${trueValue}`
      : falseValue
   
   const openOrderDetails = () => {
      const ingredientsId = constructorIngredients.map((ingredient) => ingredient._id)
      if (userInfo) {
         dispatch(sendOrder(ingredientsId, token))
      } else {
         navigate('/login')
      }
   }

   const onClose = () => {
      dispatch(closeCreatedOrder());
   }

   const moveCard = (dragIndex: number, hoverIndex: number) => {
      const dragCard = constructorIngredients[dragIndex];
      const newConstructorIngredients = [...constructorIngredients];
      newConstructorIngredients.splice(dragIndex, 1);
      newConstructorIngredients.splice(hoverIndex, 0, dragCard);
      dispatch(sortConstructorIngredients(newConstructorIngredients));
   }

   return (
      <DndProvider backend={HTML5Backend}>
         <div className={`${colorBorder} mt-25`} ref={dropRef}>
            {(constructorIngredients.length > 0 && bun)
               ? <div className='ml-20'>
                  <ConstructorElement
                     type="top"
                     isLocked={true}
                     text={bunHandler(constructorIngredients, 'name', '(верх)', 'Выберите булку')}
                     price={+bunHandler(constructorIngredients, 'price', '', '0')}
                     thumbnail={bunHandler(constructorIngredients, 'image', '', '')}
                  />
               </div>
               : <div className={`${style.bunTop} ml-20 mt-4 mb-4`}>
                  <p className="text text_type_main-large">
                     Добавте булку
                  </p>
               </div>
            }

            <ul className={`${style.elements}`}>
               {constructorIngredients.map((item, index) =>
                  item.type !== 'bun' && <AddedIngredient key={item.uuid} moveCard={moveCard} index={index} ingredient={item} id={`${item._id}${index}`} />
               )}
            </ul>

            {(constructorIngredients.length > 0 && bun)
               ? <div className='ml-20'>
                  <ConstructorElement
                     type="bottom"
                     isLocked={true}
                     text={bunHandler(constructorIngredients, 'name', '(низ)', 'Выберите булку')}
                     price={+bunHandler(constructorIngredients, 'price', '', '0')}
                     thumbnail={bunHandler(constructorIngredients, 'image', '', '')}
                  />
               </div>
               : <div className={`${style.bunBot} ml-20 mt-4 mb-4`}>
                  <p className="text text_type_main-large">
                     Добавте булку
                  </p>
               </div>
            }

            <div className={`${style.info} mt-10 mr-4`}>
               <div className={`${style.price} mr-10`}>
                  <p className="text text_type_digits-medium m-2">{sum}</p>
                  <CurrencyIcon type="primary" />
               </div>
               <div onClick={openOrderDetails}>
                  <Button type="primary" size="medium">
                     Оформить заказ
                  </Button>
               </div>
            </div>
         </div>
         {!modalCreatedOrderActive && orderRequest && !orderFailed &&
            (<Modal onClick={onClose} title=''>
               <div className='p-20 m-20'>
                  <Loader />
               </div>
            </Modal >)
         }

         {modalCreatedOrderActive && !orderRequest && !orderFailed && createdOrder &&
            (<Modal onClick={onClose} title=''>
               <OrderDetails />
            </Modal >)
         }
      </DndProvider>
   )
}

export default BurgerConstructor;