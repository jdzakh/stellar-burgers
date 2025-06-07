import { combineReducers } from 'redux';
import userSlice from './user';
import ingredientSlice from './ingredient';
import modalSlice from './modal';
import wsOrderReducer from './ws-orders'

export const rootReducer = combineReducers({
   userSlice,
   ingredientSlice,
   modalSlice,
   wsOrderReducer,
});