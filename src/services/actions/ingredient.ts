import mainApi from '../../utils/checkResponse';
import {
   getFeedItem,
   getListIngredients,
   getListIngredientsFailed,
} from '../reducers/ingredient';
import { AppDispatch } from '../store';

export const getFeed = () => {
   return function (dispatch: AppDispatch) {
      dispatch(getFeedItem())
      mainApi.getIngredients()
         .then((ingredientsData) => {
            if (ingredientsData) {
               dispatch(getListIngredients(ingredientsData.data))
            }
         })
         .catch((err) =>
            dispatch(getListIngredientsFailed())
         );

   }
}
