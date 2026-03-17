import axios from 'axios';

// withCredentials ensures ASP.NET Identity cookies are sent on every request.
// In dev the Vite proxy forwards /api → https://freelance-billingops-1.onrender.com
// so the browser sees same-origin requests and CORS is never triggered.
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL as string,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Handle 401 globally — redirect to login when the session cookie expires
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default apiClient;
