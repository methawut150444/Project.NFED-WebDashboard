/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // ✅ Include App Router files
    "./components/**/*.{js,ts,jsx,tsx}", // ✅ Include components folder
    "./pages/**/*.{js,ts,jsx,tsx}", // ✅ Include Pages Router (if using)
  ],
  theme: {
    extend: {
      backgroundImage: {
        'cubes-pattern': "url('https://www.transparenttextures.com/patterns/cubes.png')",
        'gplay-pattern': "url('https://www.transparenttextures.com/patterns/gplay.png')",
      },
      borderRadius: {
        'xs': '1px',
      },
      colors: {
        calendarBg: '#ffffff',
        calendarHighlight: '#4F46E5',
        'Blue_NFED_0': '#2C4C9D',
        'Blue_NFED_1': '#3C82F6',
        'Blue_NFED_2': '#5CB6FA',
        'Blue_NFED_3': '#C4E8FF',
        'Blue_NFED_4': '#AECDE2',
        'Blue_NFED_5': '#C7E2F1',
        'Blue_NFED_6': '#F0F9FF',
        'Blue_NFED_7': '#DFE9F1',
        'Blue_IMU': '#1876D2',
        'CU_Gray': '#707070',
        'Base_Gray': 'text-gray-600',
        'Aluminium_Gray_1': '#EEEEF0',
        'Aluminium_Gray_2': '#D7D7D9',
        'P_Jumbo_color_0': '#80af52',

        // * AQI Weather Station color
        'AQI_1': '#02B050',
        'AQI_2': '#FADE5A',
        'AQI_3': '#FF9900',
        'AQI_4': '#EC1E24',
        'AQI_5': '#7F4599',
        'AQI_6': '#800100',
        
      },
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
        geist: ['var(--font-geist-sans)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};