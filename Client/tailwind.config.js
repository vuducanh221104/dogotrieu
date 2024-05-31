/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './app/**/*.{js,ts,jsx,tsx,mdx}', // Note the addition of the `app` directory.
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        // Or if using `src` directory:
        './src/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    corePlugins: {
        preflight: false,
    },
    theme: {
        screens: {
            sm: '480px',
            md: '768px',
            lg: '991px',
            xl: '1440px',
            'max-sm': { max: '480px' },
            'max-md': { max: '768px' },
            'max-lg': { max: '990px' },
            'max-xl': { max: '1440px' },
            'max-min-lg': { min: '480px', max: '990px' },
        },
    },
    plugins: [],
};
