/* eslint-disable no-undef */
import axios from 'axios';

export const token='Bearer eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTY4NDQyMzA0NSwiaWF0IjoxNjg0NDIzMDQ1fQ.3GDYc4YE0FhkUqz1vEaMAfASfbJbJll76yDt-h93fNo'

const api = axios.create({
    baseURL: 'http://localhost',
});

api.defaults.headers.post['Content-Type'] = 'application/json';

api.defaults.headers.common.Authorization = token;

 
export { api };
