const ádasd = 1;
export default ádasd;
// import axios from 'axios';

// import { store } from '@/redux/store';
// import { loginSuccess, logOutSuccess } from '@/redux/authSlice';
// import { logout } from '@/redux/apiRequest';
// import { jwtDecode } from 'jwt-decode';

// const refreshToken = async (navigate: any) => {
//     try {
//         const res = await axios.post(
//             process.env.REACT_APP_BASE_URL + 'api/user/refresh',
//             {},
//             { withCredentials: true },
//         );
//         return res.data;
//     } catch (error: any) {
//         console.log(error);
//         if (error.response.status === 403) {
//             await logout();
//             store.dispatch(logOutSuccess());
//             navigate('/login');
//         }
//         return null;
//     }
// };

// const checkAccessToken = async (user: any, navigate: any) => {
//     if (user && typeof user.accessToken === 'string') {
//         const now = new Date().getTime() / 1000;
//         const decodedToken = jwtDecode(user.accessToken);
//         if (decodedToken.exp && decodedToken.exp < now) {
//             const data = await refreshToken(navigate);
//             if (data) {
//                 const refreshedUser = {
//                     ...user,
//                     accessToken: data.accessToken,
//                 };
//                 store.dispatch(loginSuccess(refreshedUser));
//                 return data.accessToken;
//             } else {
//                 return null;
//             }
//         }
//         return user.accessToken;
//     }
//     return null;
// };

// export const axiosInstance = async (navigate: any) => {
//     const user = store.getState().auth.login.currentUser;
//     const accessToken = await checkAccessToken(user, navigate);

//     const instance = axios.create({
//         baseURL: process.env.REACT_APP_BASE_URL,
//         headers: {
//             Authorization: `Bearer ${accessToken}`,
//         },
//     });

//     instance.interceptors.request.use(
//         async (config) => {
//             const user = store.getState().auth.login.currentUser;
//             const accessToken = await checkAccessToken(user, navigate);
//             if (accessToken) {
//                 config.headers['Authorization'] = `Bearer ${accessToken}`;
//             }
//             return config;
//         },
//         (error) => {
//             return Promise.reject(error);
//         },
//     );

//     instance.interceptors.response.use(
//         (response) => response,
//         async (error) => {
//             if (error.response.status === 403) {
//                 await logout();
//                 store.dispatch(logOutSuccess());
//                 navigate('/login');
//             }
//             return Promise.reject(error);
//         },
//     );

//     return instance;
// };

// export default axiosInstance;
