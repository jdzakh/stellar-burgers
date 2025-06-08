import React, { FC, useMemo } from 'react';
import style from './BurgerConstructor.module.css';
import { ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/Modal';
import OrderDetails from '../order-details/OrderDetails';
import AddedIngredient from '../added-ingredient/AddedIngredient';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useDrop } from 'react-dnd';
import { useNavigate } from 'react-router-dom';
import { sendOrder } from '../../services/actions/sendOrder';
import { closeCreatedOrder } from '../../services/reducers/modal';
import { sortConstructorIngredients } from '../../services/reducers/ingredient';
import { IBurgerConstructorProps, IIngredient } from '../../utils/types';
import { useAppDispatch, useAppSelector } from '../../hook/hook';
import Loader from '../loader/Loader';

const BurgerConstructor: FC<IBurgerConstructorProps> = ({ onDropHandler }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { userInfo, token } = useAppSelector((state) => state.userSlice);
  const {
    constructorIngredients,
    createdOrder,
    orderRequest,
    orderFailed,
  } = useAppSelector((state) => state.ingredientSlice);
  const { modalCreatedOrderActive } = useAppSelector((state) => state.modalSlice);

  // Расчет суммы
  const sum = useMemo(
    () =>
      constructorIngredients.reduce(
        (acc, item) =>
          item.type === 'bun' ? acc + item.price * 2 : acc + item.price,
        0
      ),
    [constructorIngredients]
  );

  // Область для дропа ингредиентов
  const [{ isHover }, dropRef] = useDrop({
    accept: 'ingredient',
    drop: (item: IIngredient) => {
      onDropHandler(item);
    },
    collect: (monitor) => ({
      isHover: monitor.canDrop(),
    }),
  });

  const borderClass = isHover ? style.constructor_container_one : style.constructor_container_two;

  // Находим булку
  const bun = constructorIngredients.find((item) => item.type === 'bun');

  // Функция для получения свойств булки
  const bunHandler = (
    ingredients: IIngredient[],
    property: keyof IIngredient,
    trueValue: string,
    falseValue: string
  ) =>
    ingredients.find((ingredient) => ingredient.type === 'bun')?.[property] ?? falseValue;

  // Открытие модального окна заказа
  const openOrderDetails = () => {
    const ingredientsId = constructorIngredients.map((ingredient) => ingredient._id);
    if (userInfo) {
      dispatch(sendOrder(ingredientsId, token));
    } else {
      navigate('/login');
    }
  };

  // Закрытие модального окна
  const onClose = () => {
    dispatch(closeCreatedOrder());
  };

  // Перемещение ингредиентов
  const moveCard = (dragIndex: number, hoverIndex: number) => {
    const dragItem = constructorIngredients[dragIndex];
    const newIngredients = [...constructorIngredients];
    newIngredients.splice(dragIndex, 1);
    newIngredients.splice(hoverIndex, 0, dragItem);
    dispatch(sortConstructorIngredients(newIngredients));
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={`${borderClass} mt-25`} ref={dropRef}>
        {/* Верхняя булка */}
        {constructorIngredients.length > 0 && bun ? (
          <div className="ml-20">
            <ConstructorElement
              type="top"
              isLocked={true}
              text={bunHandler(constructorIngredients, 'name', '(верх)', 'Выберите булку')}
              price={+bunHandler(constructorIngredients, 'price', '', '0')}
              thumbnail={bunHandler(constructorIngredients, 'image', '', '')}
            />
          </div>
        ) : (
          <div className={`${style.bunTop} ml-20 mt-4 mb-4`}>
            <p className="text text_type_main-large">Добавьте булку</p>
          </div>
        )}

        {/* Ингредиенты */}
        <ul className={style.elements}>
          {constructorIngredients.map(
            (item, index) =>
              item.type !== 'bun' && (
                <AddedIngredient
                  key={item.uuid}
                  moveCard={moveCard}
                  index={index}
                  ingredient={item}
                  id={`${item._id}${index}`}
                />
              )
          )}
        </ul>

        {/* Нижняя булка */}
        {constructorIngredients.length > 0 && bun ? (
          <div className="ml-20">
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={bunHandler(constructorIngredients, 'name', '(низ)', 'Выберите булку')}
              price={+bunHandler(constructorIngredients, 'price', '', '0')}
              thumbnail={bunHandler(constructorIngredients, 'image', '', '')}
            />
          </div>
        ) : (
          <div className={`${style.bunBot} ml-20 mt-4 mb-4`}>
            <p className="text text_type_main-large">Добавьте булку</p>
          </div>
        )}

        {/* Итоговая цена и кнопка */}
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

      {/* Модальное окно с загрузкой */}
      {!modalCreatedOrderActive && orderRequest && !orderFailed && (
        <Modal onClick={onClose} title="">
          <div className="p-20 m-20">
            <Loader />
          </div>
        </Modal>
      )}

      {/* Модальное окно с заказом */}
      {modalCreatedOrderActive && !orderRequest && !orderFailed && createdOrder && (
        <Modal onClick={onClose} title="">
          <OrderDetails />
        </Modal>
      )}
    </DndProvider>
  );
};

export default BurgerConstructor;