import Anthropic from '@anthropic-ai/sdk'
import { ipcMain } from 'electron'
import type {
  AIIcebreakerRequest,
  AIFacilitatorRequest,
  AIMeetingNotesRequest,
} from '@asakai/shared'

let client: Anthropic | null = null

function getClient(): Anthropic {
  if (!client) {
    client = new Anthropic()
  }
  return client
}

async function callClaude(systemPrompt: string, userMessage: string): Promise<string> {
  const anthropic = getClient()
  const stream = anthropic.messages.stream({
    model: 'claude-opus-4-7',
    max_tokens: 1024,
    thinking: { type: 'adaptive' },
    output_config: { effort: 'low' },
    system: systemPrompt,
    messages: [{ role: 'user', content: userMessage }],
  })

  const response = await stream.finalMessage()

  for (const block of response.content) {
    if (block.type === 'text') {
      return block.text
    }
  }
  return ''
}

export function registerAIHandlers() {
  ipcMain.handle('ai:icebreaker', async (_event, req: AIIcebreakerRequest) => {
    try {
      const text = await callClaude(
        `あなたはチームの朝会のファシリテーターです。
アイスブレイクのお題を1つだけ生成してください。
ルール:
- 短く、答えやすいお題にする（1文）
- チーム全員が楽しめる内容
- 仕事に関係なくてもOK
- お題のみ出力。説明や前置きは不要`,
        `お題を1つ生成してください。${req.teamMood ? `チームの雰囲気: ${req.teamMood}` : ''}${req.memberCount ? `メンバー数: ${req.memberCount}人` : ''}${req.previousTopics?.length ? `\n避けるべき過去のお題: ${req.previousTopics.join(', ')}` : ''}`
      )
      return { text, error: undefined }
    } catch (e) {
      return { text: '', error: (e as Error).message }
    }
  })

  ipcMain.handle('ai:facilitator', async (_event, req: AIFacilitatorRequest) => {
    try {
      const text = await callClaude(
        `あなたはチームの朝会のファシリテーターです。
指定されたアジェンダ項目に対して、チームへの問いかけや話題を2〜3個提案してください。
ルール:
- 短く具体的な質問にする
- チームメンバーが答えやすい形式
- 箇条書きで出力（「- 」で始める）
- 前置きや説明は不要`,
        `アジェンダ項目: ${req.agendaItem}${req.context ? `\n補足: ${req.context}` : ''}`
      )
      return { text, error: undefined }
    } catch (e) {
      return { text: '', error: (e as Error).message }
    }
  })

  ipcMain.handle('ai:meeting-notes', async (_event, req: AIMeetingNotesRequest) => {
    try {
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
        `朝会メモ:\n${req.notes}${req.members?.length ? `\n\n参加メンバー: ${req.members.join(', ')}` : ''}${req.agendaItems?.length ? `\n\nアジェンダ: ${req.agendaItems.join(', ')}` : ''}`
      )
      return { text, error: undefined }
    } catch (e) {
      return { text: '', error: (e as Error).message }
    }
  })

  ipcMain.handle('ai:check-available', async () => {
    return !!process.env.ANTHROPIC_API_KEY
  })
}
