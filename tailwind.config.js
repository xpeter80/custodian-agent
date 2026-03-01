/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
            },
            colors: {
                copper: {
                    400: '#F0A670',
                    500: '#E08E55',
                    600: '#C07040',
                    900: '#4A2510',
                },
                midnight: {
                    800: '#1A1412',
                    900: '#0F0503',
                    950: '#050201',
                }
            },
            animation: {
                'fade-in-up': 'fadeInUp 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) backwards',
                'modal-enter': 'modalEnter 0.4s cubic-bezier(0.19, 1, 0.22, 1) forwards',
            },
            keyframes: {
                fadeInUp: {
                    from: { opacity: '0', transform: 'translateY(40px)' },
                    to: { opacity: '1', transform: 'translateY(0)' },
                },
                modalEnter: {
                    from: { opacity: '0', transform: 'scale(0.95) translateY(10px)', filter: 'blur(8px)' },
                    to: { opacity: '1', transform: 'scale(1) translateY(0)', filter: 'blur(0)' },
                },
            },
        },
    },
    plugins: [],
}
