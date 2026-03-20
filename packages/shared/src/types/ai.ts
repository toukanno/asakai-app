export interface AIIcebreakerRequest {
  memberCount?: number
  teamMood?: string
  previousTopics?: string[]
}

export interface AIFacilitatorRequest {
  agendaItem: string
  context?: string
}

export interface AIMeetingNotesRequest {
  notes: string
  members?: string[]
  agendaItems?: string[]
}

export interface AIMeetingNotesResponse {
  summary: string
  actionItems: string[]
  decisions: string[]
  nextSteps: string[]
}

export interface AIResponse {
  text: string
  error?: string
}
