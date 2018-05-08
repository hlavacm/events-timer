<template>
  <b-modal :active.sync="isActive" has-modal-card>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Settings</p>
        <button class="delete close-modal" @click="isActive = false"></button>
      </header>
      <section class="modal-card-body">
        <div class="field is-horizontal">
          <div class="field-label is-normal">
            <label class="label">Countdown:</label>
          </div>
          <div class="field-body">
            <div class="field">
              <p class="control has-icons-right">
                <input name="countdown-hours" type="number" min="0" max="23" placeholder="00" class="input" required>
                <span class="icon is-normal is-right">HH</span>
              </p>
            </div>
          </div>
        </div>
        <div class="field is-horizontal">
          <div class="field-label is-normal">
            <label class="label"></label>
          </div>
          <div class="field-body">
            <div class="field">
              <p class="control has-icons-right">
                <input name="countdown-hours" type="number" min="0" max="59" placeholder="00" class="input"
                  required>
                <span class="icon is-normal is-right">MM</span>
              </p>
            </div>
          </div>
        </div>
        <div class="field is-horizontal">
          <div class="field-label is-normal">
            <label class="label"></label>
          </div>
          <div class="field-body">
            <div class="field">
              <p class="control has-icons-right">
                <input name="countdown-seconds" type="number" min="0" max="59" placeholder="00" class="input"
                  required>
                <span class="icon is-normal is-right">SS</span>
              </p>
            </div>
          </div>
        </div>
        <div class="field is-horizontal">
          <div class="field-label is-normal">
            <label class="label">Warning at:</label>
          </div>
          <div class="field-body">
            <div class="field">
              <p class="control has-icons-right">
                <input name="warning" type="number" min="0" max="100" placeholder="00" class="input" required>
                <span class="icon is-normal is-right">%</span>
              </p>
            </div>
          </div>
        </div>
        <div class="field is-horizontal">
          <div class="field-label is-normal">
            <label class="label">Pulse at:</label>
          </div>
          <div class="field-body">
            <div class="field">
              <p class="control has-icons-right">
                <input name="pulse" type="number" min="0" max="100" placeholder="00" class="input" required>
                <span class="icon is-normal is-right">%</span>
              </p>
            </div>
          </div>
        </div>
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
