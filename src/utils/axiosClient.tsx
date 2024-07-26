import axios from 'axios';

axios.interceptors.request.use(function (config) {
    config.headers['ApiKey'] = 'b7b77702-b4ec-4960-b3f7-7d40e44cf5f4'
    return config;
  }, function (error) {
    return Promise.reject(error);
  });

export default axios;