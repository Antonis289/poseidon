import React, { useEffect, useState, useCallback } from 'react';
import {
  View, Text, ScrollView, StyleSheet, TouchableOpacity
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, fonts, radius } from '../theme';
import { GoldDivider, SectionLabel } from '../components/BondCard';
import {
  getTodayTasks, completeTask, uncompleteTask, getStreak, updateStreak
} from '../services/storage';
import { WORKOUT_PLAN, DAILY_TASKS } from '../data/bondData';

const DAYS = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export default function HomeScreen({ navigation }) {
  const [completedTasks, setCompletedTasks] = useState({});
  const [streak, setStreak] = useState(0);
  const todayIndex = new Date().getDay();
  const todayName = DAY_NAMES[todayIndex];
  const workout = WORKOUT_PLAN[DAYS[todayIndex]];

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [])
  );

  async function loadData() {
    const [tasks, s] = await Promise.all([getTodayTasks(), getStreak()]);
    setCompletedTasks(tasks);
    setStreak(s);
  }

  async function toggleTask(taskId) {
    if (completedTasks[taskId]) {
      await uncompleteTask(taskId);
    } else {
      await completeTask(taskId);
      await updateStreak();
    }
    loadData();
  }

  const doneCount = DAILY_TASKS.filter(t => completedTasks[t.id]).length;
  const allDone = doneCount === DAILY_TASKS.length;

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>{getTimeOfDay()}</Text>
            <Text style={styles.headline}>007 Mode</Text>
            <Text style={styles.subline}>Casino Royale Era · Daniel Craig</Text>
          </View>
          <TouchableOpacity style={styles.settingsBtn} onPress={() => navigation.navigate('Settings')}>
            <Ionicons name="settings-outline" size={20} color={colors.silver} />
          </TouchableOpacity>
        </View>

        {/* Streak */}
        <View style={styles.streakRow}>
          <View style={styles.streakBadge}>
            <Ionicons name="flame" size={18} color={streak > 0 ? colors.gold : colors.muted} />
            <Text style={[styles.streakNum, streak === 0 && styles.streakZero]}>{streak}</Text>
            <Text style={styles.streakLabel}>day streak</Text>
          </View>
          <View style={styles.progressPill}>
            <Text style={styles.progressText}>{doneCount}/{DAILY_TASKS.length} today</Text>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${(doneCount / DAILY_TASKS.length) * 100}%` }]} />
            </View>
          </View>
        </View>

        <GoldDivider />

        {/* Daily Mission */}
        <SectionLabel>Daily Mission · {todayName}</SectionLabel>
        <View style={styles.tasksCard}>
          {DAILY_TASKS.map(task => {
            const done = !!completedTasks[task.id];
            return (
              <TouchableOpacity
                key={task.id}
                style={[styles.taskRow, done && styles.taskRowDone]}
                onPress={() => toggleTask(task.id)}
                activeOpacity={0.7}
              >
                <View style={[styles.taskCheck, done && styles.taskCheckDone]}>
                  {done && <Ionicons name="checkmark" size={12} color={colors.background} />}
                </View>
                <Ionicons name={task.icon} size={16} color={done ? colors.muted : colors.gold} />
                <Text style={[styles.taskLabel, done && styles.taskLabelDone]}>{task.label}</Text>
              </TouchableOpacity>
            );
          })}
          {allDone && (
            <View style={styles.allDoneBanner}>
              <Ionicons name="checkmark-circle" size={16} color={colors.gold} />
              <Text style={styles.allDoneText}>Mission complete. Well done, 007.</Text>
            </View>
          )}
        </View>

        {/* Today's workout preview */}
        <SectionLabel>Today's Session</SectionLabel>
        <TouchableOpacity
          style={styles.workoutPreview}
          onPress={() => navigation.navigate('Workout')}
          activeOpacity={0.8}
        >
          <View style={styles.workoutHeader}>
            <View>
              <Text style={styles.workoutTitle}>{workout.title}</Text>
              <Text style={styles.workoutFocus}>{workout.focus}</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={colors.gold} />
          </View>
          {workout.exercises.slice(0, 3).map((ex, i) => (
            <View key={i} style={styles.exRow}>
              <Text style={styles.exName}>{ex.name}</Text>
              <Text style={styles.exDetail}>
                {ex.sets > 0 ? `${ex.sets}×${ex.reps}` : ex.reps}
              </Text>
            </View>
          ))}
          {workout.exercises.length > 3 && (
            <Text style={styles.moreEx}>+{workout.exercises.length - 3} more</Text>
          )}
        </TouchableOpacity>

        {/* Module grid */}
        <SectionLabel>Modules</SectionLabel>
        <View style={styles.grid}>
          {MODULES.map(m => (
            <TouchableOpacity
              key={m.label}
              style={styles.gridItem}
              onPress={() => navigation.navigate(m.screen)}
              activeOpacity={0.75}
            >
              <Ionicons name={m.icon} size={24} color={colors.gold} />
              <Text style={styles.gridLabel}>{m.label}</Text>
              <Text style={styles.gridSub}>{m.sub}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* AI Coach CTA */}
        <TouchableOpacity
          style={styles.coachCta}
          onPress={() => navigation.navigate('Coach')}
          activeOpacity={0.8}
        >
          <View style={styles.coachCtaLeft}>
            <View style={styles.coachAvatar}>
              <Text style={styles.coachAvatarText}>007</Text>
            </View>
            <View>
              <Text style={styles.coachCtaTitle}>Bond Coach</Text>
              <Text style={styles.coachCtaSub}>AI-powered transformation advice</Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={18} color={colors.gold} />
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const MODULES = [
  { label: 'Style', sub: 'Suits & grooming', screen: 'Style', icon: 'shirt-outline' },
  { label: 'Mindset', sub: 'Craig\'s psychology', screen: 'Mindset', icon: 'eye-outline' },
  { label: 'The Bar', sub: 'Vesper & more', screen: 'Cocktails', icon: 'wine-outline' },
  { label: 'Workout', sub: '7-day plan', screen: 'Workout', icon: 'barbell-outline' },
];

function getTimeOfDay() {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  scroll: { flex: 1 },
  content: { padding: spacing.lg, paddingBottom: spacing.xxl },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
  },
  greeting: { color: colors.silver, fontSize: 13, letterSpacing: 1 },
  headline: { color: colors.white, fontSize: 30, fontWeight: fonts.bold, letterSpacing: 2, marginTop: 2 },
  subline: { color: colors.muted, fontSize: 11, letterSpacing: 1.5, marginTop: 2 },
  settingsBtn: {
    padding: spacing.sm,
    backgroundColor: colors.card,
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  streakRow: { flexDirection: 'row', gap: spacing.md, marginBottom: spacing.sm, alignItems: 'center' },
  streakBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    borderRadius: radius.full,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  streakNum: { color: colors.gold, fontSize: 18, fontWeight: fonts.bold },
  streakZero: { color: colors.muted },
  streakLabel: { color: colors.muted, fontSize: 12 },
  progressPill: { flex: 1, gap: 6 },
  progressText: { color: colors.silver, fontSize: 12 },
  progressBar: { height: 3, backgroundColor: colors.cardBorder, borderRadius: 2 },
  progressFill: { height: 3, backgroundColor: colors.gold, borderRadius: 2 },
  tasksCard: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    borderRadius: radius.md,
    overflow: 'hidden',
    marginBottom: spacing.md,
  },
  taskRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.cardBorder,
  },
  taskRowDone: { opacity: 0.55 },
  taskCheck: {
    width: 20, height: 20, borderRadius: 4,
    borderWidth: 1.5, borderColor: colors.muted,
    alignItems: 'center', justifyContent: 'center',
  },
  taskCheckDone: { backgroundColor: colors.gold, borderColor: colors.gold },
  taskLabel: { color: colors.offWhite, fontSize: 14, flex: 1 },
  taskLabelDone: { textDecorationLine: 'line-through', color: colors.muted },
  allDoneBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    padding: spacing.md,
    backgroundColor: colors.goldDark + '20',
  },
  allDoneText: { color: colors.gold, fontSize: 13 },
  workoutPreview: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.goldDark,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  workoutHeader: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'flex-start', marginBottom: spacing.sm,
  },
  workoutTitle: { color: colors.white, fontSize: 16, fontWeight: fonts.semibold },
  workoutFocus: { color: colors.muted, fontSize: 12, marginTop: 2, letterSpacing: 0.5 },
  exRow: {
    flexDirection: 'row', justifyContent: 'space-between',
    paddingVertical: 5, borderBottomWidth: 1, borderBottomColor: colors.cardBorder,
  },
  exName: { color: colors.silver, fontSize: 13 },
  exDetail: { color: colors.gold, fontSize: 13, fontWeight: fonts.medium },
  moreEx: { color: colors.muted, fontSize: 12, marginTop: spacing.sm, textAlign: 'right' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, marginBottom: spacing.md },
  gridItem: {
    flex: 1, minWidth: '45%',
    backgroundColor: colors.card,
    borderWidth: 1, borderColor: colors.cardBorder,
    borderRadius: radius.md,
    padding: spacing.md,
    gap: 4,
  },
  gridLabel: { color: colors.white, fontSize: 14, fontWeight: fonts.semibold, marginTop: 4 },
  gridSub: { color: colors.muted, fontSize: 11 },
  coachCta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.navy,
    borderWidth: 1,
    borderColor: colors.navyLight,
    borderRadius: radius.md,
    padding: spacing.md,
  },
  coachCtaLeft: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  coachAvatar: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: colors.gold,
    alignItems: 'center', justifyContent: 'center',
  },
  coachAvatarText: { color: colors.background, fontWeight: fonts.bold, fontSize: 11, letterSpacing: 1 },
  coachCtaTitle: { color: colors.white, fontWeight: fonts.semibold, fontSize: 15 },
  coachCtaSub: { color: colors.silver, fontSize: 12, marginTop: 2 },
});
