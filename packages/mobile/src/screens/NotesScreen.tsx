import React, { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Share,
  Alert,
} from 'react-native'
import { theme } from '../styles/theme'

export default function NotesScreen() {
  const [notes, setNotes] = useState('')

  const shareNotes = async () => {
    if (!notes.trim()) return
    try {
      await Share.share({
        message: notes,
        title: '朝会メモ',
      })
    } catch (e) {
      Alert.alert('共有に失敗しました', (e as Error).message)
    }
  }

  const clearNotes = () => {
    if (!notes) return
    Alert.alert('メモを削除', '入力内容を消去しますか？', [
      { text: 'キャンセル', style: 'cancel' },
      { text: '削除', style: 'destructive', onPress: () => setNotes('') },
    ])
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>📝 朝会メモ</Text>
      <Text style={styles.hint}>
        朝会中のメモを記録できます。共有ボタンから他のアプリに送信できます。
      </Text>

      <TextInput
        style={styles.textInput}
        placeholder={
          '例:\n田中 - 昨日APIの修正完了、今日はテスト\n佐藤 - デザインレビュー待ち、午後にミーティング'
        }
        placeholderTextColor={theme.textMuted}
        value={notes}
        onChangeText={setNotes}
        multiline
        textAlignVertical="top"
      />

      <View style={styles.controls}>
        <TouchableOpacity
          style={[styles.btnPrimary, !notes.trim() && styles.btnDisabled]}
          onPress={shareNotes}
          disabled={!notes.trim()}
        >
          <Text style={styles.btnPrimaryText}>📤 共有</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.btnSecondary, !notes && styles.btnDisabled]}
          onPress={clearNotes}
          disabled={!notes}
        >
          <Text style={styles.btnSecondaryText}>🗑 クリア</Text>
        </TouchableOpacity>
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
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: theme.text,
    marginBottom: 8,
  },
  hint: {
    color: theme.textMuted,
    fontSize: 13,
    marginBottom: 16,
    lineHeight: 18,
  },
  textInput: {
    backgroundColor: theme.surface,
    borderWidth: 1,
    borderColor: theme.border,
    borderRadius: theme.radius,
    color: theme.text,
    fontSize: 15,
    padding: 14,
    minHeight: 240,
    marginBottom: 12,
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
  btnDisabled: {
    opacity: 0.5,
  },
  btnPrimaryText: {
    fontWeight: '600',
    fontSize: 16,
    color: '#000',
  },
  btnSecondaryText: {
    fontWeight: '600',
    fontSize: 16,
    color: theme.text,
  },
})
