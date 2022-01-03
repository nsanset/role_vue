import axios from 'axios';

const API_URL = 'http://31.172.69.136:3000/';

class AuthService {
  login(user) {
    return axios
      .post(API_URL + 'signin', {
        username: user.username,
        password: user.password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem('user');
  }

  register(user) {
    return axios.post(API_URL + 'signup', {
      username: user.username,
      firstName: user.firstName,
      status: user.status,
      lastName: user.lastName,
      email: user.email,
      password: user.password

    });
  }
}

export default new AuthService();