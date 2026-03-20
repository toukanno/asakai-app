import { useState } from 'react'

export default function MeetingNotes() {
  const [notes, setNotes] = useState('')
  const [members, setMembers] = useState('')
  const [result, setResult] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [aiAvailable, setAiAvailable] = useState<boolean | null>(null)

  const checkAndGenerate = async () => {
    if (aiAvailable === null) {
      const available = await window.electronAPI.ai.checkAvailable()
      setAiAvailable(available)
      if (!available) return
    }
    if (!aiAvailable && aiAvailable !== null) return

    setLoading(true)
    const memberList = members
      .split(/[,、\n]/)
      .map(s => s.trim())
      .filter(Boolean)

    const response = await window.electronAPI.ai.generateMeetingNotes({
      notes,
      members: memberList.length > 0 ? memberList : undefined,
    })
    setLoading(false)

    if (response.text) {
      setResult(response.text)
    } else if (response.error) {
      setResult(`エラー: ${response.error}`)
    }
  }

  const copyToClipboard = () => {
    if (result) {
      navigator.clipboard.writeText(result)
    }
  }

  return (
    <div className="meeting-notes">
      <h3>📝 AI議事録</h3>

      {!result ? (
        <>
          <textarea
            className="member-textarea"
            placeholder="朝会のメモを入力してください&#10;例: 田中 - 昨日APIの修正完了、今日はテスト&#10;佐藤 - デザインレビュー待ち、午後にミーティング"
            value={notes}
            onChange={e => setNotes(e.target.value)}
            rows={6}
          />
          <textarea
            className="member-textarea small"
            placeholder="参加メンバー（任意、カンマ区切り）"
            value={members}
            onChange={e => setMembers(e.target.value)}
            rows={2}
          />
          <button
            className="btn btn-ai"
            onClick={checkAndGenerate}
            disabled={loading || notes.trim().length === 0}
          >
            {loading ? '✨ 生成中...' : '✨ AIで議事録を生成'}
          </button>
          {aiAvailable === false && (
            <p className="ai-hint">
              💡 ANTHROPIC_API_KEY を設定するとAI機能が使えます
            </p>
          )}
        </>
      ) : (
        <>
          <div className="notes-result">
            {result.split('\n').map((line, i) => (
              <p key={i} className={line.startsWith('##') ? 'notes-heading' : ''}>
                {line}
              </p>
            ))}
          </div>
          <div className="member-controls">
            <button className="btn btn-secondary" onClick={copyToClipboard}>
              📋 コピー
            </button>
            <button className="btn btn-secondary" onClick={() => setResult(null)}>
              🔄 やり直し
            </button>
          </div>
        </>
      )}
    </div>
  )
}
