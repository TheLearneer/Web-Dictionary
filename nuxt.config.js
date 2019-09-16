export default {
	mode: 'universal',
	head: {
		title: 'Dictionary (Unofficial)',
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{ hid: 'og:description', name: 'og:description', content: 'Replica of Google dictionary using unofficial Google API!' },
			{ hid: 'author', name: 'author', content: 'Santosh Bhandari' }
		],
		link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
	},
	loading: { color: '#fff' },
	modules: [
		'@nuxtjs/axios',
		'nuxt-buefy'
	],
	axios: {
		proxy: true
	},
	proxy: {
		'/api/': { target: 'https://googledictionaryapi.eu-gb.mybluemix.net', pathRewrite: { '^/api/': '' } }
	},
	generate: {
		fallback: '404.html'
	}
}