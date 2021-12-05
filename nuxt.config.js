import colors from 'vuetify/es5/util/colors'

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head

  head: {
    title: 'nelia - oni tu są',
    htmlAttrs: {
      lang: 'pl'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'apple-touch-icon', sizes: '57x57', href: '/apple-icon-57x57.png'},
      { rel: 'apple-touch-icon', sizes: '60x60', href: '/apple-icon-60x60.png'},
      { rel: 'apple-touch-icon', sizes: '72x72', href: '/apple-icon-72x72.png'},
      { rel: 'apple-touch-icon', sizes: '76x76', href: '/apple-icon-76x76.png'},
      { rel: 'apple-touch-icon', sizes: '114x114', href: '/apple-icon-114x114.png'},
      { rel: 'apple-touch-icon', sizes: '120x120', href: '/apple-icon-120x120.png'},
      { rel: 'apple-touch-icon', sizes: '144x144', href: '/apple-icon-144x144.png'},
      { rel: 'apple-touch-icon', sizes: '152x152', href: '/apple-icon-152x152.png'},
      { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-icon-180x180.png'},
      { rel: 'icon', type: 'image/png', sizes: '192x192', href: '/android-icon-192x192.png' },
      { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
      { rel: 'icon', type: 'image/png', sizes: '96x96', href: '/favicon-96x96.png' },
      { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
      { rel: 'manifest', href: '/manifest.json' },
      { name: 'msapplication-TileColor', content: '#000' },
      { name: 'msapplication-TileImage', content: '/ms-icon-144x144.png' },
      { name: 'theme-color', content: '#000' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/vuetify-snackbar.js'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    'vuetify-dialog/nuxt'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    'nuxt-socket-io'
  ],

  io: {
    server: {
      cors: {
        origin: 'http://maluch.mikr.us:20153',
      },
    },
    sockets: [{
      url: 'http://maluch.mikr.us:20153/',
      autoConnect: false
    }]
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          alien: '#79DB75',
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extend(config, ctx) {
      config.module.rules.push({
        test: /\.(ogg|mp3|wav|mpe?g)$/i,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]'
        }
      })
    },
  },
}
