import type { Config } from "tailwindcss";

const config = {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
  	container: {
  		center: true,
  		padding: '2rem',
  		screens: {
  			'2xl': '1400px'
  		}
  	},
  	extend: {
  		fontFamily: {
  			serif: ['Playfair Display', 'Georgia', 'serif'],
  			body: ['Source Serif 4', 'Georgia', 'Times New Roman', 'serif'],
  			mono: ['IBM Plex Mono', 'monospace'],
  		},
  		colors: {
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			/* 1980s Magazine Colors */
  			cream: {
  				50: '#fefdfb',
  				100: '#fdf9f3',
  				200: '#faf3e6',
  				300: '#f5e9d4',
  				400: '#eddcbc',
  				500: '#e3cca0',
  				600: '#d4b77f',
  				700: '#c19f5c',
  				800: '#a58343',
  				900: '#886b38',
  			},
  			wine: {
  				50: '#fdf2f4',
  				100: '#fce7ea',
  				200: '#f9d2d9',
  				300: '#f4adb9',
  				400: '#ec7d91',
  				500: '#df506b',
  				600: '#c93352',
  				700: '#a82744',
  				800: '#8c233d',
  				900: '#772139',
  			},
  			sepia: {
  				50: '#faf8f5',
  				100: '#f3efe8',
  				200: '#e5ddd0',
  				300: '#d4c6b0',
  				400: '#c0aa8d',
  				500: '#b09574',
  				600: '#a38363',
  				700: '#886b52',
  				800: '#705847',
  				900: '#5c493c',
  			},
  			charcoal: {
  				50: '#f6f5f4',
  				100: '#e7e5e3',
  				200: '#d0ccc7',
  				300: '#b4aea6',
  				400: '#968d83',
  				500: '#7b7268',
  				600: '#635c54',
  				700: '#514b45',
  				800: '#45403b',
  				900: '#3c3834',
  			},
  			/* Brown color palette to replace violet */
  			brown: {
  				50: '#fdf8f6',
  				100: '#f2e8e5',
  				200: '#eaddd7',
  				300: '#e0cec7',
  				400: '#d2bab0',
  				500: '#bfa094',
  				600: '#a18072',
  				700: '#977669',
  				800: '#846358',
  				900: '#43302b',
  				950: '#2d1f1b',
  			},
  			/* Amber/orange accent color */
  			amber: {
  				50: '#fffbeb',
  				100: '#fef3c7',
  				200: '#fde68a',
  				300: '#fcd34d',
  				400: '#fbbf24',
  				500: '#f59e0b',
  				600: '#d97706',
  				700: '#b45309',
  				800: '#92400e',
  				900: '#78350f',
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			},
  			blob: {
  				'0%': {
  					transform: 'translate(0px, 0px) scale(1)'
  				},
  				'33%': {
  					transform: 'translate(30px, -50px) scale(1.1)'
  				},
  				'66%': {
  					transform: 'translate(-20px, 20px) scale(0.9)'
  				},
  				'100%': {
  					transform: 'translate(0px, 0px) scale(1)'
  				}
  			},
  			'loading-dot': {
  				'0%': {
  					opacity: '0.2',
  					transform: 'translateX(-2px) scale(0.8)'
  				},
  				'50%': {
  					opacity: '0.8',
  					transform: 'translateX(2px) scale(1)'
  				},
  				'100%': {
  					opacity: '0.2',
  					transform: 'translateX(-2px) scale(0.8)'
  				}
  			},
  			shine: {
  				'0%': {
  					'background-position': '0% 0%'
  				},
  				'50%': {
  					'background-position': '100% 100%'
  				},
  				to: {
  					'background-position': '0% 0%'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
  			blob: 'blob 8s infinite',
  			shine: 'shine var(--duration) infinite linear'
  		},
  		typography: {
  			xxxs: {
  				css: {
  					fontSize: '0.625rem',
  					h1: {
  						fontSize: '1rem'
  					},
  					h2: {
  						fontSize: '0.875rem'
  					},
  					h3: {
  						fontSize: '0.75rem'
  					},
  					h4: {
  						fontSize: '0.625rem'
  					}
  				}
  			},
  			xxs: {
  				css: {
  					fontSize: '0.75rem',
  					h1: {
  						fontSize: '1.25rem'
  					},
  					h2: {
  						fontSize: '1.15rem'
  					},
  					h3: {
  						fontSize: '1rem'
  					},
  					h4: {
  						fontSize: '0.875rem'
  					}
  				}
  			}
  		}
  	}
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/container-queries"),
    require("@tailwindcss/typography")
  ],
} satisfies Config;

export default config;
