import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { useIceBreaker } from '@asakai/shared'
import { theme } from '../styles/theme'

export default function IceBreakerScreen() {
  const { topic, isAnimating, generateTopic } = useIceBreaker()

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🧊 アイスブレイク</Text>
      <View style={styles.topicDisplay}>
        <Text style={styles.topicText}>
          {topic || 'ボタンを押してお題を生成！'}
        </Text>
      </View>
      <TouchableOpacity
        style={[styles.btn, isAnimating && styles.btnDisabled]}
        onPress={generateTopic}
        disabled={isAnimating}
      >
        <Text style={styles.btnText}>
          {isAnimating ? 'シャッフル中...' : '🎲 お題を生成'}
        </Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bg,
    padding: 16,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: theme.text,
    marginBottom: 16,
  },
  topicDisplay: {
    backgroundColor: theme.surface,
    borderRadius: theme.radius,
    padding: 32,
    minHeight: 120,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: theme.border,
  },
  topicText: {
    fontSize: 18,
    color: theme.text,
    textAlign: 'center',
    lineHeight: 28,
  },
  btn: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 14,
    backgroundColor: theme.primary,
    borderRadius: theme.radius,
  },
  btnDisabled: {
    opacity: 0.5,
  },
  btnText: {
    fontWeight: '600',
    fontSize: 16,
    color: '#000',
  },
})
