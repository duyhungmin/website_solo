    import axios from 'axios';

    const   ClientAxios = axios.create({
        baseURL: 'http://localhost:3000',
        headers: {
            'Content-Type': 'application/json',
        },

        timeout:10000

    });
    
    ClientAxios.interceptors.response.use(
    (response) => response.data,
    (error) => Promise.reject(error)
    );

    ClientAxios.interceptors.request.use((config) => {
      const token = localStorage.getItem('token');
      console.log('Axios: token from localStorage:', token);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        console.log('Axios: set Authorization header');
      }
      return config;
    }, (error) => Promise.reject(error));


    export default ClientAxios;