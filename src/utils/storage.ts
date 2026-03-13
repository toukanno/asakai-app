import AsyncStorage from '@react-native-async-storage/async-storage';
import { Member } from '../types';

const MEMBERS_KEY = '@asakai_members';

export async function loadMembers(): Promise<Member[]> {
  const json = await AsyncStorage.getItem(MEMBERS_KEY);
  if (!json) return [];
  return JSON.parse(json);
}

export async function saveMembers(members: Member[]): Promise<void> {
  await AsyncStorage.setItem(MEMBERS_KEY, JSON.stringify(members));
}
