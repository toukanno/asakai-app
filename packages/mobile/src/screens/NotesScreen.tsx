import React, { useMemo, useState } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Share,
} from 'react-native'
import { theme } from '../styles/theme'

function toLines(text: string): string[] {
  return text
    .split('\n')
    .map(line => line.trim())
    .filter(Boolean)
}

function buildNotes(notes: string, members: string): string {
  const lines = toLines(notes)
  const memberList = members
    .split(/[、,\n]/)
    .map(s => s.trim())
    .filter(Boolean)

  const actionCandidates = lines.filter(
    line =>
      /TODO|やる|対応|確認|fix|実装|review|テスト|連絡|提出|作成|調査/i.test(line)
  )
  const summarySource = lines.slice(0, 2).join(' / ') || '朝会メモをもとに議論内容を整理しました。'
  const actions = actionCandidates.length > 0 ? actionCandidates : lines.slice(0, 3)

  const decisions = lines.filter(line => /決定|合意|採用|方針|決ま/i.test(line))
  const nextSteps = lines.filter(line => /次|明日|来週|予定|継続|準備/i.test(line))

  return [
    '## サマリー',
    summarySource,
    '',
    '## 参加メンバー',
    ...(memberList.length > 0 ? memberList.map(name => `- ${name}`) : ['- （未入力）']),
    '',
    '## アクションアイテム',
    ...actions.map(item => `- [ ] ${item}`),
    '',
    '## 決定事項',
    ...(decisions.length > 0 ? decisions.map(item => `- ${item}`) : ['- （明確な決定事項なし）']),
    '',
    '## 次のステップ',
    ...(nextSteps.length > 0 ? nextSteps.map(item => `- ${item}`) : ['- 進捗確認を次回朝会で実施']),
  ].join('\n')
}

export default function NotesScreen() {
  const [notes, setNotes] = useState('')
  const [members, setMembers] = useState('')
  const [generated, setGenerated] = useState<string | null>(null)

  const isReady = useMemo(() => notes.trim().length > 0, [notes])

  const handleGenerate = () => {
    if (!isReady) return
    setGenerated(buildNotes(notes, members))
  }

  const handleShare = async () => {
    if (!generated) return
    await Share.share({ message: generated })
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>📝 議事録</Text>

      {!generated ? (
        <View style={styles.inputArea}>
          <TextInput
            style={styles.notesInput}
            placeholder={'朝会メモを入力\n例: 田中: APIテスト完了、明日は結合確認'}
            placeholderTextColor={theme.textMuted}
            value={notes}
            onChangeText={setNotes}
            multiline
            numberOfLines={8}
          />
          <TextInput
            style={styles.membersInput}
            placeholder={'参加メンバー（カンマ区切り）'}
            placeholderTextColor={theme.textMuted}
            value={members}
            onChangeText={setMembers}
          />

          <TouchableOpacity
            style={[styles.btnPrimary, !isReady && styles.btnDisabled]}
            onPress={handleGenerate}
            disabled={!isReady}
          >
            <Text style={styles.btnPrimaryText}>構造化して作成</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <View style={styles.resultCard}>
            {generated.split('\n').map((line, index) => (
              <Text key={index} style={line.startsWith('##') ? styles.heading : styles.line}>
                {line}
              </Text>
            ))}
          </View>

          <View style={styles.controls}>
            <TouchableOpacity style={styles.btnPrimary} onPress={handleShare}>
              <Text style={styles.btnPrimaryText}>共有</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnSecondary} onPress={() => setGenerated(null)}>
              <Text style={styles.btnSecondaryText}>やり直す</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bg,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: theme.text,
    marginBottom: 16,
  },
  inputArea: {
    gap: 12,
  },
  notesInput: {
    backgroundColor: theme.surface,
    borderWidth: 1,
    borderColor: theme.border,
    borderRadius: theme.radius,
    color: theme.text,
    fontSize: 16,
    padding: 14,
    minHeight: 180,
    textAlignVertical: 'top',
  },
  membersInput: {
    backgroundColor: theme.surface,
    borderWidth: 1,
    borderColor: theme.border,
    borderRadius: theme.radius,
    color: theme.text,
    fontSize: 16,
    padding: 14,
  },
  resultCard: {
    backgroundColor: theme.surface,
    borderWidth: 1,
    borderColor: theme.border,
    borderRadius: theme.radius,
    padding: 14,
    gap: 8,
    marginBottom: 12,
  },
  heading: {
    color: theme.primary,
    fontSize: 16,
    fontWeight: '700',
    marginTop: 6,
  },
  line: {
    color: theme.text,
    lineHeight: 22,
  },
  controls: {
    flexDirection: 'row',
    gap: 8,
  },
  btnPrimary: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 14,
    backgroundColor: theme.primary,
    borderRadius: theme.radius,
  },
  btnPrimaryText: {
    fontWeight: '600',
    fontSize: 16,
    color: '#000',
  },
  btnSecondary: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 14,
    backgroundColor: theme.surface,
    borderRadius: theme.radius,
    borderWidth: 1,
    borderColor: theme.border,
  },
  btnSecondaryText: {
    fontWeight: '600',
    fontSize: 16,
    color: theme.text,
  },
  btnDisabled: {
    opacity: 0.5,
  },
})
