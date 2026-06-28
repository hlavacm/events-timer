import { describe, expect, it } from 'vitest'
import CreditsModal from '@/components/CreditsModal.vue'
import { mountAttached } from '../helpers/mount'

describe('CreditsModal', () => {
  it('renders credits content and closes from footer', async () => {
    const wrapper = mountAttached(CreditsModal, {
      props: { open: true }
    })

    expect(document.body.textContent).toContain('Credits 3.1.0')
    expect(document.body.textContent).toContain('Vue.js')

    const okButton = [...document.body.querySelectorAll('button')].find(
      (button) => button.textContent === 'OK'
    )
    okButton?.click()
    expect(wrapper.emitted('update:open')?.[0]).toEqual([false])

    wrapper.unmount()
  })
})
