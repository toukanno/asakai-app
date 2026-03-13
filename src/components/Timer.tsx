import { useState, useEffect, useCallback } from 'react'

interface TimerProps {
  minutes: number
  onComplete: () => void
  isActive: boolean
}

export default function Timer({ minutes, onComplete, isActive }: TimerProps) {
  const [secondsLeft, setSecondsLeft] = useState(minutes * 60)
  const totalSeconds = minutes * 60

  useEffect(() => {
    setSecondsLeft(minutes * 60)
  }, [minutes])

  useEffect(() => {
    if (!isActive || secondsLeft <= 0) return

    const interval = setInterval(() => {
      setSecondsLeft(prev => {
        if (prev <= 1) {
          clearInterval(interval)
          onComplete()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [isActive, secondsLeft, onComplete])

  const formatTime = useCallback((s: number) => {
    const m = Math.floor(s / 60)
    const sec = s % 60
    return `${m}:${sec.toString().padStart(2, '0')}`
  }, [])

  const progress = totalSeconds > 0 ? ((totalSeconds - secondsLeft) / totalSeconds) * 100 : 0
  const isWarning = secondsLeft <= 30 && secondsLeft > 0
  const isExpired = secondsLeft === 0

  return (
    <div className={`timer ${isWarning ? 'timer-warning' : ''} ${isExpired ? 'timer-expired' : ''}`}>
      <div className="timer-display">{formatTime(secondsLeft)}</div>
      <div className="timer-bar">
        <div className="timer-bar-fill" style={{ width: `${progress}%` }} />
      </div>
    </div>
  )
}
