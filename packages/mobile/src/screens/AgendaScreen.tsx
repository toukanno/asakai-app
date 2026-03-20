import React from 'react'
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native'
import { useAgenda } from '@asakai/shared'
import Timer from '../components/Timer'
import { theme } from '../styles/theme'

export default function AgendaScreen() {
  const {
    items,
    currentIndex,
    isRunning,
    isPaused,
    totalMinutes,
    allDone,
    startMeeting,
    handleTimerComplete,
    skipItem,
    resetMeeting,
    togglePause,
  } = useAgenda()

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>📋 アジェンダ</Text>
        <Text style={styles.total}>合計 {totalMinutes} 分</Text>
      </View>

      <View style={styles.list}>
        {items.map((item, index) => (
          <View
            key={index}
            style={[
              styles.item,
              index === currentIndex && styles.itemActive,
              item.completed && styles.itemDone,
            ]}
          >
            <Text style={styles.icon}>{item.icon}</Text>
            <Text style={[styles.label, item.completed && styles.labelDone]}>
              {item.label}
            </Text>
            <Text style={styles.duration}>{item.duration}分</Text>
            {item.completed && <Text style={styles.check}>✅</Text>}
          </View>
        ))}
      </View>

      {currentIndex !== null && isRunning && (
        <View style={styles.current}>
          <Text style={styles.currentLabel}>
            {items[currentIndex].icon} {items[currentIndex].label}
          </Text>
          <Timer
            key={`${currentIndex}-${items[currentIndex].label}`}
            minutes={items[currentIndex].duration}
            onComplete={handleTimerComplete}
            isActive={isRunning && !isPaused}
          />
          <View style={styles.controls}>
            <TouchableOpacity style={styles.btnSecondary} onPress={togglePause}>
              <Text style={styles.btnSecondaryText}>
                {isPaused ? '▶ 再開' : '⏸ 停止'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnSecondary} onPress={skipItem}>
              <Text style={styles.btnSecondaryText}>スキップ ⏭</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {allDone && (
        <View style={styles.complete}>
          <Text style={styles.completeText}>🎉 朝会完了！お疲れ様でした！</Text>
        </View>
      )}

      <View style={styles.controls}>
        {!isRunning && !allDone && (
          <TouchableOpacity style={styles.btnPrimary} onPress={startMeeting}>
            <Text style={styles.btnPrimaryText}>▶ 朝会スタート</Text>
          </TouchableOpacity>
        )}
        {(isRunning || allDone) && (
          <TouchableOpacity style={styles.btnSecondary} onPress={resetMeeting}>
            <Text style={styles.btnSecondaryText}>🔄 リセット</Text>
          </TouchableOpacity>
        )}
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: theme.text,
  },
  total: {
    color: theme.textMuted,
    fontSize: 14,
  },
  list: {
    gap: 6,
    marginBottom: 16,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 12,
    backgroundColor: theme.surface,
    borderRadius: theme.radius,
    borderWidth: 1,
    borderColor: theme.border,
  },
  itemActive: {
    borderColor: theme.primary,
    backgroundColor: 'rgba(245, 158, 11, 0.1)',
  },
  itemDone: {
    opacity: 0.5,
  },
  icon: {
    fontSize: 20,
  },
  label: {
    flex: 1,
    fontWeight: '500',
    color: theme.text,
  },
  labelDone: {
    color: theme.textMuted,
  },
  duration: {
    color: theme.textMuted,
    fontSize: 14,
  },
  check: {
    fontSize: 16,
  },
  current: {
    backgroundColor: theme.surface,
    borderRadius: theme.radius,
    padding: 20,
    marginBottom: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.primary,
  },
  currentLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.text,
    marginBottom: 12,
  },
  controls: {
    flexDirection: 'row',
    gap: 8,
  },
  complete: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
    borderWidth: 1,
    borderColor: theme.success,
    borderRadius: theme.radius,
    marginBottom: 16,
  },
  completeText: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.text,
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
})
