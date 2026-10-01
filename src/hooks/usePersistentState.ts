import { useState } from 'react'

export function usePersistentState<T>(key: string, initial: T, validate?: (value: unknown) => value is T) {
  const [state, setState] = useState<T>(() => {
    try {
      const saved: unknown = JSON.parse(localStorage.getItem(key) || 'null')
      return saved !== null && (!validate || validate(saved)) ? saved as T : initial
    } catch { return initial }
  })
  function update(value: T) {
    setState(value)
    try { localStorage.setItem(key, JSON.stringify(value)) } catch { /* State still works without storage. */ }
  }
  return [state, update] as const
}
