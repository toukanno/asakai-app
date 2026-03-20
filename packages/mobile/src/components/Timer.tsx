import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useTimer } from '@asakai/shared'
import { theme } from '../styles/theme'

interface TimerProps {
  minutes: number
  onComplete: () => void
  isActive: boolean
}

export default function Timer({ minutes, onComplete, isActive }: TimerProps) {
  const { formattedTime, progress, isWarning, isExpired } = useTimer({
    minutes,
    onComplete,
    isActive,
  })

  return (
    <View style={styles.container}>
      <Text
        style={[
          styles.display,
          isWarning && styles.displayWarning,
          isExpired && styles.displayExpired,
        ]}
      >
        {formattedTime}
      </Text>
      <View style={styles.bar}>
        <View
          style={[
            styles.barFill,
            { width: `${progress}%` },
            isWarning && styles.barFillWarning,
          ]}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
  },
  display: {
    fontSize: 48,
    fontWeight: '700',
    color: theme.text,
    textAlign: 'center',
    fontVariant: ['tabular-nums'],
    letterSpacing: 2,
  },
  displayWarning: {
    color: theme.warning,
  },
  displayExpired: {
    color: theme.warning,
  },
  bar: {
    height: 6,
    backgroundColor: theme.border,
    borderRadius: 3,
    marginTop: 8,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    backgroundColor: theme.primary,
    borderRadius: 3,
  },
  barFillWarning: {
    backgroundColor: theme.warning,
  },
})
