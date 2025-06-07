import reducer, {
   initialState,
   openCreatedOrder,
   closeCreatedOrder,
   closeIngredientDetails,
   openIngredientDetails
} from './modal';

const MOCK_INGREDIENT = [
   {
      _id: "60d3b41abdacab0026a733c7",
      name: "Флюоресцентная булка R2-D3",
      type: "bun",
      proteins: 44,
      fat: 26,
      carbohydrates: 85,
      calories: 643,
      price: 988,
      image: "https://code.s3.yandex.net/react/code/bun-01.png",
      image_mobile: "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
      image_large: "https://code.s3.yandex.net/react/code/bun-01-large.png",
      __v: 0,
   }
]

describe('modal reducer', () => {
   it('открытие модального окна заказа', () => {
      expect(reducer(initialState, openCreatedOrder())).toEqual({
         ...initialState,
         modalCreatedOrderActive: true
      })
   });

   it('закрытие модального окна заказа', () => {
      expect(reducer(initialState, closeCreatedOrder())).toEqual({
         ...initialState,
         modalCreatedOrderActive: false
      })
   });

   it('открытие деталий ингредиента', () => {
      const action = {
         type: openIngredientDetails,
         payload: MOCK_INGREDIENT
      }
      expect(reducer(initialState, action)).toEqual({
         ...initialState,
         actualIngredient: action.payload,
         modalIngredientDetailsActive: true
      })
   });

   it('закрытие деталий ингредиента', () => {
      expect(reducer(initialState, closeIngredientDetails())).toEqual({
         ...initialState,
         modalIngredientDetailsActive: false
      })
   })
})