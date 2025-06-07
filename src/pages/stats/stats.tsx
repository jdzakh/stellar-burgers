import styles from "./stats.module.css";
import { useMemo } from "react";
import { useAppSelector } from "../../hook/hook";
import { selectOrders } from "../../services/reducers/ws-orders";
import { OrderReadyStatus } from "../order-list/order-list";


interface IStatsProps {
  data: {
    total: number | undefined;
    totalToday: number | undefined;
  };
}

const Stats = ({ data }: IStatsProps) => {
  const orders = useAppSelector(selectOrders);
  const pendingOrders = useMemo(
    () =>
      orders
        ?.filter((o) => o.status === OrderReadyStatus.PENDING)
        .map((o) => o.number),
    [orders]
  );
  const doneOrders = useMemo(
    () =>
      orders
        ?.filter((o) => o.status === OrderReadyStatus.DONE)
        .map((o) => o.number),
    [orders]
  );
  return (
    <div className={styles.stats}>
      <div className={styles.ordersStatuses}>
        <div className={styles.ordersStatus}>
          <p className="text text_type_main-medium mb-6">Готовы:</p>

          <ul className={styles.idsList}>
            {doneOrders?.slice(0, 10).map((o) => (
              <li
                key={o}
                className={`
                  ${styles.orderId}
                  ${styles.orderId_highlight}
                  text text_type_digits-default
                `}
              >
                {o}
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.ordersStatus}>
          <p className="text text_type_main-medium mb-6">В работе:</p>

          <ul className={styles.idsList}>
            {pendingOrders?.slice(0, 10).map((o) => (
              <li
                key={o}
                className={`${styles.orderId} text text_type_digits-default`}
              >
                {o}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={styles.globalStats}>
        <p className="text text_type_main-medium">Выполнено за все время:</p>

        <span className={`${styles.stat} text text_type_digits-large`}>
          {data.total === undefined ? "–" : data.total}
        </span>
      </div>

      <div className={styles.globalStats}>
        <p className="text text_type_main-medium">Выполнено за сегодня:</p>
        
        <span className={`${styles.stat} text text_type_digits-large`}>
          {data.totalToday === undefined ? "–" : data.totalToday}
        </span>
      </div>
    </div>
  );
};

export default Stats;
