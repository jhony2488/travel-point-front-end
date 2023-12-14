/* eslint-disable no-undef */
import axios from 'axios';

export const token='Bearer eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTY4NDQyMzA0NSwiaWF0IjoxNjg0NDIzMDQ1fQ.3GDYc4YE0FhkUqz1vEaMAfASfbJbJll76yDt-h93fNo'

const api = axios.create({
    baseURL: 'https://travel-manager-k9cw.onrender.com',
});

api.defaults.headers.post['Content-Type'] =  'multipart/form-data';

api.defaults.headers.post['Accept'] =  'multipart/form-data';

api.defaults.headers.common.Authorization = token;

 
export { api };
