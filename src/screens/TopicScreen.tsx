import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { TopicCategory, Topic } from '../types';
import { generateTopic, getAllCategories, getCategoryLabel } from '../utils/topics';
import TopicCard from '../components/TopicCard';

const CATEGORY_COLORS: Record<string, string> = {
  icebreaker: '#FF6B6B',
  work: '#4A90D9',
  fun: '#F5A623',
  growth: '#7ED321',
};

export default function TopicScreen() {
  const [selectedCategory, setSelectedCategory] = useState<TopicCategory | null>(null);
  const [currentTopic, setCurrentTopic] = useState<Topic | null>(null);
  const [history, setHistory] = useState<Topic[]>([]);

  const generate = () => {
    const topic = generateTopic(selectedCategory ?? undefined);
    setCurrentTopic(topic);
    setHistory((prev) => [topic, ...prev].slice(0, 20));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>話題ジェネレーター</Text>
        <Text style={styles.subtitle}>カテゴリを選んでボタンを押そう</Text>
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
      >
        {/* カテゴリ選択 */}
        <View style={styles.categoryRow}>
          <TouchableOpacity
            style={[
              styles.categoryChip,
              !selectedCategory && styles.categoryChipActive,
            ]}
            onPress={() => setSelectedCategory(null)}
          >
            <Text
              style={[
                styles.categoryChipText,
                !selectedCategory && styles.categoryChipTextActive,
              ]}
            >
              ランダム
            </Text>
          </TouchableOpacity>
          {getAllCategories().map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[
                styles.categoryChip,
                selectedCategory === cat && {
                  backgroundColor: CATEGORY_COLORS[cat],
                  borderColor: CATEGORY_COLORS[cat],
                },
              ]}
              onPress={() => setSelectedCategory(cat)}
            >
              <Text
                style={[
                  styles.categoryChipText,
                  selectedCategory === cat && styles.categoryChipTextActive,
                ]}
              >
                {getCategoryLabel(cat)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* 生成ボタン */}
        <TouchableOpacity style={styles.generateButton} onPress={generate}>
          <Text style={styles.generateButtonText}>話題を生成する</Text>
        </TouchableOpacity>

        {/* 現在の話題 */}
        {currentTopic && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>生成された話題</Text>
            <TopicCard topic={currentTopic} onRefresh={generate} />
          </View>
        )}

        {/* 履歴 */}
        {history.length > 1 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>履歴</Text>
            {history.slice(1).map((topic) => (
              <TopicCard key={topic.id} topic={topic} />
            ))}
          </View>
        )}

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  header: {
    backgroundColor: '#4A90D9',
    paddingTop: 60,
    paddingBottom: 24,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  subtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 4,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
  },
  categoryRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 20,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: '#DDD',
    backgroundColor: '#FFFFFF',
  },
  categoryChipActive: {
    backgroundColor: '#4A90D9',
    borderColor: '#4A90D9',
  },
  categoryChipText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  categoryChipTextActive: {
    color: '#FFFFFF',
  },
  generateButton: {
    backgroundColor: '#4A90D9',
    borderRadius: 16,
    padding: 18,
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#4A90D9',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  generateButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    marginBottom: 12,
  },
});
