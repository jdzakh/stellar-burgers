import { baseUrl } from './baseURL'

class Api {
  private _baseUrl: string;
  constructor(data: string) {
    this._baseUrl = data;
  }

  _requestResult(res: Response) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(
        `Ошибка: ${res.status} - ${res.statusText}`
      );
    }
  }

  fetchOrders = (token?: string) => {
    let url = `${this._baseUrl}/orders/all`;
    return fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    }).then((res) => this._requestResult(res));
  };

  getIngredients() {
    return fetch(`${this._baseUrl}/ingredients`).then((res) => this._requestResult(res));
  }

  sendIngredients(ingredientsIds: string[], token?: string) {
    return fetch(`${this._baseUrl}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        ingredients: ingredientsIds,
      }),
    }).then((res) => this._requestResult(res));
  }

  sendEmail(email: string) {
    return fetch(`${this._baseUrl}/password-reset`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
      }),
    }).then((res) => this._requestResult(res));
  }

  resetPassword(password: string, code: string) {
    return fetch(`${this._baseUrl}/password-reset/reset`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: password,
        token: code,
      }),
    }).then((res) => this._requestResult(res));
  }

  login(email: string, password: string) {
    return fetch(`${this._baseUrl}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    }).then((res) => this._requestResult(res));
  }

  register(email: string, name: string, password: string) {
    return fetch(`${this._baseUrl}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        name,
      }),
    }).then((res) => this._requestResult(res));
  }

  getUserData(token: string) {
    return fetch(`${this._baseUrl}/auth/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => this._requestResult(res));
  }

  sendUserInfo(token: string, name: string, email: string, password: string) {
    return fetch(`${this._baseUrl}/auth/user`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        "email": email,
        "name": name,
        "password": password
      }),
    }).then((res) => this._requestResult(res));
  }

  refreshToken(refreshToken: string) {
    return fetch(`${this._baseUrl}/auth/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "token": refreshToken
      }),
    }).then((res) => this._requestResult(res));
  }

  logout(refreshToken: string | null) {
    return fetch(`${this._baseUrl}/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "token": refreshToken
      }),
    }).then((res) => this._requestResult(res));
  }
}

const mainApi = new Api(baseUrl);

export default mainApi;