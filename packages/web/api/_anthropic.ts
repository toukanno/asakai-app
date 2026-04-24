import Anthropic from '@anthropic-ai/sdk'

let cached: Anthropic | null = null

export function hasAnthropicKey(): boolean {
  return Boolean(process.env.ANTHROPIC_API_KEY)
}

function getClient(): Anthropic {
  if (!cached) cached = new Anthropic()
  return cached
}

export async function callClaude(
  systemPrompt: string,
  userMessage: string
): Promise<string> {
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
    if (block.type === 'text') return block.text
  }
  return ''
}
