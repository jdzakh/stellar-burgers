import { rootReducer } from './reducers/rootReducer';
import {  ActionCreator, Action } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { ThunkAction} from 'redux-thunk';
import { socketMiddleware } from '../middleware/socket-middleware';
import { WS_ORDER_ACTIONS } from './reducers/ws-orders';

const reducer = rootReducer

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      socketMiddleware(
        "wss://norma.nomoreparties.space/orders/all",
        WS_ORDER_ACTIONS
      )
    ),
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<TReturn = void> = ActionCreator<ThunkAction<TReturn, Action, RootState, any>>;
