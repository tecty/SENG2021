import Cookies from 'js-cookie';

const url = 'http://127.0.0.1:8000/api/v1/';

const auth = {
  register(username, email, password, passwordConfirm) {
    return fetch(`${url}rest-auth/registration/`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        email: email,
        password1: password,
        password2: passwordConfirm
      })
    }).then(response => {
      return response.json();
    }, networkError => console.log(networkError.message)).then(jsonResponse => {
      if (jsonResponse == null) return null;
      if (jsonResponse.key) Cookies.set('token', jsonResponse.key, { expires: 1 });
      return {
        username: jsonResponse.username,
        email: jsonResponse.email,
        password1: jsonResponse.password1,
        password2: jsonResponse.password2,
        non_field_errors: jsonResponse.non_field_errors,
        key: jsonResponse.key,
      }
    })
  },

  login(username, password) {
    return fetch(`${url}rest-auth/login/`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        email: "",
        password: password,
      })
    }).then(response => {
      return response.json();
    }, networkError => console.log(networkError.message)).then(jsonResponse => {
      if (jsonResponse == null) return {};
      if (jsonResponse.key) Cookies.set('token', jsonResponse.key, { expires: 1 });
      return {
        username: jsonResponse.username,
        password: jsonResponse.password,
        non_field_errors: jsonResponse.non_field_errors,
        key: jsonResponse.key,
      }
    })
  },

  getUserStatus() {
    const token = Cookies.get('token');
    return fetch(`${url}rest-auth/user/`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json', 
        Authorization: `Token ${token}`
      }
    }).then(response => {
      console.log(response);
      return response.json();
    }, networkError => console.log(networkError.message)).then(jsonResponse => {
      console.log(jsonResponse);
      return {
        authorized: (jsonResponse.pk) ? true : false,
        user: (jsonResponse.pk) ? {
          username: jsonResponse.username,
          email: jsonResponse.email,
          first_name: jsonResponse.first_name,
          last_name: jsonResponse.last_name,
        } : {},
      }
    })
  },

  logout() {
    return fetch(`${url}rest-auth/logout/`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then(response => {
      return response.json();
    }, networkError => console.log(networkError.message)).then(jsonResponse => {
      if (jsonResponse == null) return {};
      if (jsonResponse.detail === "Successfully logged out.") {
        Cookies.set('token', null);
        return { success: true }
      }
      return { success: false }
    })
  },

  facebookLogin(accessToken) {
    return fetch(`${url}rest-auth/facebook/`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        access_token: accessToken,
        code: ""
      })
    }).then(response => {
      return response.json();
    }, networkError => console.log(networkError.message)).then(jsonResponse => {
      if (jsonResponse == null) return {};
      if (jsonResponse.key) Cookies.set('token', jsonResponse.key, { expires: 1 });
      return {
        success: jsonResponse.key ? true : false,
      }
    }) 
  }
}

export default auth;