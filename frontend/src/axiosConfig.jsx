import axios from 'axios';

const axiosInstance = axios.create({
  //baseURL: 'http://localhost:5001', // local
  baseURL: 'http://13.236.200.125:5001', // live
  headers: { 'Content-Type': 'application/json' },
});
// change ip to 13.236.200.125
// change ip to 13.236.200.125
export default axiosInstance;
