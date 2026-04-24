import type { VercelRequest, VercelResponse } from '@vercel/node'
import type { AIFacilitatorRequest } from '@asakai/shared'
import { callClaude, hasAnthropicKey } from './_anthropic'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ text: '', error: 'method not allowed' })
  }
  if (!hasAnthropicKey()) {
    return res.status(503).json({ text: '', error: 'ANTHROPIC_API_KEY not set' })
  }
  try {
    const body = req.body as AIFacilitatorRequest
    const text = await callClaude(
      `あなたはチームの朝会のファシリテーターです。
指定されたアジェンダ項目に対して、チームへの問いかけや話題を2〜3個提案してください。
ルール:
- 短く具体的な質問にする
- チームメンバーが答えやすい形式
- 箇条書きで出力（「- 」で始める）
- 前置きや説明は不要`,
      `アジェンダ項目: ${body.agendaItem}${body.context ? `\n補足: ${body.context}` : ''}`
    )
    res.status(200).json({ text })
  } catch (e) {
    res.status(500).json({ text: '', error: (e as Error).message })
  }
}
