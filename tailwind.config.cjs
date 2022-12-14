const config = {
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		'./node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}'
	],
	mode: 'jit',
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				primary: '#009D65',
				primaryDarker: '#009D65',
				secondary: '#232323',
				lightText: '#898989',
				lighterText: '#727272',
				borderColor: '#009D65',
				bgColor: '#F9F6FF',
				dividerColor: '#BEBEBE',
				greenSignal: '#01CF85',
				redSignal: '#FF6D6D'
			},
			width: {
				120: '30rem'
			},
			inset: {
				12.5: '12.5%'
			},
			fontFamily: {
				primary: ['Red Hat Display', 'sans-serif'],
				secondary: ['Barlow', 'sans-serif']
			}
		}
	},

	plugins: [
		require('@tailwindcss/forms')({
			strategy: 'class'
		}),
		require('flowbite/plugin')
	]
};

module.exports = config;
