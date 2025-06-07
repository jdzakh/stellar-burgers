import React, { FC } from "react";
import style from './IngredientDetails.module.css';
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../hook/hook";
import { IIngredient } from "../../utils/types";


const IngredientDetails: FC = () => {
   const { id } = useParams();
   const { actualIngredient } = useAppSelector(state => state.modalSlice);
   const { ingredients } = useAppSelector(state => state.ingredientSlice);
   const ingredientId = id ? ingredients.find((ingredient: IIngredient) => ingredient._id === id) : actualIngredient;

   return (
      <>
      {ingredientId && (<div className={style.modal}>
         <img alt={ingredientId.name}
            src={ingredientId && ingredientId.image} className={`${style.img} mb-4`} />

         <p className={`${style.name} text text_type_main-default mb-8`}>
            {ingredientId.name}
         </p>

         <ul className={`${style.nutrition_values} mb-15`}>
            <li className={`${style.value} mr-5`}>
               <p className="text text_type_main-default text_color_inactive">Каллорииб,ккал</p>
               <p className="text text_type_main-default text_color_inactive">{ingredientId.calories}</p>
            </li>
            <li className={`${style.value} mr-5`}>
               <p className="text text_type_main-default text_color_inactive">Белки,г</p>
               <p className="text text_type_main-default text_color_inactive">{ingredientId.proteins}</p>
            </li>
            <li className={`${style.value} mr-5`}>
               <p className="text text_type_main-default text_color_inactive">Жиры,г</p>
               <p className="text text_type_main-default text_color_inactive">{ingredientId.fat}</p>
            </li>
            <li className={`${style.value} mr-5`}>
               <p className="text text_type_main-default text_color_inactive">Углеводы,г</p>
               <p className="text text_type_main-default text_color_inactive">{ingredientId.carbohydrates}</p>
            </li>
         </ul>
      </div>)}
      </>
   )
}

export default IngredientDetails;