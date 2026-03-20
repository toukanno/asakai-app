import { useIceBreaker } from '@asakai/shared'

export default function IceBreaker() {
  const { topic, isAnimating, generateTopic } = useIceBreaker()

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
