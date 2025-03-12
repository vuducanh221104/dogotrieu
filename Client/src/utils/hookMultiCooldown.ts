import Cookies from 'js-cookie';
import { useState, useEffect, useCallback } from 'react';

const COOLDOWN_TIME = 120; // 120 seconds

const useMultiCooldown = (key: string) => {
    const [cooldown, setCooldown] = useState(0);

    // Kiểm tra và cập nhật cooldown từ cookie
    const checkCooldown = useCallback(() => {
        const now = Math.floor(Date.now() / 1000);
        const storedExpiry = Cookies.get(`${key}Expiry`);

        if (storedExpiry) {
            const expiryTime = parseInt(storedExpiry, 10);
            const remaining = expiryTime - now;

            if (remaining > 0) {
                setCooldown(remaining);
                return true;
            } else {
                Cookies.remove(`${key}Expiry`, { path: '/' });
            }
        }
        return false;
    }, [key]);

    // Khởi tạo cooldown
    useEffect(() => {
        checkCooldown();
    }, [checkCooldown]);

    // Cập nhật cooldown mỗi giây
    useEffect(() => {
        if (cooldown > 0) {
            const timer = setInterval(() => {
                const now = Math.floor(Date.now() / 1000);
                const storedExpiry = Cookies.get(`${key}Expiry`);

                if (storedExpiry) {
                    const expiryTime = parseInt(storedExpiry, 10);
                    const remaining = expiryTime - now;

                    if (remaining > 0) {
                        setCooldown(remaining);
                    } else {
                        setCooldown(0);
                        Cookies.remove(`${key}Expiry`, { path: '/' });
                        clearInterval(timer);
                    }
                } else {
                    setCooldown(0);
                    clearInterval(timer);
                }
            }, 1000);

            return () => clearInterval(timer);
        }
    }, [cooldown, key]);

    // Bắt đầu cooldown mới
    const startCooldown = useCallback(() => {
        const now = Math.floor(Date.now() / 1000);
        const expiryTime = now + COOLDOWN_TIME;

        // Lưu thời gian hết hạn vào cookie
        Cookies.set(`${key}Expiry`, expiryTime.toString(), {
            expires: COOLDOWN_TIME / (24 * 60 * 60), // Chuyển đổi giây thành ngày
            path: '/',
            secure: true,
            sameSite: 'strict',
        });

        setCooldown(COOLDOWN_TIME);
    }, [key]);

    return {
        cooldown,
        startCooldown,
        checkCooldown,
    };
};

export default useMultiCooldown;
