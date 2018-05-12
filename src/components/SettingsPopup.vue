<template>
  <b-modal :active.sync="isActive" has-modal-card>
    <div class="modal-card" style="width: auto">
        <header class="modal-card-head">
          <p class="modal-card-title">Settings</p>
          <button class="delete close-modal" @click="isActive = false"></button>
        </header>
        <section class="modal-card-body">
        </section>
        <footer class="modal-card-foot">
          <button class="button is-success">Apply</button>
          <button class="button" @click="isActive = false">Close</button>
        </footer>
    </div>
  </b-modal>
</template>

<script>
export default {
  name: 'settings-popup',
  data () {
    return {
      isActive: false
    }
  }
}
</script>

<style scoped>
.modal-card-foot {
  justify-content: space-between;
}
</style>
