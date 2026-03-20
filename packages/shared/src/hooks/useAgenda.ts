import { useState, useCallback } from 'react'
import { agendaTemplates } from '../data/topics'
import type { AgendaItem } from '../types'

export function useAgenda() {
  const [items, setItems] = useState<AgendaItem[]>(
    agendaTemplates.map(t => ({ ...t, completed: false }))
  )
  const [currentIndex, setCurrentIndex] = useState<number | null>(null)
  const [isRunning, setIsRunning] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  const startMeeting = useCallback(() => {
    setItems(agendaTemplates.map(t => ({ ...t, completed: false })))
    setCurrentIndex(0)
    setIsRunning(true)
    setIsPaused(false)
  }, [])

  const handleTimerComplete = useCallback(() => {
    setItems(prev =>
      prev.map((item, i) =>
        i === currentIndex ? { ...item, completed: true } : item
      )
    )
    setCurrentIndex(prev => {
      if (prev === null) return null
      const next = prev + 1
      if (next >= items.length) {
        setIsRunning(false)
        return null
      }
      return next
    })
  }, [currentIndex, items.length])

  const skipItem = useCallback(() => {
    handleTimerComplete()
  }, [handleTimerComplete])

  const resetMeeting = useCallback(() => {
    setItems(agendaTemplates.map(t => ({ ...t, completed: false })))
    setCurrentIndex(null)
    setIsRunning(false)
    setIsPaused(false)
  }, [])

  const togglePause = useCallback(() => {
    setIsPaused(prev => !prev)
  }, [])

  const totalMinutes = items.reduce((sum, item) => sum + item.duration, 0)
  const allDone = items.every(item => item.completed)

  return {
    items,
    currentIndex,
    isRunning,
    isPaused,
    totalMinutes,
    allDone,
    startMeeting,
    handleTimerComplete,
    skipItem,
    resetMeeting,
    togglePause,
  }
}
