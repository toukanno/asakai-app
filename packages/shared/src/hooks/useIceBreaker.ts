import { useState, useCallback } from 'react'
import { icebreakers } from '../data/topics'

export function useIceBreaker() {
  const [topic, setTopic] = useState<string | null>(null)
  const [isAnimating, setIsAnimating] = useState(false)

  const generateTopic = useCallback(() => {
    setIsAnimating(true)
    let count = 0
    const interval = setInterval(() => {
      setTopic(icebreakers[Math.floor(Math.random() * icebreakers.length)])
      count++
      if (count >= 10) {
        clearInterval(interval)
        setIsAnimating(false)
      }
    }, 80)
  }, [])

  return {
    topic,
    isAnimating,
    generateTopic,
  }
}
