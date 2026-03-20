import { useAgenda } from '@asakai/shared'
import Timer from './Timer'

export default function AgendaRunner() {
  const {
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
  } = useAgenda()

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
            isActive={isRunning && !isPaused}
          />
          <div className="member-controls">
            <button className="btn btn-secondary" onClick={togglePause}>
              {isPaused ? '▶ 再開' : '⏸ 停止'}
            </button>
            <button className="btn btn-secondary" onClick={skipItem}>
              スキップ ⏭
            </button>
          </div>
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
