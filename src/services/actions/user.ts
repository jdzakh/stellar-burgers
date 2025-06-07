import { tokenExpired, unauthorized } from '../../utils/baseURL';
import mainApi from '../../utils/checkResponse';
import {
   setForgotPasswordState,
   setForgotPassword,
   setForgotPasswordSuccess,
   setForgotPasswordFailed,
   setResetPassword,
   setResetPasswordSuccess,
   setResetPasswordFailed,
   registrationUser,
   registrationUserSuccess,
   registrationUserFailed,
   setLogin,
   setLoginSuccess,
   setLoginFailed,
   sendUserInfo,
   sendUserInfoSuccess,
   sendUserInfoFailed,
   setLogout,
   setLogoutSuccess,
   setLogoutFailed,
   setGetUserInfo,
   setGetUserInfoSuccess,
   setGetUserInfoFailed,
   setRefreshToken,
   setRefreshTokenSuccess,
   setRefreshTokenFailed,
} from '../reducers/user';
import { AppDispatch, AppThunk } from '../store';

export const forgotPassword = (email: string) => {
   return (dispatch: AppDispatch) => {
      dispatch(setForgotPassword())

      mainApi.sendEmail(email)
         .then(() => {
            dispatch(setForgotPasswordSuccess());
            dispatch(setForgotPasswordState(true))
         })
         .catch((err) => {
            dispatch(setForgotPasswordFailed())
         })
   }
}

export const resetPassword = (password: string, code: string) => {
   return (dispatch: AppDispatch) => {
      dispatch(setResetPassword())

      mainApi.resetPassword(password, code)
         .then(() => {
            dispatch(setResetPasswordSuccess());
            dispatch(setForgotPasswordState(false))
         })
         .catch((err) => {
            setResetPasswordFailed();
         })
   }
}

export const registration = (email: string, name: string, password: string) => {
   return (dispatch: AppDispatch) => {
      dispatch(registrationUser())

      mainApi.register(email, name, password)
         .then(res => {
            dispatch(registrationUserSuccess(res))
            localStorage.setItem('refreshToken', res.refreshToken)
            dispatch(setForgotPasswordState(true))
         })
         .catch((err) => {
            dispatch(registrationUserFailed())
         })
   }
}

export const login = (email: string, password: string) => {
   return (dispatch: AppDispatch) => {
      dispatch(setLogin())

      mainApi.login(email, password)
         .then(res => {
            dispatch(setLoginSuccess(res))
            localStorage.setItem('refreshToken', res.refreshToken)
            dispatch(setForgotPasswordState(true))
         })
         .catch((err) => {
            dispatch(setLoginFailed())
            console.log(err)
         })
   }
}

export const sendUserData = (token: string, name: string, email: string, password: string) => {
   return (dispatch: AppDispatch) => {
      dispatch(sendUserInfo())

      mainApi.sendUserInfo(token, name, email, password)
         .then((res) => {
            dispatch(sendUserInfoSuccess(res.user))
         })
         .catch((err) => {
            if (err === tokenExpired ) {
               // @ts-ignore
               dispatch(refreshToken(localStorage.getItem('refreshToken')))
            }

            dispatch(sendUserInfoFailed())
         })
   }
}

export const logout = (refreshToken: string | null) => {
   return (dispatch: AppDispatch) => {
      dispatch(setLogout())

      mainApi.logout(refreshToken)
         .then(() => {
            localStorage.removeItem('refreshToken');
            dispatch(setLogoutSuccess());
         })
         .catch((err) => {
            dispatch(setLogoutFailed())
         })
   }
}

export const getUserData = (token: string ) => {
   return (dispatch: AppDispatch) => {
      dispatch(setGetUserInfo())

      mainApi.getUserData(token)
         .then((res) => {
            dispatch(setGetUserInfoSuccess(res.user))
         })
         .catch((err) => {
            if (err === tokenExpired || err === unauthorized) {
               // @ts-ignore
               dispatch(refreshToken(localStorage.getItem('refreshToken')))
            }
            dispatch(setGetUserInfoFailed())
         })
   }
}

const refreshToken = (refreshToken: string) => {
   return (dispatch: AppDispatch) => {
      dispatch(setRefreshToken())

      mainApi.refreshToken(refreshToken)
         .then((res) => {
            localStorage.setItem('refreshToken', res.refreshToken)
            dispatch(setRefreshTokenSuccess(res))
            dispatch(setForgotPasswordState(true))
         })
         .catch((err) => {
            dispatch(setRefreshTokenFailed())
         })
   }
}

