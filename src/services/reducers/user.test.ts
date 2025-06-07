import reducer, {
   initialState,
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
} from "./user";

describe('user reducer', () => {
   it('проверка состояния пароля setForgotPasswordState', () => {
      const action = {
         type: setForgotPasswordState,
         payload: true
      }

      expect(reducer(initialState, action)).toEqual({
         ...initialState,
         isForgotPassword: action.payload,
      })
   });

   it('выxод из профиля setLogout', () => {
      expect(reducer(initialState, setLogout())).toEqual({
         ...initialState,
         logoutRequest: true,
         logoutFailed: false
      })
   });

   it('очистка данных user setLogoutSuccess', () => {
      expect(reducer(initialState, setLogoutSuccess())).toEqual({
         ...initialState,
         logoutRequest: false,
         token: '',
         userInfo: null,
      })
   });

   it('ошибка при выходе setLogoutFailed', () => {
      expect(reducer(initialState, setLogoutFailed())).toEqual({
         ...initialState,
         logoutRequest: false,
         logoutFailed: true,
      })
   });

   it('запрос на обновление токена setRefreshToken', () => {
      expect(reducer(initialState, setRefreshToken())).toEqual({
         ...initialState,
         refreshTokenRequest: true,
         refreshTokenFailed: false
      })
   });

   it('получение нового токена setRefreshTokenSuccess', () => {
      const mock = {
         accessToken: "Bearer token",
      };
      const action = {
         type: setRefreshTokenSuccess,
         payload: mock,
      };
      const newMock = {
         accessToken: "token",
      };
      expect(reducer(initialState, action)).toEqual({
         ...initialState,
         token: newMock.accessToken,
         refreshTokenRequest: false
      });
   });

   it("ошибка при обновлении токена setRefreshTokenFailed", () => {
      expect(reducer(initialState, setRefreshTokenFailed())).toEqual({
         ...initialState,
         refreshTokenRequest: false,
         refreshTokenFailed: true
      })
   })

   it('запрос на получение данных user setGetUserInfo', () => {
      expect(reducer(initialState, setGetUserInfo())).toEqual({
         ...initialState,
         getUserInfoRequest: true,
         getUserInfoFailed: false
      })
   });

   it('успешное получение данных setGetUserInfoSuccess', () => {
      const action = {
         type: setGetUserInfoSuccess,
         payload: {}
      }

      expect(reducer(initialState, action)).toEqual({
         ...initialState,
         getUserInfoRequest: false,
         userInfo: action.payload,
      })
   });

   it('ошибка данных user setGetUserInfoFailed', () => {
      expect(reducer(initialState, setGetUserInfoFailed())).toEqual({
         ...initialState,
         getUserInfoRequest: false,
         getUserInfoFailed: true
      })
   });

   it('изменение данных в профиле sendUserInfo', () => {
      expect(reducer(initialState, sendUserInfo)).toEqual({
         ...initialState,
         sendUserInfoRequest: true,
         sendUserInfoFailed: false
      })
   });

   it('сохранение изменений в профиле', () => {
      const action = {
         type: sendUserInfoSuccess,
         payload: {}
      }

      expect(reducer(initialState, action)).toEqual({
         ...initialState,
         sendUserInfoRequest: false,
         userInfo: action.payload,
      })
   });

   it('ошибка при сохранение изменений профиля', () => {
      expect(reducer(initialState, sendUserInfoFailed())).toEqual({
         ...initialState,
         sendUserInfoRequest: false,
         sendUserInfoFailed: true
      })
   });

   it('вход в профиль', () => {
      expect(reducer(initialState, setLogin())).toEqual({
         ...initialState,
         loginRequest: true,
         loginFailed: false
      })
   });

   it('успешный вход', () => {
      const action = {
         type: setLoginSuccess,
         payload: {
            accessToken: "Bearer token",
            user: {}
         }
      }
      const newMock = {
         accessToken: "token",
      };

      expect(reducer(initialState, action)).toEqual({
         ...initialState,
         loginRequest: false,
         token: newMock.accessToken,
         userInfo: action.payload.user,
      })
   });

   it('ошибка входа setLoginFailed', () => {
      expect(reducer(initialState, setLoginFailed())).toEqual({
         ...initialState,
         loginRequest: false,
         loginFailed: true
      })
   });

   it('востановление пароля', () => {
      expect(reducer(initialState, setForgotPassword())).toEqual({
         ...initialState,
         forgotPasswordRequest: true,
         forgotPasswordFailed: false
      })
   });

   it('успешное востановление пароля', () => {
      expect(reducer(initialState, setForgotPasswordSuccess())).toEqual({
         ...initialState,
         forgotPasswordRequest: false
      })
   })

   it('ошибка востановления', () => {
      expect(reducer(initialState, setForgotPasswordFailed())).toEqual({
         ...initialState,
         forgotPasswordRequest: false,
         forgotPasswordFailed: true
      })
   });

   it('изменение пароля', () => {
      expect(reducer(initialState, setResetPassword())).toEqual({
         ...initialState,
         resetPasswordRequest: true,
         resetPasswordFailed: false
      })
   });

   it('успешное изменение пароля', () => {
      expect(reducer(initialState, setResetPasswordSuccess())).toEqual({
         ...initialState,
         resetPasswordRequest: false
      })
   });

   it('ошибка при изменение пароля', () => {
      expect(reducer(initialState, setResetPasswordFailed())).toEqual({
         ...initialState,
         resetPasswordRequest: false,
         resetPasswordFailed: true,
      })
   });

   it('регистрация пользователя', () => {
      expect(reducer(initialState, registrationUser())).toEqual({
         ...initialState,
         registrationRequest: true,
         registrationFailed: false
      })
   });

   it('успешная регистрация', () => {
      const mock = {
         accessToken: "Bearer token",
      };
      const action = {
         type: registrationUserSuccess,
         payload: mock,
      };
      const newMock = {
         accessToken: "token",
      };
      expect(reducer(initialState, action)).toEqual({
         ...initialState,
         token: newMock.accessToken,
         registrationRequest: false,
      });
   })

   it('ошибка при регистрации', () => {
      expect(reducer(initialState, registrationUserFailed())).toEqual({
         ...initialState,
         registrationRequest: false,
         registrationFailed: true,
      })
   });
})