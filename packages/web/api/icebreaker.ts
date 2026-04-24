import type { VercelRequest, VercelResponse } from '@vercel/node'
import type { AIIcebreakerRequest } from '@asakai/shared'
import { callClaude, hasAnthropicKey } from './_anthropic'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ text: '', error: 'method not allowed' })
  }
  if (!hasAnthropicKey()) {
    return res.status(503).json({ text: '', error: 'ANTHROPIC_API_KEY not set' })
  }
  try {
    const body = req.body as AIIcebreakerRequest
    const text = await callClaude(
      `あなたはチームの朝会のファシリテーターです。
アイスブレイクのお題を1つだけ生成してください。
ルール:
- 短く、答えやすいお題にする（1文）
- チーム全員が楽しめる内容
- 仕事に関係なくてもOK
- お題のみ出力。説明や前置きは不要`,
      `お題を1つ生成してください。${body.teamMood ? `チームの雰囲気: ${body.teamMood}` : ''}${body.memberCount ? `メンバー数: ${body.memberCount}人` : ''}${body.previousTopics?.length ? `\n避けるべき過去のお題: ${body.previousTopics.join(', ')}` : ''}`
    )
    res.status(200).json({ text })
  } catch (e) {
    res.status(500).json({ text: '', error: (e as Error).message })
  }
}
