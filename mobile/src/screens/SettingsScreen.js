import React, { useState, useCallback } from 'react';
import {
  View, Text, TextInput, StyleSheet, TouchableOpacity,
  ScrollView, Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, fonts, radius } from '../theme';
import { SectionLabel } from '../components/BondCard';
import { getApiKey, setApiKey, clearApiKey, getStreak, getWorkoutCompletions } from '../services/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SettingsScreen({ navigation }) {
  const [key, setKey] = useState('');
  const [savedKey, setSavedKey] = useState(null);
  const [showKey, setShowKey] = useState(false);
  const [streak, setStreak] = useState(0);
  const [totalWorkouts, setTotalWorkouts] = useState(0);
  const [saving, setSaving] = useState(false);

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [])
  );

  async function loadData() {
    const [k, s, w] = await Promise.all([getApiKey(), getStreak(), getWorkoutCompletions()]);
    setSavedKey(k);
    setKey(k || '');
    setStreak(s);
    setTotalWorkouts(w.length);
  }

  async function handleSave() {
    if (!key.trim()) return;
    setSaving(true);
    await setApiKey(key.trim());
    setSavedKey(key.trim());
    setSaving(false);
    Alert.alert('Saved', 'API key saved. Bond Coach is active.');
  }

  async function handleClear() {
    Alert.alert(
      'Remove API Key',
      'This will disable the Bond Coach AI. Continue?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove', style: 'destructive',
          onPress: async () => {
            await clearApiKey();
            setKey('');
            setSavedKey(null);
          }
        }
      ]
    );
  }

  async function handleResetProgress() {
    Alert.alert(
      'Reset Progress',
      'This will clear your streak and all workout completions. This cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset', style: 'destructive',
          onPress: async () => {
            await AsyncStorage.multiRemove([
              '@bond:completed_tasks',
              '@bond:streak',
              '@bond:last_active',
              '@bond:workout_completions',
            ]);
            loadData();
          }
        }
      ]
    );
  }

  const maskedKey = savedKey
    ? `sk-...${savedKey.slice(-6)}`
    : null;

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={20} color={colors.gold} />
        </TouchableOpacity>
        <Text style={styles.title}>Settings</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

        {/* Stats */}
        <SectionLabel>Your Progress</SectionLabel>
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Ionicons name="flame" size={20} color={streak > 0 ? colors.gold : colors.muted} />
            <Text style={styles.statNum}>{streak}</Text>
            <Text style={styles.statLabel}>Day streak</Text>
          </View>
          <View style={styles.statCard}>
            <Ionicons name="barbell-outline" size={20} color={colors.gold} />
            <Text style={styles.statNum}>{totalWorkouts}</Text>
            <Text style={styles.statLabel}>Workouts logged</Text>
          </View>
        </View>

        {/* API Key */}
        <SectionLabel>Bond Coach · OpenAI</SectionLabel>
        <View style={styles.card}>
          <Text style={styles.cardDesc}>
            The Bond Coach AI calls OpenAI GPT-4o directly from your device. Your key is stored only on this phone and never sent anywhere else.
          </Text>

          {savedKey && (
            <View style={styles.savedRow}>
              <Ionicons name="checkmark-circle" size={16} color={colors.gold} />
              <Text style={styles.savedText}>Active: {maskedKey}</Text>
              <TouchableOpacity onPress={handleClear} style={styles.clearBtn}>
                <Text style={styles.clearBtnText}>Remove</Text>
              </TouchableOpacity>
            </View>
          )}

          <View style={styles.inputRow}>
            <TextInput
              style={styles.input}
              value={key}
              onChangeText={setKey}
              placeholder="sk-..."
              placeholderTextColor={colors.muted}
              secureTextEntry={!showKey}
              autoCapitalize="none"
              autoCorrect={false}
            />
            <TouchableOpacity style={styles.eyeBtn} onPress={() => setShowKey(v => !v)}>
              <Ionicons name={showKey ? 'eye-off-outline' : 'eye-outline'} size={18} color={colors.muted} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={[styles.saveBtn, (!key.trim() || saving) && styles.saveBtnDisabled]}
            onPress={handleSave}
            disabled={!key.trim() || saving}
          >
            <Text style={styles.saveBtnText}>{saving ? 'Saving...' : 'Save Key'}</Text>
          </TouchableOpacity>

          <Text style={styles.keyNote}>
            Get a key at platform.openai.com → API Keys. GPT-4o usage costs ~$0.01–0.05 per conversation.
          </Text>
        </View>

        {/* About */}
        <SectionLabel>About 007 Mode</SectionLabel>
        <View style={styles.card}>
          {ABOUT_ITEMS.map((item, i) => (
            <View key={i} style={[styles.aboutRow, i < ABOUT_ITEMS.length - 1 && styles.aboutRowBorder]}>
              <Text style={styles.aboutLabel}>{item.label}</Text>
              <Text style={styles.aboutValue}>{item.value}</Text>
            </View>
          ))}
        </View>

        {/* Danger zone */}
        <SectionLabel>Data</SectionLabel>
        <TouchableOpacity style={styles.dangerBtn} onPress={handleResetProgress}>
          <Ionicons name="trash-outline" size={16} color={colors.danger + 'CC'} />
          <Text style={styles.dangerBtnText}>Reset Progress & Streak</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const ABOUT_ITEMS = [
  { label: 'Version', value: '1.0.0' },
  { label: 'Era', value: 'Casino Royale (2006)' },
  { label: 'Bond', value: 'Daniel Craig' },
  { label: 'Trainer', value: 'Simon Waterson' },
  { label: 'Tailor', value: 'Tom Ford' },
  { label: 'Watch', value: 'Omega Seamaster Aqua Terra' },
  { label: 'Cocktail', value: 'The Vesper Martini' },
];

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  header: {
    flexDirection: 'row', alignItems: 'center', gap: spacing.sm,
    padding: spacing.lg, paddingBottom: spacing.sm,
  },
  backBtn: { padding: 4 },
  title: { color: colors.white, fontSize: 22, fontWeight: fonts.bold, letterSpacing: 1 },
  content: { padding: spacing.lg, paddingBottom: spacing.xxl },
  statsRow: { flexDirection: 'row', gap: spacing.md, marginBottom: spacing.md },
  statCard: {
    flex: 1, backgroundColor: colors.card, borderWidth: 1, borderColor: colors.cardBorder,
    borderRadius: radius.md, padding: spacing.md, alignItems: 'center', gap: 6,
  },
  statNum: { color: colors.white, fontSize: 26, fontWeight: fonts.bold },
  statLabel: { color: colors.muted, fontSize: 12 },
  card: {
    backgroundColor: colors.card, borderWidth: 1, borderColor: colors.cardBorder,
    borderRadius: radius.md, padding: spacing.md, marginBottom: spacing.md,
  },
  cardDesc: { color: colors.silver, fontSize: 13, lineHeight: 19, marginBottom: spacing.md },
  savedRow: {
    flexDirection: 'row', alignItems: 'center', gap: spacing.sm,
    backgroundColor: colors.goldDark + '18', borderRadius: radius.sm,
    padding: spacing.sm, marginBottom: spacing.sm,
  },
  savedText: { color: colors.gold, fontSize: 13, flex: 1 },
  clearBtn: { paddingHorizontal: spacing.sm },
  clearBtnText: { color: colors.danger + 'CC', fontSize: 13 },
  inputRow: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.cardBorder,
    borderRadius: radius.sm, marginBottom: spacing.sm,
  },
  input: {
    flex: 1, color: colors.white, fontSize: 14,
    paddingHorizontal: spacing.md, paddingVertical: spacing.sm,
  },
  eyeBtn: { padding: spacing.md },
  saveBtn: {
    backgroundColor: colors.gold, borderRadius: radius.sm,
    paddingVertical: spacing.md, alignItems: 'center', marginBottom: spacing.sm,
  },
  saveBtnDisabled: { backgroundColor: colors.muted + '50' },
  saveBtnText: { color: colors.background, fontWeight: fonts.semibold, fontSize: 14, letterSpacing: 1 },
  keyNote: { color: colors.muted, fontSize: 12, lineHeight: 17 },
  aboutRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: spacing.sm },
  aboutRowBorder: { borderBottomWidth: 1, borderBottomColor: colors.cardBorder },
  aboutLabel: { color: colors.muted, fontSize: 13 },
  aboutValue: { color: colors.offWhite, fontSize: 13 },
  dangerBtn: {
    flexDirection: 'row', alignItems: 'center', gap: spacing.sm,
    borderWidth: 1, borderColor: colors.danger + '50',
    borderRadius: radius.md, padding: spacing.md,
  },
  dangerBtnText: { color: colors.danger + 'CC', fontSize: 14 },
});
