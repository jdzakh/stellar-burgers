import reducer, {
  initialState,
  updateOrders,
  WS_ORDER_ACTIONS,
} from "./ws-orders";

const MOCK_ORDERS = [
  {
    _id: "61f2f3e36d7cd8001b2d2a6e",
    ingredients: [
      "643d69a5c3f7b9001cfa093d",
      "643d69a5c3f7b9001cfa093f",
      "60d3b41abdacab0026a733cd",
      "60d3b41abdacab0026a733cf",
    ],
    status: "done",
    name: "Space бессмертный флюоресцентный антарианский бургер",
    createdAt: "2024-06-07T19:34:59.013Z",
    updatedAt: "2025-06-07T19:34:59.251Z",
    number: 8853,
  },
  {
    _id: "61f2df7d6d7cd8001b2d2a5a",
    ingredients: [
      "643d69a5c3f7b9001cfa093d",
      "60d3b41abdacab0026a733cd",
      "643d69a5c3f7b9001cfa094d",
      "60d3b41abdacab0026a733ce",
    ],
    status: "done",
    name: "Традиционный-галактический space флюоресцентный люминесцентный бургер",
    createdAt: "2024-06-07T18:07:57.927Z",
    updatedAt: "2024-06-07T18:07:58.243Z",
    number: 8852,
  },
  {
    _id: "61f2de196d7cd8001b2d2a55",
    ingredients: [
      "643d69a5c3f7b9001cfa093d",
      "60d3b41abdacab0026a733cd",
      "643d69a5c3f7b9001cfa093d",
    ],
    status: "done",
    name: "Space флюоресцентный бургер",
    createdAt: "2024-06-07T18:02:01.389Z",
    updatedAt: "2024-06-07T18:02:01.595Z",
    number: 8851,
  },
];

describe("wsOrders reducer", () => {
  it("должен обработать updateOrders", () => {
    const action = {
      type: updateOrders.type,
      payload: MOCK_ORDERS,
    };
    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      orders: MOCK_ORDERS,
    });
  });

  it("должен обработать wsOrder/onMessage", () => {
    const payloadState = {
      orders: MOCK_ORDERS,
      total: 10000,
      totalToday: 100,
    };
    const action = {
      type: WS_ORDER_ACTIONS.onMessage,
      payload: payloadState,
    };
    expect(reducer(initialState, action)).toEqual(payloadState);
  });

  it("должен обработать wsOrder/onClose", () => {
    const prevState = {
      orders: MOCK_ORDERS,
      total: 10000,
      totalToday: 100,
    };
    const action = { type: WS_ORDER_ACTIONS.onClose };
    expect(reducer(prevState, action)).toEqual(initialState);
  });
});