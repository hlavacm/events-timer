import { createPinia, setActivePinia } from 'pinia'

export function setupPinia () {
  localStorage.clear()
  const pinia = createPinia()
  setActivePinia(pinia)
  return pinia
}
