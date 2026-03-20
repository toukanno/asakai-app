export interface AgendaItem {
  label: string
  duration: number
  icon: string
  completed: boolean
}

export interface AgendaTemplate {
  label: string
  duration: number
  icon: string
}

export interface TimerState {
  secondsLeft: number
  formattedTime: string
  progress: number
  isWarning: boolean
  isExpired: boolean
}

export interface AgendaState {
  items: AgendaItem[]
  currentIndex: number | null
  isRunning: boolean
  isPaused: boolean
  totalMinutes: number
  allDone: boolean
  startMeeting: () => void
  handleTimerComplete: () => void
  skipItem: () => void
  resetMeeting: () => void
  togglePause: () => void
}

export interface IceBreakerState {
  topic: string | null
  isAnimating: boolean
  generateTopic: () => void
}

export interface ShuffleState {
  input: string
  setInput: (value: string) => void
  members: string[]
  shuffled: string[]
  isShuffling: boolean
  addMembers: () => void
  shuffleMembers: () => void
  resetMembers: () => void
}

export type Platform = 'desktop' | 'mobile' | 'web'
