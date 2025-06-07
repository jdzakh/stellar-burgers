import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './Ingredient.module.css';
import { useDrag } from "react-dnd";
import { IIngredient, IIngredientProps } from '../../utils/types';
import { openIngredientDetails } from '../../services/reducers/modal';
import { FC, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hook/hook';
import { Link, useLocation } from 'react-router-dom';


const Ingredient: FC<IIngredientProps> = ({ ingredient }) => {
   const { image, price, name, _id, type } = ingredient;

   const { constructorIngredients, ingredients } = useAppSelector(state => state.ingredientSlice);
   const dispatch = useAppDispatch();
   const location = useLocation();
   const [isDisabled, setIsDisabled] = useState(true);

   const onClick = (elem: IIngredient | null) => {
      dispatch(openIngredientDetails(elem))
   }

   const [{ isDrag }, dragRef] = useDrag({
      type: "ingredient",
      item: { _id },
      collect: monitor => ({
         isDrag: monitor.isDragging(),
      })
   });

   let counter = 0;

   constructorIngredients.forEach((ingredient: IIngredient) => ingredient.name === name && (ingredient.type === 'bun' ? counter += 2 : counter += 1))

   useEffect(() => {
      if (type !== 'bun' && !constructorIngredients.some(ingredient => ingredient.type === 'bun')) {
         setIsDisabled(true)
      } else {
         setIsDisabled(false)
      }
   }, [constructorIngredients, type])

   return (
      <li
         className={`${style.item} ${isDrag && style.moving} ${type !== 'bun' ? isDisabled && style.item_disabled : ''}`}
         
         data-id={_id} ref={dragRef}
         onClick={() => onClick(ingredient)}
      >
         <Link className={style.link} to={{ pathname: `/ingredients/${_id}` }} state={{ background: location }}>
            {counter > 0 && <Counter count={counter} size="default" />}
            <img className={`${style.bun} ml-4 mr-4 mb-1`} src={image} alt="" />
            <div className={`${style.price} mb-1`}>
               <span className="text text_type_digits-default mr-2">{price}</span>
               <CurrencyIcon type="primary" />
            </div>
            <h3 className={`${style.name} text text_type_main-default`}>{name}</h3>
         </Link>
      </li>
   )
}

export default Ingredient;