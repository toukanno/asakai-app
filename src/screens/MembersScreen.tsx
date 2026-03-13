import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Member } from '../types';
import { loadMembers, saveMembers } from '../utils/storage';
import MemberChip from '../components/MemberChip';

export default function MembersScreen() {
  const [members, setMembers] = useState<Member[]>([]);
  const [name, setName] = useState('');

  const load = useCallback(async () => {
    const loaded = await loadMembers();
    setMembers(loaded);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const addMember = async () => {
    const trimmed = name.trim();
    if (!trimmed) return;
    if (members.some((m) => m.name === trimmed)) {
      Alert.alert('エラー', '同じ名前のメンバーが既に存在します');
      return;
    }
    const newMember: Member = {
      id: Date.now().toString(36) + Math.random().toString(36).slice(2),
      name: trimmed,
      createdAt: Date.now(),
    };
    const updated = [...members, newMember];
    setMembers(updated);
    await saveMembers(updated);
    setName('');
  };

  const deleteMember = (id: string) => {
    const member = members.find((m) => m.id === id);
    Alert.alert(
      'メンバー削除',
      `${member?.name}を削除しますか？`,
      [
        { text: 'キャンセル', style: 'cancel' },
        {
          text: '削除',
          style: 'destructive',
          onPress: async () => {
            const updated = members.filter((m) => m.id !== id);
            setMembers(updated);
            await saveMembers(updated);
          },
        },
      ],
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.header}>
        <Text style={styles.title}>メンバー管理</Text>
        <Text style={styles.subtitle}>
          {members.length}人のメンバー
        </Text>
      </View>

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="名前を入力..."
          value={name}
          onChangeText={setName}
          onSubmitEditing={addMember}
          returnKeyType="done"
        />
        <TouchableOpacity
          style={[styles.addButton, !name.trim() && styles.addButtonDisabled]}
          onPress={addMember}
          disabled={!name.trim()}
        >
          <Text style={styles.addButtonText}>追加</Text>
        </TouchableOpacity>
      </View>

      {members.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyIcon}>👥</Text>
          <Text style={styles.emptyText}>
            メンバーを追加して{'\n'}朝会を始めましょう
          </Text>
        </View>
      ) : (
        <FlatList
          data={members}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <View style={styles.memberRow}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>
                  {item.name.charAt(0)}
                </Text>
              </View>
              <Text style={styles.memberName}>{item.name}</Text>
              <TouchableOpacity
                onPress={() => deleteMember(item.id)}
                style={styles.deleteButton}
              >
                <Text style={styles.deleteButtonText}>削除</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </KeyboardAvoidingView>
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
  inputRow: {
    flexDirection: 'row',
    padding: 16,
    gap: 10,
  },
  input: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  addButton: {
    backgroundColor: '#4A90D9',
    borderRadius: 12,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  addButtonDisabled: {
    backgroundColor: '#B0C4DE',
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  listContent: {
    padding: 16,
  },
  memberRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E8F0FE',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#4A90D9',
  },
  memberName: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  deleteButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: '#FFF0F0',
  },
  deleteButtonText: {
    fontSize: 13,
    color: '#FF4444',
    fontWeight: '600',
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 80,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    lineHeight: 24,
  },
});
