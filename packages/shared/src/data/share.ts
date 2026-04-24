import type { ShareProject, ShareTicket } from '../types'

const WEEKDAYS = ['日', '月', '火', '水', '木', '金', '土']

export function createTicket(): ShareTicket {
  return {
    id: '',
    title: '',
    isNew: false,
    inYesterday: true,
    yesterdayItems: '',
    inToday: true,
    todayItems: '',
  }
}

export function createProject(name = ''): ShareProject {
  return {
    name,
    tickets: [createTicket()],
  }
}

export function formatDateJa(d: Date): string {
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日（${WEEKDAYS[d.getDay()]}）`
}

export function previousBusinessDay(d: Date): Date {
  const result = new Date(d)
  const day = result.getDay()
  if (day === 1) result.setDate(result.getDate() - 3)
  else if (day === 0) result.setDate(result.getDate() - 2)
  else result.setDate(result.getDate() - 1)
  return result
}

function renderTicket(t: ShareTicket, items: string): string {
  const lines: string[] = []
  lines.push(t.isNew ? `• ${t.id}【新規】` : `• ${t.id}`)
  if (t.title.trim()) {
    const titleLines = t.title.trim().split('\n')
    lines.push(`└ ${titleLines[0]}`)
    for (let i = 1; i < titleLines.length; i++) {
      lines.push(` ${titleLines[i]}`)
    }
  }
  const subItems = items
    .split('\n')
    .map(s => s.trim())
    .filter(Boolean)
  for (const s of subItems) {
    lines.push(`　・${s}`)
  }
  return lines.join('\n')
}

function renderProjectSection(
  p: ShareProject,
  key: 'yesterday' | 'today'
): string | null {
  const tickets = p.tickets.filter(t => {
    const hasContent = t.id.trim() || t.title.trim()
    if (!hasContent) return false
    return key === 'yesterday' ? t.inYesterday : t.inToday
  })
  if (tickets.length === 0) return null
  const body = tickets
    .map(t =>
      renderTicket(t, key === 'yesterday' ? t.yesterdayItems : t.todayItems)
    )
    .join('\n')
  const name = p.name.trim() || 'プロジェクト'
  return `【${name}】\n${body}`
}

export function generateShareText(
  projects: ShareProject[],
  today: Date = new Date()
): string {
  const prev = previousBusinessDay(today)
  const todayStr = formatDateJa(today)
  const prevStr = formatDateJa(prev)

  const yesterdaySection = projects
    .map(p => renderProjectSection(p, 'yesterday'))
    .filter((s): s is string => Boolean(s))
    .join('\n\n')

  const todaySection = projects
    .map(p => renderProjectSection(p, 'today'))
    .filter((s): s is string => Boolean(s))
    .join('\n\n')

  const parts: string[] = [`☀️ 朝会共有（${todayStr}）`, '']
  parts.push(`📋 前営業日の実績（${prevStr}）`)
  parts.push(yesterdaySection || '（記録なし）')
  parts.push('')
  parts.push(`📅 本日の予定（${todayStr}）`)
  parts.push(todaySection || '（記録なし）')

  return parts.join('\n')
}
