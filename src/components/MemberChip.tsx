import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Member } from '../types';

interface Props {
  member: Member;
  selected?: boolean;
  onDelete?: () => void;
}

export default function MemberChip({ member, selected, onDelete }: Props) {
  return (
    <View style={[styles.chip, selected && styles.chipSelected]}>
      <Text style={[styles.name, selected && styles.nameSelected]}>
        {member.name}
      </Text>
      {onDelete && (
        <TouchableOpacity onPress={onDelete} style={styles.deleteBtn}>
          <Text style={styles.deleteText}>×</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F4F8',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 14,
    marginRight: 8,
    marginBottom: 8,
  },
  chipSelected: {
    backgroundColor: '#4A90D9',
  },
  name: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  nameSelected: {
    color: '#FFFFFF',
  },
  deleteBtn: {
    marginLeft: 6,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(0,0,0,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteText: {
    color: '#666',
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 18,
  },
});
