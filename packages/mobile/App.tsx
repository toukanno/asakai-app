import React from 'react'
import { StatusBar, View, Text, StyleSheet } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import AgendaScreen from './src/screens/AgendaScreen'
import IceBreakerScreen from './src/screens/IceBreakerScreen'
import ShuffleScreen from './src/screens/ShuffleScreen'
import NotesScreen from './src/screens/NotesScreen'
import ShareScreen from './src/screens/ShareScreen'

const Tab = createBottomTabNavigator()

const theme = {
  bg: '#0f172a',
  surface: '#1e293b',
  primary: '#f59e0b',
  text: '#f1f5f9',
  textMuted: '#94a3b8',
}

function TabIcon({ label, focused }: { label: string; focused: boolean }) {
  return (
    <Text style={[styles.tabIcon, focused && styles.tabIconFocused]}>
      {label}
    </Text>
  )
}

function Header() {
  const today = new Date()
  const dateStr = `${today.getFullYear()}/${today.getMonth() + 1}/${today.getDate()}`
  const dayNames = ['日', '月', '火', '水', '木', '金', '土']
  const dayStr = dayNames[today.getDay()]

  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>☀️ 朝会ジェネレーター</Text>
      <Text style={styles.headerDate}>{dateStr}（{dayStr}）</Text>
    </View>
  )
}

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="light-content" backgroundColor={theme.bg} />
      <NavigationContainer
        theme={{
          dark: true,
          colors: {
            primary: theme.primary,
            background: theme.bg,
            card: theme.surface,
            text: theme.text,
            border: theme.surface,
            notification: theme.primary,
          },
          fonts: {
            regular: { fontFamily: 'System', fontWeight: '400' },
            medium: { fontFamily: 'System', fontWeight: '500' },
            bold: { fontFamily: 'System', fontWeight: '700' },
            heavy: { fontFamily: 'System', fontWeight: '900' },
          },
        }}
      >
        <Header />
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarStyle: {
              backgroundColor: theme.surface,
              borderTopColor: theme.surface,
            },
            tabBarActiveTintColor: theme.primary,
            tabBarInactiveTintColor: theme.textMuted,
          }}
        >
          <Tab.Screen
            name="Agenda"
            component={AgendaScreen}
            options={{
              tabBarLabel: 'アジェンダ',
              tabBarIcon: ({ focused }) => (
                <TabIcon label="📋" focused={focused} />
              ),
            }}
          />
          <Tab.Screen
            name="IceBreaker"
            component={IceBreakerScreen}
            options={{
              tabBarLabel: 'アイスブレイク',
              tabBarIcon: ({ focused }) => (
                <TabIcon label="🧊" focused={focused} />
              ),
            }}
          />
          <Tab.Screen
            name="Shuffle"
            component={ShuffleScreen}
            options={{
              tabBarLabel: 'シャッフル',
              tabBarIcon: ({ focused }) => (
                <TabIcon label="🔀" focused={focused} />
              ),
            }}
          />
          <Tab.Screen
            name="Notes"
            component={NotesScreen}
            options={{
              tabBarLabel: 'メモ',
              tabBarIcon: ({ focused }) => (
                <TabIcon label="📝" focused={focused} />
              ),
            }}
          />
          <Tab.Screen
            name="Share"
            component={ShareScreen}
            options={{
              tabBarLabel: '共有',
              tabBarIcon: ({ focused }) => (
                <TabIcon label="📨" focused={focused} />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: theme.bg,
    paddingTop: 8,
    paddingBottom: 8,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: theme.text,
  },
  headerDate: {
    color: theme.textMuted,
    fontSize: 14,
    marginTop: 2,
  },
  tabIcon: {
    fontSize: 20,
    opacity: 0.6,
  },
  tabIconFocused: {
    opacity: 1,
  },
})
