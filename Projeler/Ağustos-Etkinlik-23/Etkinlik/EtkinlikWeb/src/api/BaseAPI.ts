import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import 'react-toastify/dist/ReactToastify.css';
// import * as environment from "../config/environment"



export abstract class BaseAPI {
  protected axiosInstance: AxiosInstance | any = null;
   
  constructor(baseUrl: string) {
    this.axiosInstance = axios.create({
      baseURL: baseUrl,
      withCredentials: true
    });

    this.initializeInterceptors();
  }
  
  protected get (endpoint?: string, params?: any): Promise<any> {
    return this.axiosInstance.get(endpoint, params).then((response:any) => {
      return response.data;
    });
  }
  protected getFile (endpoint?: string, params?: any): Promise<any> {
    params.responseType = 'blob'; 
    params.observe = 'response';
    return this.axiosInstance.post(endpoint, params).then((response:any) => {
      return response;
    });
  }

  protected post (endpoint: string, params?: any): Promise<any> {
    
      return this.axiosInstance.post(endpoint, params).then((response:any) => {
        return response.data;
      });
    
  }

  private initializeInterceptors() {
    this.axiosInstance.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        // Burada token'ınızı storage'dan alıyoruz, örneğin localStorage kullanılmıştır
        const token = localStorage.getItem('token');
        config.headers = config.headers || {};
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error:any) => {
        return Promise.reject(error);
      }
    );
  }
  
  
}