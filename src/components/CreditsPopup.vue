<template>
  <b-modal :active.sync="isActive">
    <div class="modal-card" style="width: auto">
      <header class="modal-card-head">
        <p class="modal-card-title">Credits v2.0</p>
        <button class="delete close-modal" @click="isActive = false"></button>
      </header>
      <section class="modal-card-body">
        <div class="content">
          <p>
            This is a simple countdown application with two time dependent notifications.
          </p>
          <p>
            The application's main target group are speakers at events, conferences, etc.
          </p>
          <p>Copyright &copy; <a href="http://hlavacm.net" target="_blank">Martin Hlaváč</a> 2017-2018</p>
        </div>
        <div class="content is-small">
          <p>Used:</p>
          <ul>
            <li><a href="http://bulma.io" title="A modern CSS framework based on Flexbox" target="_blank">Bulma</a></li>
            <li><a href="https://fonts.google.com/specimen/Roboto+Condensed" title="Roboto Condensed - Google Fonts" target="_blank">Roboto Condesed</a></li>
            <li><a href="https://vuejs.org/" title="Vue.js - The Progressive JavaScript Framework" target="_blank">Vue.js</a></li>
            <li><a href="https://github.com/vuejs/vue-cli" title="CLI for rapid Vue.js development" target="_blank">vue-cli</a></li>
            <li><a href="https://github.com/vuejs-templates/webpack" title="A full-featured Webpack setup" target="_blank">vue-webpack-boilerplate</a></li>
            <li><a href="https://buefy.github.io/" title="Lightweight UI components for Vue.js based on Bulma" target="_blank">Buefy</a></li>
            <li><a href="https://momentjs.com/" title="Parse, validate, manipulate, and display dates and times in JavaScript." target="_blank">Moment.js</a></li>
            <li><a href="https://www.iconfinder.com/iconsets/ionicons" title="Free SVG Ionicons" target="_blank">Ionicons</a></li>
            <li><a href="https://pages.github.com" title="Websites for you and your projects" target="_blank">GitHub Pages</a> (<a href="https://github.com/hlavacm/events-timer" target="_blank">repo</a>)</li>
          </ul>
        </div>
      </section>
      <footer class="modal-card-foot">
          <button class="button" type="button" @click="isActive = false">OK</button>
      </footer>
  </div>
  </b-modal>
</template>

<script>
export default {
  name: 'credits-popup',
  data () {
    return {
      isActive: false
    }
  }
}
</script>
