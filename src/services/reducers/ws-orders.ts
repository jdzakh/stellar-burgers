import { createReducer, PayloadAction, createAction } from "@reduxjs/toolkit";
import { TOrder } from "../../utils/types";
import { RootState } from "../store";

export const WS_ORDER_ACTIONS = {
   wsInit: "wsOrder/init",
   wsInitWithCustomUrl: "wsOrder/wsInitWithCustomUrl",
   wsSendMessage: "wsOrder/sendMessage",
   wsClose: "wsOrder/close",
   onOpen: "wsOrder/onOpen",
   onClose: "wsOrder/onClose",
   onError: "wsOrder/onError",
   onMessage: "wsOrder/onMessage",
};

interface IWsOrdersState {
   orders: TOrder[] | undefined;
   total: number | undefined;
   totalToday: number | undefined;
};

export const initialState: IWsOrdersState = {
   orders: undefined,
   total: undefined,
   totalToday: undefined,
};

export const updateOrders = createAction<TOrder[]>("updateOrders");

const wsOrdersReducer = createReducer(initialState, {
   [updateOrders.type]: (state, action: PayloadAction<TOrder[]>) => {
      state.orders = action.payload;
      return state;
   },
   [WS_ORDER_ACTIONS.onMessage]: (
      state,
      action: PayloadAction<IWsOrdersState>
   ) => {
      state = action.payload;
      return state;
   },
   [WS_ORDER_ACTIONS.onClose]: () => initialState,
});

export const selectOrders = (state: RootState) => {
   return state.wsOrderReducer.orders;

};
export const selectOrderById = (id: string | undefined) => (state: RootState) => {
   return state.wsOrderReducer.orders?.find((o) => o._id === id);
};
export const selectStats = (state: RootState) => {
   const { total, totalToday } = state.wsOrderReducer;
   return { total, totalToday };
};

export default wsOrdersReducer;
