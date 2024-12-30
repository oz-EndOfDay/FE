import type {Config} from "tailwindcss";

const config: Config = {
    content: ["./src/app/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}"],
    theme: {
        extend: {
            colors: {
                // 배경색 (bg-${primary})
                primary: "#A3C293",
                secondary: "#FDFBF8",
                navy: "#545F71",
                beige: "#FDFBF8",
                sand: "#E7CCA9",
                warmgray: "#F3F3F3",
                coolgray: "#F2F4F8", // input color
                // 글자색 (text-${black})
                black: "#000000",
                white: "#FFFFFF",
                brown: "#4A2C1A",
                gray: "#697077", // diabled, readonly color
                lightgray: "#eeeeee", // line color
            },
            screens: {
                below540: {max: "540px"},
            },
            keyframes: {
                bounceY: {
                    "0%, 100%": {transform: "translateY(0)"},
                    "50%": {transform: "translateY(-10px)"},
                },
            },
            animation: {
                bounceY: "bounceY 1.5s infinite",
            },
        },
    },
    plugins: [],
};
export default config;
