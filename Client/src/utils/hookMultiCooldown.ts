import Cookies from 'js-cookie';
import { useState, useEffect, useCallback } from 'react';

const COOLDOWN_TIME = 60;

const useMultiCooldown = (key: string) => {
    const [cooldown, setCooldown] = useState<number>(0);

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
                Cookies.remove(`${key}Expiry`, {
                    path: '/',
                    secure: true,
                    sameSite: 'strict',
                });
                setCooldown(0);
            }
        }
        return false;
    }, [key]);

    useEffect(() => {
        checkCooldown();

        const interval = setInterval(() => {
            checkCooldown();
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, [checkCooldown]);

    const startCooldown = useCallback(() => {
        const now = Math.floor(Date.now() / 1000);
        const expiryTime = now + COOLDOWN_TIME;

        Cookies.set(`${key}Expiry`, expiryTime.toString(), {
            expires: 1,
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
