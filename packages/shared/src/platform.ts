import type { Platform } from './types'

let currentPlatform: Platform = 'web'

export function setPlatform(platform: Platform) {
  currentPlatform = platform
}

export function getPlatform(): Platform {
  return currentPlatform
}

export function isDesktop(): boolean {
  return currentPlatform === 'desktop'
}

export function isMobile(): boolean {
  return currentPlatform === 'mobile'
}
