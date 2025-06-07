import React, { FC } from 'react';
import Ingredient from '../ingredient/Ingredient';
import style from './ListIngredients.module.css'
import { IListIngredients } from '../../utils/types';

const ListIngredients: FC<IListIngredients> = ({ ingredients, title , id}) => {
   return (
      <>
         <div className='text text_type_main-medium mt-10 mb-6' id={id}>{title}</div>

         <div className={style.colomn}>
            {
               ingredients.map((element) => {
                  return (
                     <Ingredient ingredient={element} key={element._id} />
                  )
               })
            }
         </div>
      </>
   )
}

export default ListIngredients;