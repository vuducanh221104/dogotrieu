import { useState, useEffect } from 'react';

function useDebounce(value: string, delay: number) {
    const [debouncedValue, setDebounceValue] = useState<number | string>(value);

    useEffect(() => {
        const handler = setTimeout(() => setDebounceValue(value), delay);
        return () => clearTimeout(handler);
    }, [value]);

    return debouncedValue;
}

export default useDebounce;
