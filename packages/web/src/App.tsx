import { useState } from 'react'
import IceBreaker from './components/IceBreaker'
import AgendaRunner from './components/AgendaRunner'
import MemberShuffle from './components/MemberShuffle'
import MeetingNotes from './components/MeetingNotes'
import DailyShare from './components/DailyShare'

type Tab = 'agenda' | 'icebreaker' | 'shuffle' | 'notes' | 'share'

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('agenda')

  const today = new Date()
  const dateStr = `${today.getFullYear()}/${today.getMonth() + 1}/${today.getDate()}`
  const dayNames = ['日', '月', '火', '水', '木', '金', '土']
  const dayStr = dayNames[today.getDay()]

  return (
    <div className="app">
      <header className="app-header">
        <h1>☀️ 朝会ジェネレーター</h1>
        <p className="date-display">{dateStr}（{dayStr}）</p>
      </header>

      <nav className="tab-nav">
        <button
          className={`tab-btn ${activeTab === 'agenda' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('agenda')}
        >
          📋 アジェンダ
        </button>
        <button
          className={`tab-btn ${activeTab === 'icebreaker' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('icebreaker')}
        >
          🧊 アイスブレイク
        </button>
        <button
          className={`tab-btn ${activeTab === 'shuffle' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('shuffle')}
        >
          🔀 シャッフル
        </button>
        <button
          className={`tab-btn ${activeTab === 'notes' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('notes')}
        >
          📝 AI議事録
        </button>
        <button
          className={`tab-btn ${activeTab === 'share' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('share')}
        >
          📨 共有
        </button>
      </nav>

      <main className="app-main">
        {activeTab === 'agenda' && <AgendaRunner />}
        {activeTab === 'icebreaker' && <IceBreaker />}
        {activeTab === 'shuffle' && <MemberShuffle />}
        {activeTab === 'notes' && <MeetingNotes />}
        {activeTab === 'share' && <DailyShare />}
      </main>
    </div>
  )
}
