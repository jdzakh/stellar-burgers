import { useEffect } from "react";
import Loader from "../../components/loader/Loader";
import ProfileSidebar from "../../components/profile-sidebar/ProfileSidebar";
import { useAppDispatch, useAppSelector } from "../../hook/hook";
import { useModifyOrders } from "../../hook/useModifyOrders";
import { selectAccessToken, selectIsForgotPassword } from "../../services/reducers/user";
import { selectOrders, WS_ORDER_ACTIONS } from "../../services/reducers/ws-orders";
import Order from "../order/order";
import styles from './orders-list.module.css'

const OrdersList: React.FC = () => {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(selectIsForgotPassword);
  const orders = useAppSelector(selectOrders);
  const token = useAppSelector(selectAccessToken);

  useModifyOrders();

  useEffect(() => {
    if (isAuthenticated) {
      dispatch({
        type: WS_ORDER_ACTIONS.wsInitWithCustomUrl,
        payload: `wss://norma.nomoreparties.space/orders?token=${token}`,
      });
    }

    return () => {
      dispatch({ type: WS_ORDER_ACTIONS.wsClose });
    };
  }, [isAuthenticated]);
  

  return (
    <div className={styles.history}>
      <ProfileSidebar />
      <div className={styles.root}>
        {orders 
        ? (<ul className={`${styles.list} custom-scroll`}>
            {orders
              .slice()
              .reverse()
              .map((o) => (
                <Order key={o._id} data={o} />
              ))}
          </ul>)
          : <Loader/>
        }
      </div>
    </div>
  );
};

export default OrdersList;
