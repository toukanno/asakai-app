/// <reference types="vite/client" />

import type {
  AIIcebreakerRequest,
  AIFacilitatorRequest,
  AIMeetingNotesRequest,
  AIResponse,
} from '@asakai/shared'

declare global {
  interface Window {
    electronAPI: {
      platform: string
      ai: {
        checkAvailable: () => Promise<boolean>
        generateIcebreaker: (req: AIIcebreakerRequest) => Promise<AIResponse>
        getFacilitatorTips: (req: AIFacilitatorRequest) => Promise<AIResponse>
        generateMeetingNotes: (req: AIMeetingNotesRequest) => Promise<AIResponse>
      }
    }
  }
}
