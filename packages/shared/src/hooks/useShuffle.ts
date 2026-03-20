import { useState, useCallback } from 'react'

export function useShuffle() {
  const [input, setInput] = useState('')
  const [members, setMembers] = useState<string[]>([])
  const [shuffled, setShuffled] = useState<string[]>([])
  const [isShuffling, setIsShuffling] = useState(false)

  const addMembers = useCallback(() => {
    const newMembers = input
      .split(/[,、\n]/)
      .map(s => s.trim())
      .filter(s => s.length > 0)
    if (newMembers.length > 0) {
      setMembers(newMembers)
      setShuffled([])
      setInput('')
    }
  }, [input])

  const shuffleMembers = useCallback(() => {
    setIsShuffling(true)
    let count = 0
    const interval = setInterval(() => {
      const arr = [...members]
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]]
      }
      setShuffled(arr)
      count++
      if (count >= 8) {
        clearInterval(interval)
        setIsShuffling(false)
      }
    }, 100)
  }, [members])

  const resetMembers = useCallback(() => {
    setMembers([])
    setShuffled([])
  }, [])

  return {
    input,
    setInput,
    members,
    shuffled,
    isShuffling,
    addMembers,
    shuffleMembers,
    resetMembers,
  }
}
