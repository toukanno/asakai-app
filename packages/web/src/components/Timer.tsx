import { useTimer } from '@asakai/shared'

interface TimerProps {
  minutes: number
  onComplete: () => void
  isActive: boolean
}

export default function Timer({ minutes, onComplete, isActive }: TimerProps) {
  const { formattedTime, progress, isWarning, isExpired } = useTimer({
    minutes,
    onComplete,
    isActive,
  })

  return (
    <div className={`timer ${isWarning ? 'timer-warning' : ''} ${isExpired ? 'timer-expired' : ''}`}>
      <div className="timer-display">{formattedTime}</div>
      <div className="timer-bar">
        <div className="timer-bar-fill" style={{ width: `${progress}%` }} />
      </div>
    </div>
  )
}
