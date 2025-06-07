import reducer, {
   initialState,
   getCreatedOrder,
   getCreatedOrderSuccess,
   getCreatedOrderFailed,
   getDeleteCreatedOrder,
   sortConstructorIngredients,
   draggingAnElement,
   getFeedItem,
   getListIngredients,
   getListIngredientsFailed
} from "./ingredient";


const MOCK_INGREDIENTS = [
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
   },
   {
      _id: "60d3b41abdacab0026a733c8",
      name: "Филе Люминесцентного тетраодонтимформа",
      type: "main",
      proteins: 44,
      fat: 26,
      carbohydrates: 85,
      calories: 643,
      price: 988,
      image: "https://code.s3.yandex.net/react/code/meat-03.png",
      image_mobile: "https://code.s3.yandex.net/react/code/meat-03-mobile.png",
      image_large: "https://code.s3.yandex.net/react/code/meat-03-large.png",
      __v: 0,
   },
   {
      _id: "60d3b41abdacab0026a733c9",
      name: "Мясо бессмертных моллюсков Protostomia",
      type: "main",
      proteins: 433,
      fat: 244,
      carbohydrates: 33,
      calories: 420,
      price: 1337,
      image: "https://code.s3.yandex.net/react/code/meat-02.png",
      image_mobile: "https://code.s3.yandex.net/react/code/meat-02-mobile.png",
      image_large: "https://code.s3.yandex.net/react/code/meat-02-large.png",
      __v: 0,
   },
   {
      _id: "60d3b41abdacab0026a733ca",
      name: "Говяжий метеорит (отбивная)",
      type: "main",
      proteins: 800,
      fat: 800,
      carbohydrates: 300,
      calories: 2674,
      price: 3000,
      image: "https://code.s3.yandex.net/react/code/meat-04.png",
      image_mobile: "https://code.s3.yandex.net/react/code/meat-04-mobile.png",
      image_large: "https://code.s3.yandex.net/react/code/meat-04-large.png",
      __v: 0,
   },
];

const prevState = initialState;

describe('ingredients reducer', () => {
   it('проверка начального состояния initialState', () => {
      expect(reducer(undefined, { type: test })).toEqual(initialState)
   });

   it('загрузка списка ингредиента getFeedItem', () => {

      expect(reducer(prevState, getFeedItem())).toEqual({
         ...initialState,
         feedRequest: true,
         feedFailed: false
      })
   });

   it('успешное получение ингредиентов getListIngredients', () => {
      const action = {
         type: getListIngredients,
         payload: MOCK_INGREDIENTS,
      };
      expect(reducer(prevState, action)).toEqual({
         ...initialState,
         ingredients: MOCK_INGREDIENTS,
         feedRequest: false
      })
   });

   it('ошибка в получене данных getListIngredientsFailed', () => {
      expect(reducer(prevState, getListIngredientsFailed())).toEqual({
         ...initialState,
         feedFailed: true,
         feedRequest: false
      })
   });

   it('отправка заказа getCreatedOrder', () => {
      expect(reducer(prevState, getCreatedOrder())).toEqual({
         ...initialState,
         orderRequest: true,
         orderFailed: false
      })
   })

   it('успешная отправка заказа getCreatedOrderSuccess', () => {
      const orderDetails = {
         name: "some name",
         order: {
            number: 1,
         },
         success: true
      };
      const action = {
         type: getCreatedOrderSuccess,
         payload: orderDetails,
      };
      expect(reducer(initialState, action)).toEqual({
         ...initialState,
         createdOrder: orderDetails
      });
   });

   it('ошибка при отправки заказа getCreatedOrderFailed', () => {
      expect(reducer(prevState, getCreatedOrderFailed())).toEqual({
         ...initialState,
         orderRequest: false,
         orderFailed: true
      })
   });

   it('очистка заказа из стора после отправки getDeleteCreatedOrder', () => {
      expect(reducer(prevState, getDeleteCreatedOrder())).toEqual({
         ...initialState,
         constructorIngredients: []
      })
   })

   it('добаление ингредиента к заказу draggingAnElement', () => {
      const action = {
         type: draggingAnElement,
         payload: [],
      };

      expect(reducer(prevState, action)).toEqual({
         ...initialState,
         constructorIngredients: []
      })
   })

   it('сотрировка constructorIngredients для dnd', () => {
      const action = {
         type: sortConstructorIngredients,
         payload: MOCK_INGREDIENTS,
      };

      expect(reducer(prevState, action)).toEqual({
         ...initialState,
         constructorIngredients: action.payload
      })
   })
})