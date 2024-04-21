import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function useDebounce(value: any, delay: number) {
    const [debouncedValue, setDebounceValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => setDebounceValue(value), delay);
        return () => clearTimeout(handler);
    }, [value]);

    return debouncedValue;
}

useDebounce.propTypes = {
    value: PropTypes.number.isRequired,
    delay: PropTypes.number.isRequired,
};

export default useDebounce;
