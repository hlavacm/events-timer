<template>
  <button class="button" v-bind:class="colorClass" :disabled="disabled" @click="$emit('clicked')">
    <slot></slot><span>{{ title }}</span>
  </button>
</template>

<script>
export default {
  name: 'control-button',
  props: {
    title: {
      type: String,
      required: true
    },
    colorClass: {
      type: String,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>

</style>
