import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUserData, IUserInfo } from '../../utils/types';
import { RootState } from '../store';

export interface IUserCounterState {
   forgotPasswordRequest: boolean;
   forgotPasswordFailed: boolean;
   isForgotPassword: boolean;
   resetPasswordRequest: boolean;
   resetPasswordFailed: boolean;
   registrationRequest: boolean;
   registrationFailed: boolean;
   token: string;
   loginRequest: boolean;
   loginFailed: boolean;
   sendUserInfoRequest: boolean;
   sendUserInfoFailed: boolean;
   userInfo?: IUserInfo | null;
   logoutRequest: boolean;
   logoutFailed: boolean;
   getUserInfoRequest: boolean;
   getUserInfoFailed: boolean;
   refreshTokenRequest: boolean;
   refreshTokenFailed: boolean;
}

export const initialState: IUserCounterState = {
   forgotPasswordRequest: false,
   forgotPasswordFailed: false,
   isForgotPassword: false,

   resetPasswordRequest: false,
   resetPasswordFailed: false,

   registrationRequest: false,
   registrationFailed: false,

   token: '',

   loginRequest: false,
   loginFailed: false,

   sendUserInfoRequest: false,
   sendUserInfoFailed: false,

   userInfo: null,

   logoutRequest: false,
   logoutFailed: false,

   getUserInfoRequest: false,
   getUserInfoFailed: false,

   refreshTokenRequest: false,
   refreshTokenFailed: false,
}

const userSlice = createSlice({
   name: 'burger',
   initialState,
   reducers: {
      setForgotPasswordState(state, action: PayloadAction<boolean>) {
         state.isForgotPassword = action.payload
      },
      //выход
      setLogout(state) {
         state.logoutRequest = true;
         state.logoutFailed = false;
      },
      setLogoutSuccess(state) {
         state.logoutRequest = false;
         state.token = '';
         state.userInfo = null;
      },
      setLogoutFailed(state) {
         state.logoutRequest = false;
         state.logoutFailed = true;
      },
      //токен
      setRefreshToken(state) {
         state.refreshTokenRequest = true;
         state.refreshTokenFailed = false;
      },
      setRefreshTokenSuccess(state, action: PayloadAction<IUserData>) {
         state.refreshTokenRequest = false;
         const token = action.payload.accessToken.split("Bearer ")[1]
         state.token = token;
      },
      setRefreshTokenFailed(state) {
         state.refreshTokenRequest = false;
         state.refreshTokenFailed = true;
      },
      setGetUserInfo(state) {
         state.getUserInfoRequest = true;
         state.getUserInfoFailed = false;
      },
      setGetUserInfoSuccess(state, action: PayloadAction<IUserInfo>) {
         state.getUserInfoRequest = false;
         state.userInfo = action.payload;
      },
      setGetUserInfoFailed(state) {
         state.getUserInfoRequest = false;
         state.getUserInfoFailed = true;
      },
      //данные в профиле
      sendUserInfo(state) {
         state.sendUserInfoRequest = true;
         state.sendUserInfoFailed = false;
      },
      sendUserInfoSuccess(state, action: PayloadAction<IUserInfo>) {
         state.sendUserInfoRequest = false;
         state.userInfo = action.payload;
      },
      sendUserInfoFailed(state) {
         state.sendUserInfoRequest = false;
         state.sendUserInfoFailed = true;
      },
      //вход
      setLogin(state) {
         state.loginRequest = true;
         state.loginFailed = false;
      },
      setLoginSuccess(state, action: PayloadAction<IUserData>) {
         state.loginRequest = false;
         const token = action.payload.accessToken.split("Bearer ")[1]
         state.token = token;
         state.userInfo = action.payload.user;
      },
      setLoginFailed(state) {
         state.loginRequest = false;
         state.loginFailed = true;
      },
      //востановление пароля
      setForgotPassword(state) {
         state.forgotPasswordRequest = true;
         state.forgotPasswordFailed = false;
      },
      setForgotPasswordSuccess(state) {
         state.forgotPasswordRequest = false;
      },
      setForgotPasswordFailed(state) {
         state.forgotPasswordFailed = true;
         state.forgotPasswordRequest = false;
      },
      //изменение пароля
      setResetPassword(state) {
         state.resetPasswordRequest = true;
         state.resetPasswordFailed = false;
      },
      setResetPasswordSuccess(state) {
         state.resetPasswordRequest = false;
      },
      setResetPasswordFailed(state) {
         state.resetPasswordFailed = true;
         state.resetPasswordRequest = false;
      },
      //регистрация
      registrationUser(state) {
         state.registrationRequest = true;
         state.registrationFailed = false;
      },
      registrationUserSuccess(state, action: PayloadAction<IUserData>) {
         state.registrationRequest = false;
         const token = action.payload.accessToken.split("Bearer ")[1]
         state.token = token;
      },
      registrationUserFailed(state) {
         state.registrationRequest = false;
         state.registrationFailed = true;
      },
   }
});

export const selectIsForgotPassword = (state: RootState) => {
   return state.userSlice.isForgotPassword;
};

export const selectAccessToken = (state: RootState) => {
   return state.userSlice.token;
};

export const {
   setForgotPasswordState,
   setRefreshToken,
   setRefreshTokenSuccess,
   setRefreshTokenFailed,
   setGetUserInfo,
   setGetUserInfoSuccess,
   setGetUserInfoFailed,
   setLogout,
   setLogoutSuccess,
   setLogoutFailed,
   sendUserInfo,
   sendUserInfoSuccess,
   sendUserInfoFailed,
   setLogin,
   setLoginSuccess,
   setLoginFailed,
   registrationUser,
   registrationUserSuccess,
   registrationUserFailed,
   setResetPassword,
   setResetPasswordSuccess,
   setResetPasswordFailed,
   setForgotPassword,
   setForgotPasswordSuccess,
   setForgotPasswordFailed,
} = userSlice.actions

export default userSlice.reducer