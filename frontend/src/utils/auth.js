const url = 'http://localhost:8000/api/v1/';

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
      if (jsonResponse == null) return null;
      return {
        username: jsonResponse.username,
        password: jsonResponse.password,
        non_field_errors: jsonResponse.non_field_errors,
        key: jsonResponse.key,
      }
    })
  }
}

export default auth;