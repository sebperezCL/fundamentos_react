import axios from 'axios';

const { REACT_APP_API_BASE_URL: baseURL } = process.env;

const client = axios.create({
  baseURL,
});

const setAuthorizationHeader = (token) => {
  client.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

client.login = (credentials) =>
  client.post('/auth/login', credentials).then((auth) => {
    setAuthorizationHeader(auth.accessToken);
    return auth;
  });

client.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (!error.response) {
      return Promise.reject({ message: error.message });
    }
    return Promise.reject({
      message: error.response.statusText,
      ...error.response.data,
    });
  }
);

export const configureClient = (accessToken) => {
  if (accessToken) {
    setAuthorizationHeader(accessToken);
  }
};

export default client;
