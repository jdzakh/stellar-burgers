import { createAsyncThunk } from "@reduxjs/toolkit";
import mainApi from "../../utils/checkResponse";
import { updateOrders } from "../reducers/ws-orders";
import { AppDispatch, RootState } from "../store";


export const fetchOrdersThunk = createAsyncThunk<
   void,
   void,
   { state: RootState; dispatch: AppDispatch }
>("order/fetchOrders", async (_, thunkAPI) => {
   const token = thunkAPI.getState().userSlice.token;
   const orders = await mainApi.fetchOrders(token);
   thunkAPI.dispatch(updateOrders(orders.orders));
});

