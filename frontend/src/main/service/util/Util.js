import axios from "axios";
import { useParams } from "react-router-dom";

export const API_BASE_URL = 'http://localhost:8080/jumpstart';
export const ACCESS_TOKEN = 'accessToken';
export const Axioinstance = axios.create();

Axioinstance.interceptors.request.use(
    config => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (token) {
            config.headers['Authorization'] = 'Bearer ' + token;
        }
        return config;
    },
    error => {Promise.reject(error)}
);

export const withRouter = WrappedComponent => props => {
    const params = useParams();
    // etc... other react-router-dom v6 hooks
  
    return (
      <WrappedComponent
        {...props}
        params={params}
       
      />
    );
  };