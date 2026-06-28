import { vi } from 'vitest'

const storage = new Map<string, string>()

Object.defineProperty(globalThis, 'localStorage', {
  value: {
    getItem: (key: string) => storage.get(key) ?? null,
    setItem: (key: string, value: string) => {
      storage.set(key, value)
    },
    removeItem: (key: string) => {
      storage.delete(key)
    },
    clear: () => {
      storage.clear()
    },
    key: (index: number) => [...storage.keys()][index] ?? null,
    get length () {
      return storage.size
    }
  } satisfies Storage
})

Element.prototype.getBoundingClientRect = vi.fn(() => ({
  x: 100,
  y: 100,
  width: 120,
  height: 32,
  top: 100,
  left: 100,
  right: 220,
  bottom: 132,
  toJSON: () => ({})
}))
