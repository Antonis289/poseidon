import React, { useState, useCallback } from 'react';
import {
  View, Text, ScrollView, StyleSheet, TouchableOpacity
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, fonts, radius } from '../theme';
import { SectionLabel } from '../components/BondCard';
import { WORKOUT_PLAN } from '../data/bondData';
import { markWorkoutDone, isWorkoutDoneToday, getWorkoutCompletions } from '../services/storage';

const DAYS_ORDER = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
const DAY_LABELS = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
const todayIndex = (new Date().getDay() + 6) % 7; // Mon=0

export default function WorkoutScreen() {
  const [selectedDay, setSelectedDay] = useState(todayIndex);
  const [expanded, setExpanded] = useState({});
  const [doneDays, setDoneDays] = useState([]);
  const [todayDone, setTodayDone] = useState(false);
  const [marking, setMarking] = useState(false);

  useFocusEffect(
    useCallback(() => {
      loadProgress();
    }, [])
  );

  async function loadProgress() {
    const [completions, done] = await Promise.all([
      getWorkoutCompletions(),
      isWorkoutDoneToday(),
    ]);
    setDoneDays(completions);
    setTodayDone(done);
  }

  async function handleMarkDone() {
    if (todayDone || marking) return;
    setMarking(true);
    await markWorkoutDone();
    await loadProgress();
    setMarking(false);
  }

  const currentDay = WORKOUT_PLAN[DAYS_ORDER[selectedDay]];
  const isToday = selectedDay === todayIndex;

  const toggleExpand = (i) => setExpanded(prev => ({ ...prev, [i]: !prev[i] }));

  const dateForDayIndex = (i) => {
    const d = new Date();
    const diff = i - todayIndex;
    d.setDate(d.getDate() + diff);
    return d.toISOString().split('T')[0];
  };
  const isDayDone = (i) => doneDays.includes(dateForDayIndex(i));

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>The Craig Method</Text>
          <Text style={styles.subtitle}>Waterson Protocol · 5 days / week</Text>
        </View>

        <View style={styles.principle}>
          <Ionicons name="flame-outline" size={16} color={colors.gold} />
          <Text style={styles.principleText}>
            Compound lifts. High volume. Swimming. 3 months of this built the physique.
          </Text>
        </View>

        {/* Day selector */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.dayScroll} contentContainerStyle={styles.dayScrollContent}>
          {DAY_LABELS.map((d, i) => (
            <TouchableOpacity
              key={d}
              style={[styles.dayTab, selectedDay === i && styles.dayTabActive]}
              onPress={() => { setSelectedDay(i); setExpanded({}); }}
            >
              {isDayDone(i) && (
                <View style={styles.doneDot} />
              )}
              <Text style={[styles.dayTabText, selectedDay === i && styles.dayTabTextActive]}>{d}</Text>
              {i === todayIndex && <View style={styles.todayIndicator} />}
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.content}>
          <View style={styles.sessionHeader}>
            <View>
              <SectionLabel>{DAYS_ORDER[selectedDay].toUpperCase()}</SectionLabel>
              <Text style={styles.sessionTitle}>{currentDay.title}</Text>
              <Text style={styles.sessionFocus}>{currentDay.focus}</Text>
            </View>
            {isToday && (
              <TouchableOpacity
                style={[styles.markDoneBtn, todayDone && styles.markDoneBtnDone]}
                onPress={handleMarkDone}
                disabled={todayDone || marking}
              >
                <Ionicons
                  name={todayDone ? 'checkmark-circle' : 'checkmark-circle-outline'}
                  size={18}
                  color={todayDone ? colors.background : colors.gold}
                />
                <Text style={[styles.markDoneText, todayDone && styles.markDoneTextDone]}>
                  {todayDone ? 'Done' : 'Mark done'}
                </Text>
              </TouchableOpacity>
            )}
          </View>

          {currentDay.exercises.map((ex, i) => (
            <TouchableOpacity
              key={i}
              style={styles.exerciseCard}
              onPress={() => ex.notes && toggleExpand(i)}
              activeOpacity={ex.notes ? 0.75 : 1}
            >
              <View style={styles.exerciseMain}>
                <View style={styles.exLeft}>
                  <Text style={styles.exIndex}>{String(i + 1).padStart(2, '0')}</Text>
                  <Text style={styles.exName}>{ex.name}</Text>
                </View>
                <View style={styles.exRight}>
                  {ex.sets > 0
                    ? <><Text style={styles.exSets}>{ex.sets} sets</Text><Text style={styles.exReps}>{ex.reps}</Text></>
                    : <Text style={styles.exReps}>{ex.reps}</Text>
                  }
                </View>
              </View>
              {ex.notes ? (
                <>
                  {expanded[i] && <Text style={styles.exNotes}>{ex.notes}</Text>}
                  <Ionicons
                    name={expanded[i] ? 'chevron-up' : 'information-circle-outline'}
                    size={14}
                    color={colors.muted}
                    style={styles.infoIcon}
                  />
                </>
              ) : null}
            </TouchableOpacity>
          ))}

          <View style={styles.restNote}>
            <Text style={styles.restNoteText}>
              Rest 60–90 seconds between sets. Never sacrifice form for weight. Progress the load weekly.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  header: { padding: spacing.lg, paddingBottom: spacing.sm },
  title: { color: colors.white, fontSize: 26, fontWeight: fonts.bold, letterSpacing: 1 },
  subtitle: { color: colors.muted, fontSize: 12, letterSpacing: 1.5, marginTop: 4 },
  principle: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: colors.surface, marginHorizontal: spacing.lg,
    padding: spacing.md, borderRadius: 6, gap: spacing.sm,
    borderLeftWidth: 2, borderLeftColor: colors.gold, marginBottom: spacing.md,
  },
  principleText: { color: colors.silver, fontSize: 13, flex: 1, lineHeight: 18 },
  dayScroll: { maxHeight: 66 },
  dayScrollContent: { paddingHorizontal: spacing.lg, gap: spacing.sm, alignItems: 'center' },
  dayTab: {
    paddingHorizontal: spacing.md, paddingVertical: spacing.sm,
    borderRadius: radius.sm, borderWidth: 1, borderColor: colors.cardBorder,
    backgroundColor: colors.card, alignItems: 'center', minWidth: 52, position: 'relative',
  },
  dayTabActive: { backgroundColor: colors.gold, borderColor: colors.gold },
  dayTabText: { color: colors.silver, fontSize: 12, fontWeight: fonts.semibold, letterSpacing: 1 },
  dayTabTextActive: { color: colors.background },
  todayIndicator: { width: 4, height: 4, borderRadius: 2, backgroundColor: colors.gold, marginTop: 3 },
  doneDot: {
    position: 'absolute', top: 4, right: 4,
    width: 6, height: 6, borderRadius: 3, backgroundColor: '#2ECC71',
  },
  content: { padding: spacing.lg, paddingTop: spacing.md },
  sessionHeader: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'flex-start', marginBottom: spacing.md,
  },
  sessionTitle: { color: colors.white, fontSize: 20, fontWeight: fonts.semibold, marginTop: 2 },
  sessionFocus: { color: colors.muted, fontSize: 12, letterSpacing: 0.5, marginTop: 2 },
  markDoneBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    paddingHorizontal: spacing.md, paddingVertical: spacing.sm,
    borderRadius: radius.sm, borderWidth: 1, borderColor: colors.gold,
  },
  markDoneBtnDone: { backgroundColor: colors.gold, borderColor: colors.gold },
  markDoneText: { color: colors.gold, fontSize: 13, fontWeight: fonts.medium },
  markDoneTextDone: { color: colors.background },
  exerciseCard: {
    backgroundColor: colors.card, borderWidth: 1, borderColor: colors.cardBorder,
    borderRadius: radius.md, padding: spacing.md, marginBottom: spacing.sm,
  },
  exerciseMain: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  exLeft: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, flex: 1 },
  exIndex: { color: colors.goldDark, fontSize: 11, fontWeight: fonts.bold, width: 22 },
  exName: { color: colors.offWhite, fontSize: 15, flex: 1 },
  exRight: { alignItems: 'flex-end' },
  exSets: { color: colors.muted, fontSize: 11 },
  exReps: { color: colors.gold, fontSize: 14, fontWeight: fonts.semibold },
  exNotes: {
    color: colors.silver, fontSize: 13, marginTop: spacing.sm,
    paddingTop: spacing.sm, borderTopWidth: 1, borderTopColor: colors.cardBorder, lineHeight: 18,
  },
  infoIcon: { position: 'absolute', bottom: spacing.md, right: spacing.md },
  restNote: {
    marginTop: spacing.md, padding: spacing.md,
    backgroundColor: colors.surface, borderRadius: radius.md,
    borderLeftWidth: 2, borderLeftColor: colors.muted,
  },
  restNoteText: { color: colors.muted, fontSize: 13, lineHeight: 18 },
});
