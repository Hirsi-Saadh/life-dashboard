/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,jsx}'],
    theme: {
        extend: {
            colors: {
                bg: '#0B0B0F',
                card: '#111217',
                cardSoft: '#151821',
                line: 'rgba(255,255,255,0.08)',
                muted: '#9AA0AE',
                text: '#F5F7FA',
                accent: '#C6A15B',
                accentBlue: '#3A7AFE',
                success: '#1E8E5A',
                planned: '#6B7280',
            },
            boxShadow: {
                premium: '0 8px 30px rgba(0, 0, 0, 0.32)',
                glow: '0 0 0 1px rgba(198, 161, 91, 0.12), 0 12px 40px rgba(0,0,0,0.32)',
            },
            borderRadius: {
                xl2: '1.25rem',
            },
            fontFamily: {
                sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
            },
            backgroundImage: {
                radialPremium:
                    'radial-gradient(circle at top, rgba(198, 161, 91, 0.14), transparent 28%), radial-gradient(circle at 85% 10%, rgba(58, 122, 254, 0.10), transparent 24%)',
            },
            keyframes: {
                fadeUp: {
                    '0%': { opacity: '0', transform: 'translateY(10px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                pulseSoft: {
                    '0%, 100%': { opacity: '0.6' },
                    '50%': { opacity: '1' },
                },
            },
            animation: {
                fadeUp: 'fadeUp 0.45s ease-out',
                pulseSoft: 'pulseSoft 2.2s ease-in-out infinite',
            },
        },
    },
    plugins: [],
};