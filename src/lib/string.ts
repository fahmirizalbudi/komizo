export {}

declare global {
  interface StringConstructor {
    readonly Empty: string
  }
}

Object.defineProperty(String, 'Empty', {
  get() {
    return ''
  },
})
