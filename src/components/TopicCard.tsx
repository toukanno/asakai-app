import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Topic } from '../types';
import { getCategoryLabel } from '../utils/topics';

const CATEGORY_COLORS: Record<string, string> = {
  icebreaker: '#FF6B6B',
  work: '#4A90D9',
  fun: '#F5A623',
  growth: '#7ED321',
};

interface Props {
  topic: Topic;
  onRefresh?: () => void;
}

export default function TopicCard({ topic, onRefresh }: Props) {
  const color = CATEGORY_COLORS[topic.category] || '#999';

  return (
    <View style={[styles.card, { borderLeftColor: color }]}>
      <View style={styles.header}>
        <View style={[styles.badge, { backgroundColor: color }]}>
          <Text style={styles.badgeText}>{getCategoryLabel(topic.category)}</Text>
        </View>
        {onRefresh && (
          <TouchableOpacity onPress={onRefresh} style={styles.refreshButton}>
            <Text style={styles.refreshIcon}>↻</Text>
          </TouchableOpacity>
        )}
      </View>
      <Text style={styles.topicText}>{topic.text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
  refreshButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F0F0F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  refreshIcon: {
    fontSize: 18,
    color: '#666',
  },
  topicText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    fontWeight: '500',
  },
});
