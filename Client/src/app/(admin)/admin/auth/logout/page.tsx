'use client';
import { adminLogOutStart, adminLogOutSuccess, adminLogOutFailed } from '@/redux/adminAuthSlice';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next-nprogress-bar';
import config from '@/config';
import { authAdminLogout } from '@/services/authServices';

function Logout() {
    const router = useRouter();
    const dispatch = useDispatch();

    useEffect(() => {
        const handleLogOut = async () => {
            try {
                dispatch(adminLogOutStart());
                await authAdminLogout();
                dispatch(adminLogOutSuccess());
                router.replace(config.routesAdmin.login);
            } catch (error) {
                dispatch(adminLogOutFailed());
                router.replace(config.routesAdmin.dashboard);
            }
        };
        handleLogOut();
    }, [dispatch, router]);

    return null;
}

export default Logout;
