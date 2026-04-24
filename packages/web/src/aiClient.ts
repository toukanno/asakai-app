import type {
  AIIcebreakerRequest,
  AIFacilitatorRequest,
  AIMeetingNotesRequest,
  AIResponse,
} from '@asakai/shared'

async function call<T>(path: string, body: T): Promise<AIResponse> {
  try {
    const res = await fetch(`/api/${path}`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(body),
    })
    if (res.status === 503) {
      return { text: '', error: 'AI機能は未設定です（ANTHROPIC_API_KEY 必須）' }
    }
    if (!res.ok) {
      return { text: '', error: `HTTP ${res.status}` }
    }
    const data = (await res.json()) as AIResponse
    return data
  } catch (e) {
    return { text: '', error: (e as Error).message }
  }
}

export const aiClient = {
  async checkAvailable(): Promise<boolean> {
    try {
      const res = await fetch('/api/check')
      if (!res.ok) return false
      const data = (await res.json()) as { available: boolean }
      return Boolean(data.available)
    } catch {
      return false
    }
  },
  generateIcebreaker(req: AIIcebreakerRequest) {
    return call('icebreaker', req)
  },
  getFacilitatorTips(req: AIFacilitatorRequest) {
    return call('facilitator', req)
  },
  generateMeetingNotes(req: AIMeetingNotesRequest) {
    return call('meeting-notes', req)
  },
}
