import Cookies from 'js-cookie';
import randomColor from 'randomcolor';

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
      if (jsonResponse.key) {
        Cookies.set('token', jsonResponse.key, { expires: 1 });
        const color = randomColor();
        Cookies.set('avatarColor', color, { expires: 1});
      }
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
      if (jsonResponse.key) {
        Cookies.set('token', jsonResponse.key, { expires: 1 });
        const color = randomColor();
        Cookies.set('avatarColor', color, { expires: 1});
      }
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
        Cookies.remove('token');
        Cookies.remove('avatarColor');
        return { success: true }
      }
      return { success: false }
    })
  },

  changePassword(password1, password2) {
    const token = Cookies.get('token');
    return fetch(`${url}rest-auth/password/change/`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json', 
        Authorization: `Token ${token}`
      },
      body: JSON.stringify({
        new_password1: password1,
        new_password2: password2,
      })
    }).then(response => {
      console.log(response);
      return response.json();
    }, networkError => console.log(networkError.message)).then(jsonResponse => {
      console.log(jsonResponse);
      const detail = jsonResponse.detail ? jsonResponse.detail : null;
      const success = (detail && detail === "New password has been saved.") ? true : false;
      
      return {
        success: success,
        detail: detail,
        password1: jsonResponse.new_password1,
        password2: jsonResponse.new_password2,
        non_field_errors: jsonResponse.non_field_errors,
      }
    })
  },

  changeUserInfo(username, first_name, last_name) {
    const token = Cookies.get('token');
    return fetch(`${url}rest-auth/user/`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json', 
        Authorization: `Token ${token}`
      },
      body: JSON.stringify({
        username: username,
        first_name: first_name,
        last_name: last_name,
      })
    }).then(response => {
      console.log(response);
      return response.json();
    }, networkError => console.log(networkError.message)).then(jsonResponse => {
      console.log(jsonResponse);
      const success = (jsonResponse.pk) ? true : false;
      
      return {
        success: success,
        detail: jsonResponse.detail,
        username: jsonResponse.username,
        first_name: jsonResponse.first_name,
        last_name: jsonResponse.last_name,
        non_field_errors: jsonResponse.non_field_errors,
      }
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