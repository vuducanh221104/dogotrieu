// import httpRequest from '~/utils/httpRequest';
// import { loginFailed, loginStart, loginSuccess } from './authSlice';

// export const loginUser = async (user:any, dispatch:any, navigate:any) => {
//     dispatch(loginStart());
//     try {
//         const res = await httpRequest.post('api/user/loginUser', user);
//         dispatch(loginSuccess(res.data));
//         navigate('/');
//         return res.data
//     } catch (error) {
//         dispatch(loginFailed());
//     }
// };

// export const logoutUser = async () => {
//     try {
//         // to delete coookies inside headers
//         await httpRequest.post('api/user/logoutUser');
//     } catch (err) {
//         console.log(err);
//     }
// };
export const login = () => {};
