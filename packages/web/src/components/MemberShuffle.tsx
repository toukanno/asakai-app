import { useShuffle } from '@asakai/shared'

export default function MemberShuffle() {
  const {
    input,
    setInput,
    members,
    shuffled,
    isShuffling,
    addMembers,
    shuffleMembers,
    resetMembers,
  } = useShuffle()

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
              onClick={resetMembers}
            >
              メンバー変更
            </button>
          </div>
        </>
      )}
    </div>
  )
}
