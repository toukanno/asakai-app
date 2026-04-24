import { useState } from 'react'
import { aiClient } from '../aiClient'

interface Props {
  agendaItem: string
}

export default function AIFacilitator({ agendaItem }: Props) {
  const [tips, setTips] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [visible, setVisible] = useState(false)

  const fetchTips = async () => {
    if (tips) {
      setVisible(!visible)
      return
    }
    setLoading(true)
    setVisible(true)
    const result = await aiClient.getFacilitatorTips({ agendaItem })
    setLoading(false)
    if (result.text) {
      setTips(result.text)
    } else if (result.error) {
      setTips(result.error)
    }
  }

  return (
    <div className="ai-facilitator">
      <button className="btn-ai-small" onClick={fetchTips} disabled={loading}>
        {loading ? '💭...' : '💭 AIヒント'}
      </button>
      {visible && tips && (
        <div className="ai-tips">
          {tips.split('\n').filter(Boolean).map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </div>
      )}
    </div>
  )
}
