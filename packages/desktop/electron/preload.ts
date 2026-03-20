import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('electronAPI', {
  platform: process.platform,
  ai: {
    checkAvailable: () => ipcRenderer.invoke('ai:check-available'),
    generateIcebreaker: (req: unknown) => ipcRenderer.invoke('ai:icebreaker', req),
    getFacilitatorTips: (req: unknown) => ipcRenderer.invoke('ai:facilitator', req),
    generateMeetingNotes: (req: unknown) => ipcRenderer.invoke('ai:meeting-notes', req),
  },
})
