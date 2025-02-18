import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://core-skill-test.webc.in/employee-portal',
});

// Interceptor to add Authorization header for every request if token exists in localStorage
axiosInstance.interceptors.request.use(
  (config) => {
    // Retrieve the token from recoil-persist in localStorage
    const persistedState = localStorage.getItem('recoil-persist');
    if (persistedState) {
      const parsedState = JSON.parse(persistedState);
      console.log(parsedState,"parsedState");
      
      const auth = parsedState.authState; // Extract the token from authState field
      if (auth) {
        config.headers['Authorization'] = `Bearer ${auth}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
