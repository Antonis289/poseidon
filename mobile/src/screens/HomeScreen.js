import React, { useEffect, useState } from 'react';
import {
  View, Text, ScrollView, StyleSheet, TouchableOpacity
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, fonts } from '../theme';
import { BondCard, GoldDivider, SectionLabel } from '../components/BondCard';
import { API_BASE } from '../config';

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export default function HomeScreen({ navigation }) {
  const [workout, setWorkout] = useState(null);
  const [mindset, setMindset] = useState(null);
  const today = DAYS[new Date().getDay()];

  useEffect(() => {
    fetch(`${API_BASE}/bond/workout/today`)
      .then(r => r.json())
      .then(d => setWorkout(d.workout))
      .catch(() => {});

    fetch(`${API_BASE}/bond/mindset/daily`)
      .then(r => r.json())
      .then(d => setMindset(d.tip))
      .catch(() => {});
  }, []);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Good {getTimeOfDay()}</Text>
            <Text style={styles.headline}>007 Mode</Text>
          </View>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>CR</Text>
          </View>
        </View>

        <Text style={styles.tagline}>Casino Royale Era · Daniel Craig</Text>

        <GoldDivider />

        {/* Today's Workout */}
        <SectionLabel>Today · {today}</SectionLabel>
        {workout ? (
          <BondCard title={workout.title} accent style={styles.workoutCard}>
            {workout.exercises.slice(0, 3).map((ex, i) => (
              <View key={i} style={styles.exerciseRow}>
                <Text style={styles.exName}>{ex.name}</Text>
                <Text style={styles.exDetail}>{ex.sets > 0 ? `${ex.sets}×${ex.reps}` : ex.reps}</Text>
              </View>
            ))}
            {workout.exercises.length > 3 && (
              <TouchableOpacity onPress={() => navigation.navigate('Workout')}>
                <Text style={styles.seeAll}>See all {workout.exercises.length} exercises →</Text>
              </TouchableOpacity>
            )}
          </BondCard>
        ) : (
          <BondCard><Text style={styles.loading}>Loading workout...</Text></BondCard>
        )}

        {/* Mindset */}
        <SectionLabel>Daily Directive</SectionLabel>
        {mindset ? (
          <BondCard title={mindset.title}>
            <Text style={styles.mindsetText}>{mindset.tip}</Text>
          </BondCard>
        ) : (
          <BondCard><Text style={styles.loading}>Loading...</Text></BondCard>
        )}

        {/* Quick Nav */}
        <SectionLabel>Transformation Modules</SectionLabel>
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
            </TouchableOpacity>
          ))}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const MODULES = [
  { label: 'Workout', screen: 'Workout', icon: 'barbell-outline' },
  { label: 'Style', screen: 'Style', icon: 'shirt-outline' },
  { label: 'Mindset', screen: 'Mindset', icon: 'eye-outline' },
  { label: 'Cocktails', screen: 'Cocktails', icon: 'wine-outline' },
];

function getTimeOfDay() {
  const h = new Date().getHours();
  if (h < 12) return 'morning';
  if (h < 17) return 'afternoon';
  return 'evening';
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  scroll: { flex: 1 },
  content: { padding: spacing.lg, paddingBottom: spacing.xxl },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.xs,
  },
  greeting: { color: colors.silver, fontSize: 14, letterSpacing: 1 },
  headline: {
    color: colors.white,
    fontSize: 32,
    fontWeight: fonts.bold,
    letterSpacing: 2,
    marginTop: 2,
  },
  badge: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1.5,
    borderColor: colors.gold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: { color: colors.gold, fontWeight: fonts.bold, fontSize: 13, letterSpacing: 1 },
  tagline: { color: colors.muted, fontSize: 12, letterSpacing: 1.5, marginBottom: spacing.sm },
  workoutCard: { marginBottom: spacing.md },
  exerciseRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: colors.cardBorder,
  },
  exName: { color: colors.offWhite, fontSize: 14 },
  exDetail: { color: colors.gold, fontSize: 14, fontWeight: fonts.medium },
  seeAll: { color: colors.silver, fontSize: 13, marginTop: spacing.sm, textAlign: 'right' },
  mindsetText: { color: colors.silver, fontSize: 14, lineHeight: 22 },
  loading: { color: colors.muted, fontSize: 14, textAlign: 'center', paddingVertical: spacing.sm },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  gridItem: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    borderRadius: 8,
    padding: spacing.md,
    alignItems: 'center',
    gap: spacing.sm,
  },
  gridLabel: { color: colors.white, fontSize: 13, fontWeight: fonts.medium, letterSpacing: 0.5 },
});
