import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Member, Topic } from '../types';
import { loadMembers } from '../utils/storage';
import { generateTopics, generateTopic } from '../utils/topics';
import { formatDate, getGreeting } from '../utils/date';
import TopicCard from '../components/TopicCard';

export default function HomeScreen() {
  const [members, setMembers] = useState<Member[]>([]);
  const [facilitator, setFacilitator] = useState<Member | null>(null);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const today = formatDate(new Date());
  const greeting = getGreeting();

  const loadData = useCallback(async () => {
    const loaded = await loadMembers();
    setMembers(loaded);
    if (loaded.length > 0) {
      const idx = Math.floor(Math.random() * loaded.length);
      setFacilitator(loaded[idx]);
    } else {
      setFacilitator(null);
    }
  }, []);

  useEffect(() => {
    loadData();
    setTopics(generateTopics(3));
  }, [loadData]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadData();
    setTopics(generateTopics(3));
    setRefreshing(false);
  }, [loadData]);

  const refreshFacilitator = () => {
    if (members.length === 0) return;
    const idx = Math.floor(Math.random() * members.length);
    setFacilitator(members[idx]);
  };

  const refreshSingleTopic = (index: number) => {
    setTopics((prev) => {
      const next = [...prev];
      next[index] = generateTopic();
      return next;
    });
  };

  const addTopic = () => {
    setTopics((prev) => [...prev, generateTopic()]);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.headerSection}>
        <Text style={styles.greeting}>{greeting}</Text>
        <Text style={styles.date}>{today}</Text>
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* ファシリテーター */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>今日のファシリテーター</Text>
          <TouchableOpacity
            style={styles.facilitatorCard}
            onPress={refreshFacilitator}
          >
            {facilitator ? (
              <>
                <Text style={styles.facilitatorName}>{facilitator.name}</Text>
                <Text style={styles.facilitatorHint}>
                  タップで変更
                </Text>
              </>
            ) : (
              <Text style={styles.facilitatorEmpty}>
                メンバーを追加してください
              </Text>
            )}
          </TouchableOpacity>
        </View>

        {/* 話題 */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>今日の話題</Text>
            <TouchableOpacity onPress={onRefresh} style={styles.shuffleButton}>
              <Text style={styles.shuffleText}>すべて更新</Text>
            </TouchableOpacity>
          </View>
          {topics.map((topic, index) => (
            <TopicCard
              key={topic.id}
              topic={topic}
              onRefresh={() => refreshSingleTopic(index)}
            />
          ))}
          <TouchableOpacity style={styles.addTopicButton} onPress={addTopic}>
            <Text style={styles.addTopicText}>＋ 話題を追加</Text>
          </TouchableOpacity>
        </View>

        {/* メンバー一覧 */}
        {members.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              参加メンバー（{members.length}人）
            </Text>
            <View style={styles.memberList}>
              {members.map((m) => (
                <View
                  key={m.id}
                  style={[
                    styles.memberTag,
                    facilitator?.id === m.id && styles.memberTagActive,
                  ]}
                >
                  <Text
                    style={[
                      styles.memberTagText,
                      facilitator?.id === m.id && styles.memberTagTextActive,
                    ]}
                  >
                    {m.name}
                  </Text>
                </View>
              ))}
            </View>
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
  headerSection: {
    backgroundColor: '#4A90D9',
    paddingTop: 60,
    paddingBottom: 24,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  greeting: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.85)',
    marginBottom: 4,
  },
  date: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#333',
    marginBottom: 12,
  },
  facilitatorCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  facilitatorName: {
    fontSize: 28,
    fontWeight: '700',
    color: '#4A90D9',
  },
  facilitatorHint: {
    fontSize: 12,
    color: '#999',
    marginTop: 8,
  },
  facilitatorEmpty: {
    fontSize: 15,
    color: '#999',
  },
  shuffleButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: '#E8F0FE',
  },
  shuffleText: {
    fontSize: 13,
    color: '#4A90D9',
    fontWeight: '600',
  },
  addTopicButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#E0E0E0',
    borderStyle: 'dashed',
  },
  addTopicText: {
    fontSize: 14,
    color: '#999',
    fontWeight: '600',
  },
  memberList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  memberTag: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 6,
    paddingHorizontal: 14,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  memberTagActive: {
    backgroundColor: '#4A90D9',
    borderColor: '#4A90D9',
  },
  memberTagText: {
    fontSize: 13,
    color: '#666',
    fontWeight: '500',
  },
  memberTagTextActive: {
    color: '#FFFFFF',
  },
});
