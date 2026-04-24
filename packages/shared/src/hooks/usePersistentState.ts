import { useEffect, useState } from 'react'

interface MiniStorage {
  getItem: (key: string) => string | null
  setItem: (key: string, value: string) => void
}

function getStorage(): MiniStorage | null {
  if (typeof globalThis === 'undefined') return null
  const g = globalThis as unknown as { localStorage?: MiniStorage }
  return g.localStorage ?? null
}

export function usePersistentState<T>(
  key: string,
  initial: T
): [T, (value: T | ((prev: T) => T)) => void] {
  const [state, setState] = useState<T>(() => {
    const storage = getStorage()
    if (!storage) return initial
    try {
      const raw = storage.getItem(key)
      if (raw === null) return initial
      return JSON.parse(raw) as T
    } catch {
      return initial
    }
  })

  useEffect(() => {
    const storage = getStorage()
    if (!storage) return
    try {
      storage.setItem(key, JSON.stringify(state))
    } catch {
      /* quota or serialization — ignore */
    }
  }, [key, state])

  return [state, setState]
}
