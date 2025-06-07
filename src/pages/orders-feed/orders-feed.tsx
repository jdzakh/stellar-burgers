import styles from "./orders-feed.module.css";
import { useEffect } from "react";
import { selectOrders, selectStats, WS_ORDER_ACTIONS } from "../../services/reducers/ws-orders";
import { useAppDispatch, useAppSelector } from "../../hook/hook";
import Orders from "../orders/orders";
import Stats from "../stats/stats";
import { useModifyOrders } from "../../hook/useModifyOrders";
import Loader from "../../components/loader/Loader";


const OrdersFeed = () => {
  const dispatch = useAppDispatch();
  const orders = useAppSelector(selectOrders);
  const stats = useAppSelector(selectStats);
  
  useEffect(() => {
    dispatch({ type: WS_ORDER_ACTIONS.wsInit });

    return () => {
      dispatch({ type: WS_ORDER_ACTIONS.wsClose });
    };
  }, []);

  useModifyOrders();

  return (
    <div className={styles.root}>
      <h1 className="text text_type_main-large mt-10 mb-5">Лента заказов</h1>
      <div className={styles.content}>
        {orders
          ? (<>
            <Orders data={orders} />
            <Stats data={stats} />
          </>)
          : <Loader />}
      </div>
    </div>
  );
};

export default OrdersFeed;
