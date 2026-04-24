import type { VercelRequest, VercelResponse } from '@vercel/node'
import type { AIMeetingNotesRequest } from '@asakai/shared'
import { callClaude, hasAnthropicKey } from './_anthropic'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ text: '', error: 'method not allowed' })
  }
  if (!hasAnthropicKey()) {
    return res.status(503).json({ text: '', error: 'ANTHROPIC_API_KEY not set' })
  }
  try {
    const body = req.body as AIMeetingNotesRequest
    const text = await callClaude(
      `あなたは議事録作成アシスタントです。
朝会のメモから構造化された議事録を作成してください。
以下の形式で出力:

## サマリー
（1〜2文で要約）

## アクションアイテム
- [ ] 担当者: やること

## 決定事項
- 決まったこと

## 次のステップ
- 次にやること

メモが少ない場合は、わかる範囲で出力してください。`,
      `朝会メモ:\n${body.notes}${body.members?.length ? `\n\n参加メンバー: ${body.members.join(', ')}` : ''}${body.agendaItems?.length ? `\n\nアジェンダ: ${body.agendaItems.join(', ')}` : ''}`
    )
    res.status(200).json({ text })
  } catch (e) {
    res.status(500).json({ text: '', error: (e as Error).message })
  }
}
