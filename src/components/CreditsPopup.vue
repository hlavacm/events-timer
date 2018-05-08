<template>
  <b-modal :active.sync="isActive" has-modal-card>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Credits v2.0</p>
        <button class="delete close-modal" @click="isActive = false"></button>
      </header>
      <section class="modal-card-body">
        <div class="content">
          <p>
            This is a simple countdown application with two time dependent notifications. The application main target group is speakers
            at events, conferences, etc.
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
            <li><a href="https://www.iconfinder.com/icons/1790665/clock_deadline_hourglass_timer_wait_icon" title="Clock, deadline, hourglass, timer, wait icon" target="_blank">Timer Icon</a></li>
            <li><a href="https://www.iconfinder.com/iconsets/ionicons" title="Free SVG Ionicons" target="_blank">Ionicons</a></li>
            <li><a href="https://pages.github.com" title="Websites for you and your projects" target="_blank">GitHub Pages</a></li>
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
  name: 'CreditsPopup',
  data () {
    return {
      isActive: false
    }
  }
}
</script>

<style scoped>

</style>
