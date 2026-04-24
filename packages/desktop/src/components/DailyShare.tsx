import { useMemo, useState } from 'react'
import {
  createTicket,
  generateShareText,
  usePersistentState,
  type ShareTicket,
} from '@asakai/shared'

export default function DailyShare() {
  const [projectName, setProjectName] = usePersistentState(
    'asakai.share.project',
    '介護求人ナビ'
  )
  const [tickets, setTickets] = usePersistentState<ShareTicket[]>(
    'asakai.share.tickets',
    [createTicket()]
  )
  const [copied, setCopied] = useState(false)

  const updateTicket = (i: number, patch: Partial<ShareTicket>) => {
    setTickets(prev => prev.map((t, idx) => (idx === i ? { ...t, ...patch } : t)))
  }
  const addTicket = () => setTickets(prev => [...prev, createTicket()])
  const removeTicket = (i: number) =>
    setTickets(prev => prev.filter((_, idx) => idx !== i))
  const resetAll = () => {
    if (confirm('入力内容を全て削除します。よろしいですか？')) {
      setTickets([createTicket()])
    }
  }

  const preview = useMemo(
    () => generateShareText([{ name: projectName, tickets }], new Date()),
    [projectName, tickets]
  )

  const copyPreview = async () => {
    try {
      await navigator.clipboard.writeText(preview)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div className="daily-share">
      <h3>📨 朝会共有</h3>

      <label className="share-field">
        <span className="share-label">プロジェクト名</span>
        <input
          className="share-input"
          placeholder="例: 介護求人ナビ"
          value={projectName}
          onChange={e => setProjectName(e.target.value)}
        />
      </label>

      <div className="ticket-list">
        {tickets.map((t, i) => (
          <div key={i} className="ticket-card">
            <div className="ticket-card-header">
              <span className="ticket-card-no">#{i + 1}</span>
              <label className="ticket-new-toggle">
                <input
                  type="checkbox"
                  checked={t.isNew}
                  onChange={e => updateTicket(i, { isNew: e.target.checked })}
                />
                新規
              </label>
              {tickets.length > 1 && (
                <button
                  type="button"
                  className="ticket-remove"
                  onClick={() => removeTicket(i)}
                  aria-label="削除"
                >
                  ×
                </button>
              )}
            </div>

            <input
              className="share-input"
              placeholder="チケットID（例: KKDEV2-1478）"
              value={t.id}
              onChange={e => updateTicket(i, { id: e.target.value })}
            />
            <textarea
              className="share-textarea"
              placeholder="タイトル / 概要"
              value={t.title}
              onChange={e => updateTicket(i, { title: e.target.value })}
              rows={2}
            />

            <div className="ticket-section">
              <label className="section-toggle">
                <input
                  type="checkbox"
                  checked={t.inYesterday}
                  onChange={e =>
                    updateTicket(i, { inYesterday: e.target.checked })
                  }
                />
                📋 前営業日の実績に含める
              </label>
              {t.inYesterday && (
                <textarea
                  className="share-textarea"
                  placeholder="サブ項目（1行ごと、空でもOK）"
                  value={t.yesterdayItems}
                  onChange={e =>
                    updateTicket(i, { yesterdayItems: e.target.value })
                  }
                  rows={2}
                />
              )}
            </div>

            <div className="ticket-section">
              <label className="section-toggle">
                <input
                  type="checkbox"
                  checked={t.inToday}
                  onChange={e => updateTicket(i, { inToday: e.target.checked })}
                />
                📅 本日の予定に含める
              </label>
              {t.inToday && (
                <textarea
                  className="share-textarea"
                  placeholder="サブ項目（1行ごと、空でもOK）"
                  value={t.todayItems}
                  onChange={e =>
                    updateTicket(i, { todayItems: e.target.value })
                  }
                  rows={2}
                />
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="member-controls">
        <button type="button" className="btn btn-secondary" onClick={addTicket}>
          ＋ チケット追加
        </button>
        <button type="button" className="btn btn-secondary" onClick={resetAll}>
          🗑 全削除
        </button>
      </div>

      <div className="share-preview">
        <div className="share-preview-header">
          <span>プレビュー</span>
          <button
            type="button"
            className="btn-ai-small"
            onClick={copyPreview}
          >
            {copied ? '✅ コピー済み' : '📋 コピー'}
          </button>
        </div>
        <pre className="share-preview-text">{preview}</pre>
      </div>
    </div>
  )
}
