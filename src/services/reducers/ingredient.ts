import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as generateUniqueId } from 'uuid';
import { ICreatedOrder, IIngredient } from '../../utils/types';
import { RootState } from '../store';


export interface IIngredientCounterState {
   ingredients: Array<IIngredient>;
   constructorIngredients: Array<IIngredient>;
   createdOrder: ICreatedOrder | null;
   feedRequest: boolean;
   feedFailed: boolean;
   orderFailed: boolean;
   orderRequest: boolean;
}

export const initialState: IIngredientCounterState = {
   ingredients: [],
   constructorIngredients: [],
   createdOrder: null,

   feedRequest: false,
   feedFailed: false,

   orderFailed: false,
   orderRequest: false,
}

const ingredientSlice = createSlice({
   name: 'ingredient',
   initialState,
   reducers: {
      //получение ингредиентов от сервира
      getFeedItem(state) {
         state.feedRequest = true;
         state.feedFailed = false;
      },
      getListIngredients(state, action: PayloadAction<Array<IIngredient>>) {
         state.ingredients = action.payload;
         state.feedRequest = false;
      },
      getListIngredientsFailed(state) {
         state.feedFailed = true;
         state.feedRequest = false;
      },
      //отправка заказа на сервер
      getCreatedOrder(state) {
         state.orderRequest = true;
         state.orderFailed = false;
      },
      getCreatedOrderSuccess(state, action: PayloadAction<ICreatedOrder>) {
         state.orderRequest = false;
         state.createdOrder = action.payload;
      },
      getCreatedOrderFailed(state) {
         state.orderRequest = false;
         state.orderFailed = true;
      },
      getDeleteCreatedOrder(state) {
         state.constructorIngredients = [];
      },
      //добавление ингредиента
      draggingAnElement(state, action: PayloadAction<IIngredient[]>) {
         const modifiedIngredient = action.payload.map((ingredient) => {
            const ingredientCopy = Object.assign({}, ingredient);
            ingredientCopy.uuid = generateUniqueId();
            return ingredientCopy;
         });
         state.constructorIngredients = modifiedIngredient;
      },
      //для dnd
      sortConstructorIngredients(state, action: PayloadAction<Array<IIngredient>>) {
         state.constructorIngredients = action.payload;
      },
      //удаление ингредиента
      deleteIngredient(state, action: PayloadAction<number>) {
         state.constructorIngredients = state.constructorIngredients.filter((item, index) => index !== action.payload);
      }
   }
})

export const selectIngredients = (state: RootState) => {
   return state.ingredientSlice.ingredients;
};

export const {
   getCreatedOrder,
   getCreatedOrderSuccess,
   getCreatedOrderFailed,
   getDeleteCreatedOrder,
   sortConstructorIngredients,
   deleteIngredient,
   draggingAnElement,
   getFeedItem,
   getListIngredients,
   getListIngredientsFailed
} = ingredientSlice.actions;

export default ingredientSlice.reducer