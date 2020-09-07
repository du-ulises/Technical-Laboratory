import axios from "axios";
import store from '../store'

export default function setup() {
  // Add a response interceptor
  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response.status) {
        //Handling different error status using Switch caase
        switch (error.response.status) {
          case 400:
            store.commit("setErrorInterceptor", true);
            break;
          case 401:
            store.commit("setErrorInterceptor", true);
            break;
          case 403:
            store.commit("setErrorInterceptor", true);
            break;
          case 404:
            store.commit("setErrorInterceptor", true);
            break;
          case 500:
            store.commit("setErrorInterceptor", true);
        }
      }
    }
  );
}
