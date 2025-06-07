import {  NavLink, useLocation } from "react-router-dom";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./feed-card.module.css";
import dayjs from "dayjs";
import { TOrder } from "../../utils/types";
import IngredientImage from "../ingredient-image/ingredient-image";

interface IFeedCardProps {
  data: TOrder;
}

export const formatDate = (utc: string): string => {
  const date = dayjs(utc);
  const isToday = dayjs().startOf("day").isSame(date, "day");
  if (isToday) return "Сегодня, " + date.format("kk:mm");
  const isYesterday = dayjs().subtract(1, "day").isSame(date, "day");
  if (isYesterday) return "Вчера, " + date.format("kk:mm");
  return date.format("DD:MM, kk:mm");
};

const FeedCard = ({ data }: IFeedCardProps) => {
  const location = useLocation();

  return (
    <li className={styles.cardContainer}>
      <NavLink
        className={styles.card}
        to={`${data.number}`}
        state={{ background: location }}
      >
        <p className={`${styles.header} text text_type_digits-default`}>
          #{data.number}{" "}
          <time className="text text_type_main-default text_color_inactive">
            {formatDate(data.createdAt)} i-GMT+3
          </time>
        </p>
        <h2 className={`${styles.title} text text_type_main-medium`}>
          {data.name}
        </h2>
        <div className={styles.priceInfo}>
          {data.modifiedIngredients && (
            <ul className={styles.ingredientsList}>
              {data.modifiedIngredients
                .slice(0, 5)
                .reverse()
                .map((ing, i) => (
                  <IngredientImage
                    key={`${ing.id}-${data._id}-${i}`}
                    src={ing.img}
                  />
                ))}
            </ul>
          )}
          <p className={styles.priceContainer}>
            <span className={`${styles.price} text text_type_digits-default`}>
              {data.price ? data.price : "–"}
            </span>
            <CurrencyIcon type="primary" />
          </p>
        </div>
      </NavLink>
    </li>
  );
};

export default FeedCard;
