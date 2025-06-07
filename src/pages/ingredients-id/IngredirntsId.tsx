import React, { FC } from "react";
import style from './IngredirntsId.module.css'
import IngredientDetails from '../../components/ingredient-details/IngredientDetails'

const IngredientsId: FC = () => {
   return (
      <>
         <div className={`${style.content} mt-30`}>
            <p className="text text_type_main-large p-2">
               Детали ингредиента
            </p>
            <IngredientDetails />
         </div>

      </>
   )
}

export default IngredientsId;