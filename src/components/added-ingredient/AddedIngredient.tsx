import { DragIcon, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag, useDrop } from "react-dnd";
import { FC, useRef } from 'react';
import { deleteIngredient } from '../../services/reducers/ingredient';
import { IAddedIngredient, IIndex, IIngredient } from '../../utils/types';
import { useAppDispatch, useAppSelector } from '../../hook/hook';


const AddedIngredient: FC<IAddedIngredient> = ({ ingredient, id, index, moveCard }) => {
   const { name, price, image, } = ingredient;
   const { constructorIngredients } = useAppSelector(state => state.ingredientSlice);
   const dispatch = useAppDispatch();
   const ref = useRef<HTMLLIElement>(null);

   const onClose = (elem: IIngredient) => {
      const del = constructorIngredients.indexOf(elem);
      dispatch(deleteIngredient(del))
   }

   const [, drop] = useDrop({
      accept: 'card',
      hover: (item: IIndex, monitor) => {
         if (!ref.current) {
            return;
         }

         const dragIndex = item.index;
         const hoverIndex = index;

         if (dragIndex === hoverIndex) {
            return;
         }

         const hoverBoundingRect = ref.current?.getBoundingClientRect();
         const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
         const clientOffset = monitor.getClientOffset();
         // @ts-ignore
         const hoverClientY = clientOffset.y - hoverBoundingRect.top;

         if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
            return;
         }

         if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
            return;
         }

         moveCard(dragIndex, hoverIndex)

         item.index = hoverIndex;
      }
   })

   const [{ isDrag }, drag] = useDrag({
      type: 'card',
      item: () => {
         return { id, index }
      },
      collect: monitor => ({
         isDrag: monitor.isDragging()
      })
   })
   drag(drop(ref));

   const opacity = isDrag ? 0 : 1;

   return (
      <li ref={ref} style={{ opacity }} className='m-4'>
         <DragIcon type='secondary' />
         <ConstructorElement
            text={name}
            price={price}
            thumbnail={image}
            handleClose={() => onClose(ingredient)}
         />
      </li>
   )
}


export default AddedIngredient;
