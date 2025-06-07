import mainApi from '../../utils/checkResponse';
import {
  getCreatedOrder,
  getCreatedOrderSuccess,
  getDeleteCreatedOrder,
  getCreatedOrderFailed,
} from '../reducers/ingredient';
import { openCreatedOrder } from '../reducers/modal';
import { AppDispatch } from '../store';


export const sendOrder = (ingredientsId: string[], token: string) => {
  return function (dispatch: AppDispatch) {
    dispatch(getCreatedOrder())
    mainApi.sendIngredients(ingredientsId, token)
      .then(res => {
        if (res && res.success) {
          dispatch(getCreatedOrderSuccess(res))
        } else {
          dispatch(getCreatedOrderFailed())
        }
      })
      .then(res => {
        dispatch(openCreatedOrder())
      })
      .then(res => {
        dispatch(getDeleteCreatedOrder())
      })
      .catch(err =>
        dispatch(getCreatedOrderFailed())
      )
  }
}
