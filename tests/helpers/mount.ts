import { mount, type MountingOptions, type VueWrapper } from '@vue/test-utils'
import type { Component } from 'vue'

export function mountAttached (
  component: Component,
  options: MountingOptions<Record<string, unknown>> = {}
): VueWrapper {
  return mount(component, {
    attachTo: document.body,
    ...options
  })
}
