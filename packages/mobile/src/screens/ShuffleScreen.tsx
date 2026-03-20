import React from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native'
import { useShuffle } from '@asakai/shared'
import { theme } from '../styles/theme'

export default function ShuffleScreen() {
  const {
    input,
    setInput,
    members,
    shuffled,
    isShuffling,
    addMembers,
    shuffleMembers,
    resetMembers,
  } = useShuffle()

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>🔀 発表順シャッフル</Text>

      {members.length === 0 ? (
        <View style={styles.inputArea}>
          <TextInput
            style={styles.textInput}
            placeholder={'メンバー名を入力（カンマ or 改行区切り）\n例: 田中, 佐藤, 鈴木'}
            placeholderTextColor={theme.textMuted}
            value={input}
            onChangeText={setInput}
            multiline
            numberOfLines={4}
          />
          <TouchableOpacity
            style={[styles.btnPrimary, !input.trim() && styles.btnDisabled]}
            onPress={addMembers}
            disabled={!input.trim()}
          >
            <Text style={styles.btnPrimaryText}>メンバーを登録</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <View style={styles.list}>
            {(shuffled.length > 0 ? shuffled : members).map((name, i) => (
              <View key={i} style={styles.memberItem}>
                <Text style={styles.memberNumber}>{i + 1}.</Text>
                <Text style={styles.memberName}>{name}</Text>
              </View>
            ))}
          </View>
          <View style={styles.controls}>
            <TouchableOpacity
              style={[styles.btnPrimary, isShuffling && styles.btnDisabled]}
              onPress={shuffleMembers}
              disabled={isShuffling}
            >
              <Text style={styles.btnPrimaryText}>
                {isShuffling ? 'シャッフル中...' : '🎲 シャッフル'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnSecondary} onPress={resetMembers}>
              <Text style={styles.btnSecondaryText}>メンバー変更</Text>
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
  textInput: {
    backgroundColor: theme.surface,
    borderWidth: 1,
    borderColor: theme.border,
    borderRadius: theme.radius,
    color: theme.text,
    fontSize: 16,
    padding: 14,
    minHeight: 120,
    textAlignVertical: 'top',
  },
  list: {
    gap: 6,
    marginBottom: 16,
  },
  memberItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 12,
    backgroundColor: theme.surface,
    borderRadius: theme.radius,
    borderWidth: 1,
    borderColor: theme.border,
  },
  memberNumber: {
    color: theme.primary,
    fontWeight: '700',
    minWidth: 24,
  },
  memberName: {
    fontWeight: '500',
    color: theme.text,
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
  btnDisabled: {
    opacity: 0.5,
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
})
