'use client';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next-nprogress-bar';
import { logOutFailed, logOutStart, logOutSuccess } from '@/redux/authSlice';
import { authLogout } from '@/services/authServices';
import routes from '@/config/routes';

function PageLogout() {
    const dispatch = useDispatch();
    const router = useRouter();

    useEffect(() => {
        const handleLogout = async () => {
            dispatch(logOutStart());
            try {
                await authLogout();
                dispatch(logOutSuccess());
                router.replace(routes.user.home);
            } catch (err) {
                dispatch(logOutFailed());
            }
        };
        handleLogout();
    }, [dispatch, router]);

    return null;
}

export default PageLogout;
