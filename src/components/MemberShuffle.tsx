import { useState, useCallback } from 'react'

export default function MemberShuffle() {
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

  return (
    <div className="member-shuffle">
      <h3>🔀 発表順シャッフル</h3>

      {members.length === 0 ? (
        <div className="member-input-area">
          <textarea
            className="member-textarea"
            placeholder="メンバー名を入力（カンマ or 改行区切り）&#10;例: 田中, 佐藤, 鈴木"
            value={input}
            onChange={e => setInput(e.target.value)}
            rows={4}
          />
          <button
            className="btn btn-primary"
            onClick={addMembers}
            disabled={input.trim().length === 0}
          >
            メンバーを登録
          </button>
        </div>
      ) : (
        <>
          <div className="shuffled-list">
            {(shuffled.length > 0 ? shuffled : members).map((name, i) => (
              <div key={i} className={`member-item ${isShuffling ? 'shuffling' : ''}`}>
                <span className="member-number">{i + 1}.</span>
                <span className="member-name">{name}</span>
              </div>
            ))}
          </div>
          <div className="member-controls">
            <button
              className="btn btn-primary"
              onClick={shuffleMembers}
              disabled={isShuffling}
            >
              {isShuffling ? 'シャッフル中...' : '🎲 シャッフル'}
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => { setMembers([]); setShuffled([]) }}
            >
              メンバー変更
            </button>
          </div>
        </>
      )}
    </div>
  )
}
