'use client';
import { logOutSuccess } from '@/redux/authSlice';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next-nprogress-bar';
import config from '@/config';

function Logout() {
    const router = useRouter();
    const dispatch = useDispatch();

    useEffect(() => {
        const handleLogOut = () => {
            dispatch(logOutSuccess());
        };
        handleLogOut();
    }, []);

    return router.push(config.routesAdmin.login);
}

export default Logout;
