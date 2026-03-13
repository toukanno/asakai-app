import { useState, useCallback } from 'react'
import { icebreakers } from '../data/topics'

export default function IceBreaker() {
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

  return (
    <div className="icebreaker-card">
      <h3>🧊 アイスブレイク</h3>
      <div className={`topic-display ${isAnimating ? 'shuffling' : ''}`}>
        {topic || 'ボタンを押してお題を生成！'}
      </div>
      <button
        className="btn btn-primary"
        onClick={generateTopic}
        disabled={isAnimating}
      >
        {isAnimating ? 'シャッフル中...' : '🎲 お題を生成'}
      </button>
    </div>
  )
}
