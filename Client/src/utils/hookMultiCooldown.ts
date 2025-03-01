import Cookies from 'js-cookie';
import { useState, useEffect, useCallback } from 'react';

const COOLDOWN_TIME = 120; // 120 giây

const useMultiCooldown = (key: string) => {
    const [cooldown, setCooldown] = useState(0);

    const updateCooldown = useCallback(() => {
        const now = Math.floor(Date.now() / 1000);
        const storedExpiry = Cookies.get(`${key}Expiry`);
        if (storedExpiry) {
            const expiryTime = parseInt(storedExpiry, 10);
            const remaining = expiryTime - now;
            if (remaining > 0) {
                setCooldown(remaining);
            }
        } else if (cooldown > 0) {
            const expiryTime = now + cooldown;
            Cookies.set(`${key}Expiry`, expiryTime.toString(), {
                expires: 1 / 24,
                path: '/',
                secure: true,
                sameSite: 'Strict',
            });
        }
    }, [cooldown, key]);

    useEffect(() => {
        updateCooldown();

        if (cooldown > 0) {
            const timer = setInterval(() => {
                setCooldown((prev) => {
                    if (prev <= 1) {
                        Cookies.remove(`${key}Expiry`);
                        clearInterval(timer);
                        return 0;
                    }
                    const newExpiryTime = Math.floor(Date.now() / 1000) + prev - 1;
                    Cookies.set(`${key}Expiry`, newExpiryTime.toString(), {
                        expires: 1 / 24,
                        path: '/',
                        secure: true,
                        sameSite: 'Strict',
                    });
                    return prev - 1;
                });
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [cooldown, updateCooldown, key]);

    const startCooldown = useCallback(() => {
        const expiryTime = Math.floor(Date.now() / 1000) + COOLDOWN_TIME;
        Cookies.set(`${key}Expiry`, expiryTime.toString(), {
            expires: 1 / 24,
            path: '/',
            secure: true,
            sameSite: 'Strict',
        });
        setCooldown(COOLDOWN_TIME);
    }, [key]);

    return { cooldown, startCooldown };
};

export default useMultiCooldown;
