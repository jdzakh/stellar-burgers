import React, { FC, useMemo, useCallback } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './BurgerIngredients.module.css';
import ListIngredients from '../list-ingredients/ListIngredients';
import { compareCoords } from '../../utils/compare-coords';
import { useAppSelector } from '../../hook/hook';

const BurgerIngredients: FC = () => {
  const { ingredients } = useAppSelector((state) => state.ingredientSlice);
  const [current, setCurrent] = React.useState('bun');

  // Мемоизация фильтров
  const bun = useMemo(() => ingredients.filter((elem) => elem.type === 'bun'), [ingredients]);
  const main = useMemo(() => ingredients.filter((elem) => elem.type === 'main'), [ingredients]);
  const sauce = useMemo(() => ingredients.filter((elem) => elem.type === 'sauce'), [ingredients]);

  // Обработчик скролла
  const scrollHandler = useCallback((evt: React.UIEvent<HTMLDivElement>) => {
    const target = evt.currentTarget;
    setCurrent(compareCoords(target));
  }, []);

  // Обработчик клика по вкладкам
  const clickTab = (type: string) => {
    setCurrent(type);
    const element = document.querySelector(`#${type}`);
    if (element) {
      element.scrollIntoView({ block: 'start', behavior: 'smooth' });
    }
  };

  return (
    <div className='mt-5 mr-10'>
      {/* Вкладки */}
      <nav className={style.tab}>
        <Tab value='bun' active={current === 'bun'} onClick={clickTab}>
          Булки
        </Tab>
        <Tab value='main' active={current === 'main'} onClick={clickTab}>
          Начинки
        </Tab>
        <Tab value='sauce' active={current === 'sauce'} onClick={clickTab}>
          Соусы
        </Tab>
      </nav>

      {/* Список ингредиентов с обработчиком скролла */}
      <div className={style.ingredients} onScroll={scrollHandler}>
        <ListIngredients id='bun' ingredients={bun} title='Булки' />
        <ListIngredients id='main' ingredients={main} title='Начинки' />
        <ListIngredients id='sauce' ingredients={sauce} title='Соусы' />
      </div>
    </div>
  );
};

export default BurgerIngredients;