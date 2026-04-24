import React, { useMemo, useState } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Share,
  Switch,
  Alert,
} from 'react-native'
import {
  createTicket,
  generateShareText,
  type ShareTicket,
} from '@asakai/shared'
import { theme } from '../styles/theme'

export default function ShareScreen() {
  const [projectName, setProjectName] = useState('介護求人ナビ')
  const [tickets, setTickets] = useState<ShareTicket[]>([createTicket()])

  const updateTicket = (i: number, patch: Partial<ShareTicket>) => {
    setTickets(prev =>
      prev.map((t, idx) => (idx === i ? { ...t, ...patch } : t))
    )
  }
  const addTicket = () => setTickets(prev => [...prev, createTicket()])
  const removeTicket = (i: number) =>
    setTickets(prev => prev.filter((_, idx) => idx !== i))

  const preview = useMemo(
    () => generateShareText([{ name: projectName, tickets }], new Date()),
    [projectName, tickets]
  )

  const sharePreview = async () => {
    try {
      await Share.share({ message: preview, title: '朝会共有' })
    } catch (e) {
      Alert.alert('共有に失敗しました', (e as Error).message)
    }
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>📨 朝会共有</Text>

      <Text style={styles.label}>プロジェクト名</Text>
      <TextInput
        style={styles.input}
        value={projectName}
        onChangeText={setProjectName}
        placeholder="例: 介護求人ナビ"
        placeholderTextColor={theme.textMuted}
      />

      {tickets.map((t, i) => (
        <View key={i} style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardNo}>#{i + 1}</Text>
            <View style={styles.toggleRow}>
              <Text style={styles.toggleLabel}>新規</Text>
              <Switch
                value={t.isNew}
                onValueChange={v => updateTicket(i, { isNew: v })}
                trackColor={{ true: theme.primary, false: theme.border }}
                thumbColor="#fff"
              />
            </View>
            {tickets.length > 1 && (
              <TouchableOpacity
                style={styles.removeBtn}
                onPress={() => removeTicket(i)}
              >
                <Text style={styles.removeBtnText}>×</Text>
              </TouchableOpacity>
            )}
          </View>

          <TextInput
            style={styles.input}
            value={t.id}
            onChangeText={v => updateTicket(i, { id: v })}
            placeholder="チケットID（例: KKDEV2-1478）"
            placeholderTextColor={theme.textMuted}
          />
          <TextInput
            style={[styles.input, styles.multiline]}
            value={t.title}
            onChangeText={v => updateTicket(i, { title: v })}
            placeholder="タイトル / 概要"
            placeholderTextColor={theme.textMuted}
            multiline
          />

          <View style={styles.section}>
            <View style={styles.toggleRow}>
              <Switch
                value={t.inYesterday}
                onValueChange={v => updateTicket(i, { inYesterday: v })}
                trackColor={{ true: theme.primary, false: theme.border }}
                thumbColor="#fff"
              />
              <Text style={styles.sectionLabel}>📋 前営業日の実績に含める</Text>
            </View>
            {t.inYesterday && (
              <TextInput
                style={[styles.input, styles.multiline]}
                value={t.yesterdayItems}
                onChangeText={v => updateTicket(i, { yesterdayItems: v })}
                placeholder="サブ項目（1行ごと、空でもOK）"
                placeholderTextColor={theme.textMuted}
                multiline
              />
            )}
          </View>

          <View style={styles.section}>
            <View style={styles.toggleRow}>
              <Switch
                value={t.inToday}
                onValueChange={v => updateTicket(i, { inToday: v })}
                trackColor={{ true: theme.primary, false: theme.border }}
                thumbColor="#fff"
              />
              <Text style={styles.sectionLabel}>📅 本日の予定に含める</Text>
            </View>
            {t.inToday && (
              <TextInput
                style={[styles.input, styles.multiline]}
                value={t.todayItems}
                onChangeText={v => updateTicket(i, { todayItems: v })}
                placeholder="サブ項目（1行ごと、空でもOK）"
                placeholderTextColor={theme.textMuted}
                multiline
              />
            )}
          </View>
        </View>
      ))}

      <TouchableOpacity style={styles.btnSecondary} onPress={addTicket}>
        <Text style={styles.btnSecondaryText}>＋ チケット追加</Text>
      </TouchableOpacity>

      <View style={styles.preview}>
        <View style={styles.previewHeader}>
          <Text style={styles.previewHeaderText}>プレビュー</Text>
          <TouchableOpacity onPress={sharePreview} style={styles.previewShareBtn}>
            <Text style={styles.previewShareText}>📤 共有</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.previewText}>{preview}</Text>
      </View>
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
    gap: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: theme.text,
    marginBottom: 4,
  },
  label: {
    fontSize: 13,
    color: theme.textMuted,
    fontWeight: '500',
  },
  input: {
    backgroundColor: theme.surface,
    borderWidth: 1,
    borderColor: theme.border,
    borderRadius: theme.radius,
    color: theme.text,
    fontSize: 15,
    padding: 12,
  },
  multiline: {
    minHeight: 60,
    textAlignVertical: 'top',
  },
  card: {
    backgroundColor: theme.surface,
    borderWidth: 1,
    borderColor: theme.border,
    borderRadius: theme.radius,
    padding: 12,
    gap: 10,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  cardNo: {
    color: theme.primary,
    fontWeight: '700',
    fontSize: 14,
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  toggleLabel: {
    color: theme.textMuted,
    fontSize: 13,
  },
  removeBtn: {
    marginLeft: 'auto',
    width: 32,
    height: 32,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  removeBtnText: {
    color: theme.textMuted,
    fontSize: 18,
    lineHeight: 18,
  },
  section: {
    gap: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: theme.border,
  },
  sectionLabel: {
    color: theme.textMuted,
    fontSize: 13,
  },
  btnSecondary: {
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
    fontSize: 15,
    color: theme.text,
  },
  preview: {
    backgroundColor: theme.surface,
    borderWidth: 1,
    borderColor: theme.primary,
    borderRadius: theme.radius,
    overflow: 'hidden',
  },
  previewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'rgba(245, 158, 11, 0.08)',
    borderBottomWidth: 1,
    borderBottomColor: theme.border,
  },
  previewHeaderText: {
    color: theme.textMuted,
    fontWeight: '600',
    fontSize: 13,
  },
  previewShareBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: theme.primary,
    borderRadius: 8,
  },
  previewShareText: {
    color: '#000',
    fontWeight: '600',
    fontSize: 13,
  },
  previewText: {
    padding: 14,
    color: theme.text,
    fontSize: 13,
    lineHeight: 20,
    fontFamily: 'Menlo',
  },
})
