
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
        screens: {
              "3xl": "1720px", // 👈 Custom breakpoint
              "4xl": "1800px", // 👈 Custom breakpoint


        },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        // Add more custom font families as needed
      },
      colors:{
        "primary":"#111212",
        'regel-gray':'#6c757d',
        'light-gray':'#EAEAEA',
        'new-gray':'#383838',
        'new-yellow':"#dfa700",
        "description":'#323232',
         "new-green":"#26d367",
         'khaki':"rgba(255, 245, 235, 1)",
         "navyblue":"rgb(25, 118, 210)",
         "secondary":"rgba(186, 92, 92, 0.13)"
      },
      dropShadow:{
       "card":"0px 2px 3px -1px rgba(0,0,0,0.1), 0px 1px 0px 0px rgba(25,28,33,0.02), 0px 0px 0px 1px rgba(25,28,33,0.08)"
      }
    },
  },
  plugins: [],
}