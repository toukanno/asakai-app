import { useState } from 'react'
import { useIceBreaker } from '@asakai/shared'

export default function IceBreaker() {
  const { topic, isAnimating, generateTopic } = useIceBreaker()
  const [aiTopic, setAiTopic] = useState<string | null>(null)
  const [aiLoading, setAiLoading] = useState(false)
  const [aiAvailable, setAiAvailable] = useState<boolean | null>(null)
  const [previousTopics, setPreviousTopics] = useState<string[]>([])

  const checkAI = async () => {
    if (aiAvailable === null) {
      const available = await window.electronAPI.ai.checkAvailable()
      setAiAvailable(available)
      return available
    }
    return aiAvailable
  }

  const generateAITopic = async () => {
    const available = await checkAI()
    if (!available) return

    setAiLoading(true)
    setAiTopic(null)
    const result = await window.electronAPI.ai.generateIcebreaker({
      previousTopics,
    })
    setAiLoading(false)

    if (result.text) {
      setAiTopic(result.text)
      setPreviousTopics(prev => [...prev.slice(-9), result.text])
    } else if (result.error) {
      setAiTopic(`エラー: ${result.error}`)
    }
  }

  const displayTopic = aiTopic || topic

  return (
    <div className="icebreaker-card">
      <h3>🧊 アイスブレイク</h3>
      <div className={`topic-display ${isAnimating ? 'shuffling' : ''}`}>
        {displayTopic || 'ボタンを押してお題を生成！'}
      </div>
      <div className="icebreaker-buttons">
        <button
          className="btn btn-primary"
          onClick={generateTopic}
          disabled={isAnimating}
        >
          {isAnimating ? 'シャッフル中...' : '🎲 お題を生成'}
        </button>
        <button
          className="btn btn-ai"
          onClick={generateAITopic}
          disabled={aiLoading}
        >
          {aiLoading ? '✨ 生成中...' : '✨ AIで生成'}
        </button>
      </div>
      {aiAvailable === false && (
        <p className="ai-hint">
          💡 ANTHROPIC_API_KEY を設定するとAI機能が使えます
        </p>
      )}
    </div>
  )
}
