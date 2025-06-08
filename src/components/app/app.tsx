import React, { FC, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';

import Main from '../main/Main';
import ForgotPassword from '../../pages/forgot-password/ForgotPassword';
import IngredientsId from '../../pages/ingredients-id/IngredirntsId';
import Login from '../../pages/login/Login';
import NotFound404 from '../../pages/not-found-404/NotFound404';
import Profile from '../../pages/profile/Profile';
import Registration from '../../pages/register/Registration';
import ResetPassword from '../../pages/reset-password/ResetPassword';
import OrdersFeed from '../../pages/orders-feed/orders-feed';
import OrderList from '../../pages/order-list/order-list';
import OrdersList from '../../pages/orders-list/orders-list';

import Layout from '../layout/Layout';
import RequireAuthForProfile from '../../hoc/RequireAuth';

import Modal from '../modal/Modal';
import IngredientDetails from '../ingredient-details/IngredientDetails';
import ModalOrder from '../modal-order/ModalOrder';

import { getFeed } from '../../services/actions/ingredient';
import { getUserData } from '../../services/actions/user';

import { useAppDispatch, useAppSelector } from '../../hook/hook';
import { closeIngredientDetails } from '../../services/reducers/modal';

const App: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { token } = useAppSelector((state) => state.userSlice);
  const { background } = location.state as { background?: Location } || {};

  // Загрузка данных при монтировании
  useEffect(() => {
    dispatch(getFeed());
    dispatch(getUserData(token));
  }, [dispatch, token]);

  // Обработчик закрытия модального окна
  const closeDetails = () => {
    dispatch(closeIngredientDetails());
    if (background) {
      navigate(-1);
    }
  };

  return (
    <>
      {/* Основной роутинг */}
      <Routes location={background || location}>
        <Route path='*' element={<Layout />}>
          <Route index element={<Main />} />
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Registration />} />
          <Route path='forgot-password' element={<ForgotPassword />} />
          <Route path='reset-password' element={<ResetPassword />} />
          <Route path='feed' element={<OrdersFeed />} />
          <Route path='feed/:id' element={<OrderList />} />
          <Route
            path='profile/*'
            element={
              <RequireAuthForProfile>
                <Profile />
              </RequireAuthForProfile>
            }
          />
          <Route path='profile/orders' element={<OrdersList />} />
          <Route path='profile/orders/:id' element={<OrderList />} />
          <Route path='ingredients/:id' element={<IngredientsId />} />
          <Route path='*' element={<NotFound404 />} />
        </Route>
      </Routes>

      {/* Модальные окна при наличии background */}
      {background && (
        <>
          {/* Детали ингредиента */}
          <Routes>
            <Route
              path='ingredients/:id'
              element={
                <Modal title='Детали ингредиента' onClick={closeDetails}>
                  <IngredientDetails />
                </Modal>
              }
            />
            {/* Заказ из ленты */}
            <Route
              path='feed/:id'
              element={<ModalOrder />}
            />
            {/* Заказ профиля */}
            <Route
              path='profile/orders/:id'
              element={<ModalOrder />}
            />
          </Routes>
        </>
      )}
    </>
  );
};

export default App;
