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
            if (typeof window !== 'undefined') {
                router.replace(config.routesAdmin.login);
            }
        };
        handleLogOut();
    }, [dispatch, router]);

    return null;
}

export default Logout;
