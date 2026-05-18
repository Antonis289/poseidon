import React, { useEffect, useState } from 'react';
import {
  View, Text, ScrollView, StyleSheet, TouchableOpacity
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, fonts, radius } from '../theme';
import { BondCard, SectionLabel } from '../components/BondCard';
import { API_BASE } from '../config';

const DAYS = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
const DAY_LABELS = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
const todayIndex = (new Date().getDay() + 6) % 7; // Mon=0

export default function WorkoutScreen() {
  const [plan, setPlan] = useState(null);
  const [selectedDay, setSelectedDay] = useState(todayIndex);
  const [expanded, setExpanded] = useState({});

  useEffect(() => {
    fetch(`${API_BASE}/bond/workout/week`)
      .then(r => r.json())
      .then(d => setPlan(d.plan))
      .catch(() => {});
  }, []);

  const currentDay = plan ? plan[DAYS[selectedDay]] : null;

  const toggleExpand = (i) => setExpanded(prev => ({ ...prev, [i]: !prev[i] }));

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>The Craig Method</Text>
          <Text style={styles.subtitle}>Waterson Protocol · Casino Royale</Text>
        </View>

        {/* Principle banner */}
        <View style={styles.principle}>
          <Ionicons name="flame-outline" size={16} color={colors.gold} />
          <Text style={styles.principleText}>
            Compound lifts. High volume. Swimming. This built the physique.
          </Text>
        </View>

        {/* Day selector */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.dayScroll} contentContainerStyle={styles.dayScrollContent}>
          {DAY_LABELS.map((d, i) => (
            <TouchableOpacity
              key={d}
              style={[styles.dayTab, selectedDay === i && styles.dayTabActive, i === todayIndex && styles.dayTabToday]}
              onPress={() => setSelectedDay(i)}
            >
              <Text style={[styles.dayTabText, selectedDay === i && styles.dayTabTextActive]}>{d}</Text>
              {i === todayIndex && <View style={styles.todayDot} />}
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.content}>
          {currentDay ? (
            <>
              <SectionLabel>{DAYS[selectedDay].toUpperCase()}</SectionLabel>
              <Text style={styles.sessionTitle}>{currentDay.title}</Text>

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
                      {ex.sets > 0 ? (
                        <>
                          <Text style={styles.exSets}>{ex.sets} sets</Text>
                          <Text style={styles.exReps}>{ex.reps}</Text>
                        </>
                      ) : (
                        <Text style={styles.exReps}>{ex.reps}</Text>
                      )}
                    </View>
                  </View>
                  {ex.notes && expanded[i] && (
                    <Text style={styles.exNotes}>{ex.notes}</Text>
                  )}
                  {ex.notes && (
                    <Ionicons
                      name={expanded[i] ? 'chevron-up' : 'chevron-down'}
                      size={14}
                      color={colors.muted}
                      style={styles.chevron}
                    />
                  )}
                </TouchableOpacity>
              ))}

              <View style={styles.crNote}>
                <Text style={styles.crNoteText}>
                  Craig trained 2–3 months prior to filming. Rest between sets: 60–90 seconds. Never sacrifice form for weight.
                </Text>
              </View>
            </>
          ) : (
            <Text style={styles.loading}>Loading plan...</Text>
          )}
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
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    marginHorizontal: spacing.lg,
    padding: spacing.md,
    borderRadius: 6,
    gap: spacing.sm,
    borderLeftWidth: 2,
    borderLeftColor: colors.gold,
    marginBottom: spacing.md,
  },
  principleText: { color: colors.silver, fontSize: 13, flex: 1, lineHeight: 18 },
  dayScroll: { marginBottom: spacing.md },
  dayScrollContent: { paddingHorizontal: spacing.lg, gap: spacing.sm },
  dayTab: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    backgroundColor: colors.card,
    alignItems: 'center',
    minWidth: 52,
  },
  dayTabActive: { backgroundColor: colors.gold, borderColor: colors.gold },
  dayTabToday: { borderColor: colors.goldDark },
  dayTabText: { color: colors.silver, fontSize: 12, fontWeight: fonts.semibold, letterSpacing: 1 },
  dayTabTextActive: { color: colors.background },
  todayDot: {
    width: 4, height: 4, borderRadius: 2,
    backgroundColor: colors.gold, marginTop: 3,
  },
  content: { padding: spacing.lg, paddingTop: 0 },
  sessionTitle: {
    color: colors.white, fontSize: 20,
    fontWeight: fonts.semibold, marginBottom: spacing.md,
  },
  exerciseCard: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  exerciseMain: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  exLeft: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, flex: 1 },
  exIndex: { color: colors.goldDark, fontSize: 11, fontWeight: fonts.bold, width: 20 },
  exName: { color: colors.offWhite, fontSize: 15, flex: 1 },
  exRight: { alignItems: 'flex-end' },
  exSets: { color: colors.muted, fontSize: 11 },
  exReps: { color: colors.gold, fontSize: 14, fontWeight: fonts.semibold },
  exNotes: {
    color: colors.silver, fontSize: 13, marginTop: spacing.sm,
    paddingTop: spacing.sm, borderTopWidth: 1, borderTopColor: colors.cardBorder,
    lineHeight: 18,
  },
  chevron: { position: 'absolute', bottom: spacing.md, right: spacing.md },
  crNote: {
    marginTop: spacing.md,
    padding: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderLeftWidth: 2,
    borderLeftColor: colors.muted,
  },
  crNoteText: { color: colors.muted, fontSize: 13, lineHeight: 18 },
  loading: { color: colors.muted, textAlign: 'center', padding: spacing.xl },
});
