import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IIngredient } from '../../utils/types';

export interface ICounterState {
   actualIngredient: IIngredient | null;
   modalCreatedOrderActive: boolean;
   modalIngredientDetailsActive: boolean;
}

export const initialState: ICounterState = {
   actualIngredient: null,
   
   modalCreatedOrderActive: false,
   modalIngredientDetailsActive: false,
}

const modalSlice = createSlice({
   name: 'modal',
   initialState,
   reducers: {
      //работа с модальным окном заказа
      openCreatedOrder(state) {
         state.modalCreatedOrderActive = true;
      },
      closeCreatedOrder(state) {
         state.modalCreatedOrderActive = false;
      },
      
      //работа с модальным окном подробностей ингредиента
      openIngredientDetails(state, action: PayloadAction<IIngredient | null>) {
         state.actualIngredient = action.payload;
         state.modalIngredientDetailsActive = true;
      },
      closeIngredientDetails(state) {
         state.modalIngredientDetailsActive = false;
      },
   }
})

export const {
   openCreatedOrder,
   closeCreatedOrder,
   closeIngredientDetails,
   openIngredientDetails,
} = modalSlice.actions

export default modalSlice.reducer