const WEEKDAYS = ['日', '月', '火', '水', '木', '金', '土'];

export function formatDate(date: Date): string {
  const y = date.getFullYear();
  const m = date.getMonth() + 1;
  const d = date.getDate();
  const w = WEEKDAYS[date.getDay()];
  return `${y}年${m}月${d}日（${w}）`;
}

export function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 10) return 'おはようございます！';
  if (hour < 12) return 'おはようございます！';
  if (hour < 17) return 'こんにちは！';
  return 'お疲れ様です！';
}
