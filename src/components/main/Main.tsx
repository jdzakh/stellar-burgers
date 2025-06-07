import React, { FC } from 'react';
import style from './Main.module.css';
import BurgerIngredients from '../burger-ingredients/BurgerIngredients';
import BurgerConstructor from '../burger-constructor/BurgerConstructor';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { draggingAnElement } from '../../services/reducers/ingredient';
import { useAppDispatch, useAppSelector } from '../../hook/hook';
import { IIngredient } from '../../utils/types';


const Main: FC = () => {
   const dispatch = useAppDispatch()
   const { ingredients, constructorIngredients } = useAppSelector(state => state.ingredientSlice);

   const handleDrop = (item: IIngredient) => {
      const targetIngredient = ingredients.find((ingredient: IIngredient) => ingredient._id === item._id)
      const selectedBun = constructorIngredients.find((ingredient: IIngredient) => ingredient.type === 'bun')
      // @ts-ignore
      const selectedBunIndex = constructorIngredients.indexOf(selectedBun)
      // @ts-ignore
      if (targetIngredient.type === 'bun' && selectedBun) {
         const constructorIngredientsClone = constructorIngredients.slice();
         // @ts-ignore
         constructorIngredientsClone.splice(selectedBunIndex, 1, targetIngredient);
         dispatch(draggingAnElement(constructorIngredientsClone));
      } else {
         // @ts-ignore
         dispatch(draggingAnElement([...constructorIngredients, targetIngredient]));
      }
   }

   return (
      <main>
         <DndProvider backend={HTML5Backend}>
            <div className={style.border}>
               <div className='mt-10'>
                  <p className='text text_type_main-large'>Соберите бургер</p>

                  <BurgerIngredients />
               </div>
               <>
                  <BurgerConstructor onDropHandler={handleDrop} />
               </>
            </div>
         </DndProvider>
      </main>
   )
}

export default Main;