import styles from "./orders.module.css";
import { TOrder } from "../../utils/types";
import FeedCard from "../../components/feed-card/feed-card";


interface IOrdersProps {
  data: TOrder[];
}

const Orders = ({ data }: IOrdersProps) => {
  return (
    <div className={styles.orders}>
      <ul className={`${styles.list} custom-scroll`}>
        {data.map((o) => (
          <FeedCard key={o._id} data={o} />
        ))}
      </ul>
    </div>
  );
};

export default Orders;
