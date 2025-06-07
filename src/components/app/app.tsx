import React, { FC, useEffect } from 'react';
import Main from '../main/Main';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import ForgotPassword from '../../pages/forgot-password/ForgotPassword';
import IngredientsId from '../../pages/ingredients-id/IngredirntsId';
import Login from '../../pages/login/Login';
import NotFound404 from '../../pages/not-found-404/NotFound404';
import Profile from '../../pages/profile/Profile';
import Registration from '../../pages/register/Registration';
import ResetPassword from '../../pages/reset-password/ResetPassword';
import Layout from '../layout/Layout';
import RequireAuthForProfile from '../../hoc/RequireAuth';
import { getFeed } from '../../services/actions/ingredient';
import { getUserData } from '../../services/actions/user';
import { useAppDispatch, useAppSelector } from '../../hook/hook';
import OrderList from '../../pages/order-list/order-list';
import Modal from '../modal/Modal';
import IngredientDetails from '../ingredient-details/IngredientDetails';
import { closeIngredientDetails } from '../../services/reducers/modal';
import OrdersList from '../../pages/orders-list/orders-list';
import ModalOrder from '../modal-order/ModalOrder';
import OrdersFeed from '../../pages/orders-feed/orders-feed';


const App: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { token } = useAppSelector(state => state.userSlice);

  useEffect(
    () => {
      dispatch(getFeed());
      dispatch(getUserData(token));
    }, [dispatch, token]
  );

  const state = location.state as { background?: Location };

  const closeDetails = () => {
    dispatch(closeIngredientDetails())
    state?.background && navigate(-1);
  }

  return (
    <>
      <Routes location={state?.background || location}>
        <Route path='*' element={<Layout />}>
          <Route index element={<Main />} />
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Registration />} />
          <Route path='forgot-password' element={<ForgotPassword />} />
          <Route path='reset-password' element={<ResetPassword />} />
          <Route path='feed' element={<OrdersFeed />} />
          <Route path='feed/:id' element={<OrderList />} />
          <Route path='profile/' element={
            <RequireAuthForProfile>
              <Profile />
            </RequireAuthForProfile>
          } />
          <Route path='profile/orders' element={<OrdersList />} />
          <Route path='profile/orders/:id' element={<OrderList />} />
          <Route path='ingredients/:id' element={<IngredientsId />} />
          <Route path='*' element={<NotFound404 />} />
        </Route>
      </Routes>

      {state?.background && (
        <Routes>
          <Route path="ingredients/:id" element={(
            <Modal title='Детали ингредиента' onClick={closeDetails} >
              <IngredientDetails />
            </Modal >
          )} />
        </Routes>
      )}

      {state?.background && (
        <Routes>
          <Route path='feed/:id' element={<ModalOrder />} />
        </Routes>
      )}

      {state?.background && (
        <Routes>
          <Route path='profile/orders/:id' element={<ModalOrder />} />
        </Routes>
      )}
      

    </>
  )
}
export default App;
