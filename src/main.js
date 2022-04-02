import Alpine from 'alpinejs'
import helpers from './helpers.js'
import intersect from '@alpinejs/intersect'
import focus from '@alpinejs/focus'
import './a11y.js'

/* SASS files are not globbed. You must manually
import them here in order to compile them. If you would like to bundle
files, you need to either add them as partials and then @import them in
another file, or adjust the webpack config files.
*/
import './scss/base.scss'
import './scss/header.scss'
import './scss/section-main-page-contact.scss'
import './scss/section-main-search.scss'
import './scss/section-main-cart.scss'
import './scss/section-main-product.scss'
import './scss/component-btn.scss'  

window.Alpine = Alpine

// Declare our namespace on the window
const namespace = 'slayed'

// Define our namespace and helpers property
window[namespace] = {
  helpers: {}
}

// Map helper functions to window[namespace].helpers
for (const [key, value] of Object.entries(helpers)) {
  window[namespace].helpers[key] = value
}

// Register Alpine plugins
Alpine.plugin(intersect)
Alpine.plugin(focus)

// Register Alpine stores
const alpineStores = require.context('./alpine/stores/', true, /\.js$/)

alpineStores.keys().forEach((key) => {
  const store = alpineStores(key).default

  const name = store.name

  Alpine.store(name, store.store())
})

// Register Alpine componentw
const alpineComponents = require.context('./alpine/components/', true, /\.js$/)

alpineComponents.keys().forEach((key) => {
  const component = alpineComponents(key).default

  // Component name will be named exactly as defined in the module
  const name = component.name

  Alpine.data(name, component.component)
})

// Register Alpine Magic Properties

const alpineMagic = require.context('./alpine/magic/', true, /\.js$/)

alpineMagic.keys().forEach((key) => {
  const magic = alpineMagic(key).default

  // Magic name will be named exactly as defined in the module
  const name = magic.name

  Alpine.magic(name, magic.callback)
})

// Register Alpine directives

const alpineDirectives = require.context('./alpine/directives/', true, /\.js$/)

alpineDirectives.keys().forEach((key) => {
  const directive = alpineDirectives(key).default

  // Magic name will be named exactly as defined in the module
  const name = directive.name

  Alpine.directive(name, directive.callback)
})

Alpine.start()

// Let the document know when the mouse is being used
document.body.addEventListener('mousedown', function() {
  document.body.classList.add('using-mouse');
});

// Re-enable focus styling when Tab is pressed
document.body.addEventListener('keydown', function(event) {
  if (event.keyCode === 9) {
    document.body.classList.remove('using-mouse');
  }
});