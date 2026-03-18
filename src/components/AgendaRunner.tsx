import { useState, useCallback } from 'react'
import { agendaTemplates } from '../data/topics'
import Timer from './Timer'

interface AgendaItem {
  label: string
  duration: number
  icon: string
  completed: boolean
}

export default function AgendaRunner() {
  const [items, setItems] = useState<AgendaItem[]>(
    agendaTemplates.map(t => ({ ...t, completed: false }))
  )
  const [currentIndex, setCurrentIndex] = useState<number | null>(null)
  const [isRunning, setIsRunning] = useState(false)

  const startMeeting = useCallback(() => {
    setItems(agendaTemplates.map(t => ({ ...t, completed: false })))
    setCurrentIndex(0)
    setIsRunning(true)
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
  }, [])

  const totalMinutes = items.reduce((sum, item) => sum + item.duration, 0)
  const allDone = items.every(item => item.completed)

  return (
    <div className="agenda-runner">
      <div className="agenda-header">
        <h3>📋 アジェンダ</h3>
        <span className="agenda-total">合計 {totalMinutes} 分</span>
      </div>

      <div className="agenda-list">
        {items.map((item, index) => (
          <div
            key={index}
            className={`agenda-item ${
              index === currentIndex ? 'agenda-item-active' : ''
            } ${item.completed ? 'agenda-item-done' : ''}`}
          >
            <span className="agenda-icon">{item.icon}</span>
            <span className="agenda-label">{item.label}</span>
            <span className="agenda-duration">{item.duration}分</span>
            {item.completed && <span className="agenda-check">✅</span>}
          </div>
        ))}
      </div>

      {currentIndex !== null && isRunning && (
        <div className="agenda-current">
          <p className="current-label">
            {items[currentIndex].icon} {items[currentIndex].label}
          </p>
          <Timer
            key={`${currentIndex}-${items[currentIndex].label}`}
            minutes={items[currentIndex].duration}
            onComplete={handleTimerComplete}
            isActive={isRunning}
          />
          <button className="btn btn-secondary" onClick={skipItem}>
            スキップ ⏭
          </button>
        </div>
      )}

      {allDone && (
        <div className="meeting-complete">
          🎉 朝会完了！お疲れ様でした！
        </div>
      )}

      <div className="agenda-controls">
        {!isRunning && !allDone && (
          <button className="btn btn-primary" onClick={startMeeting}>
            ▶ 朝会スタート
          </button>
        )}
        {(isRunning || allDone) && (
          <button className="btn btn-secondary" onClick={resetMeeting}>
            🔄 リセット
          </button>
        )}
      </div>
    </div>
  )
}
