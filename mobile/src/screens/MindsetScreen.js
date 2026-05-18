import React, { useState, useRef, useCallback } from 'react';
import {
  View, Text, ScrollView, StyleSheet, TouchableOpacity, Animated
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, fonts, radius } from '../theme';
import { SectionLabel } from '../components/BondCard';
import { MINDSET_TIPS } from '../data/bondData';
import { completeTask, getTodayTasks } from '../services/storage';

const PILLARS = [
  { icon: 'eye-outline', label: 'Composure', desc: 'Never react. Always respond.' },
  { icon: 'body-outline', label: 'Presence', desc: 'Control the room without trying.' },
  { icon: 'chatbubble-ellipses-outline', label: 'Economy', desc: 'Every word earns its place.' },
  { icon: 'shield-outline', label: 'Resilience', desc: 'Discomfort is the sharpening stone.' },
];

const QUOTES = [
  { text: "Do I look like I give a damn?", source: "Casino Royale — on how he takes his martini" },
  { text: "I've got a little itch, down there. Would you mind?", source: "Casino Royale — unbroken after torture" },
  { text: "It won't matter soon.", source: "Casino Royale — Bond to Vesper during the stairwell scene" },
];

const PRACTICES = [
  { name: "The Cold Finish", detail: "End every shower with 60 seconds of cold water. Builds tolerance for discomfort daily." },
  { name: "The Pause", detail: "Before responding under pressure, take one slow breath. Never the first word out of the room." },
  { name: "The Walk", detail: "Walk with purpose. Slow down 15%. Observe. Never appear to hurry." },
  { name: "Economy", detail: "Remove one filler word from your speech today. Then another tomorrow." },
  { name: "The Look", detail: "Hold eye contact one second past where you'd normally look away." },
];

export default function MindsetScreen() {
  const [current, setCurrent] = useState(0);
  const [read, setRead] = useState(false);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useFocusEffect(
    useCallback(() => {
      getTodayTasks().then(tasks => setRead(!!tasks.mindset));
    }, [])
  );

  const tip = MINDSET_TIPS[current];

  const advanceTip = () => {
    Animated.sequence([
      Animated.timing(fadeAnim, { toValue: 0, duration: 180, useNativeDriver: true }),
      Animated.timing(fadeAnim, { toValue: 1, duration: 250, useNativeDriver: true }),
    ]).start();
    setCurrent(c => (c + 1) % MINDSET_TIPS.length);
  };

  const markRead = async () => {
    await completeTask('mindset');
    setRead(true);
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        <View style={styles.header}>
          <Text style={styles.title}>The Bond Mindset</Text>
          <Text style={styles.subtitle}>Psychological architecture of 007</Text>
        </View>

        <SectionLabel style={styles.sectionPad}>Core Pillars</SectionLabel>
        <View style={styles.pillarsGrid}>
          {PILLARS.map(p => (
            <View key={p.label} style={styles.pillar}>
              <Ionicons name={p.icon} size={22} color={colors.gold} />
              <Text style={styles.pillarLabel}>{p.label}</Text>
              <Text style={styles.pillarDesc}>{p.desc}</Text>
            </View>
          ))}
        </View>

        <SectionLabel style={styles.sectionPad}>Today's Directive</SectionLabel>
        <Animated.View style={[styles.tipCard, { opacity: fadeAnim }]}>
          <View style={styles.tipCardHeader}>
            <Text style={styles.tipTitle}>{tip.title}</Text>
            <Text style={styles.tipCounter}>{current + 1}/{MINDSET_TIPS.length}</Text>
          </View>
          <Text style={styles.tipText}>{tip.tip}</Text>
          <View style={styles.tipFooter}>
            <TouchableOpacity style={styles.nextBtn} onPress={advanceTip}>
              <Text style={styles.nextBtnText}>Next</Text>
              <Ionicons name="arrow-forward" size={14} color={colors.gold} />
            </TouchableOpacity>
            {!read && (
              <TouchableOpacity style={styles.readBtn} onPress={markRead}>
                <Ionicons name="checkmark" size={14} color={colors.background} />
                <Text style={styles.readBtnText}>Mark read</Text>
              </TouchableOpacity>
            )}
            {read && (
              <View style={styles.readDone}>
                <Ionicons name="checkmark-circle" size={14} color={colors.gold} />
                <Text style={styles.readDoneText}>Read today</Text>
              </View>
            )}
          </View>
        </Animated.View>

        <SectionLabel style={styles.sectionPad}>From the Man Himself</SectionLabel>
        {QUOTES.map((q, i) => (
          <View key={i} style={styles.quoteCard}>
            <Text style={styles.quoteMarks}>"</Text>
            <Text style={styles.quoteText}>{q.text}</Text>
            <Text style={styles.quoteSource}>— {q.source}</Text>
          </View>
        ))}

        <SectionLabel style={styles.sectionPad}>Daily Practice</SectionLabel>
        {PRACTICES.map((p, i) => (
          <View key={i} style={styles.practiceRow}>
            <View style={styles.practiceNum}>
              <Text style={styles.practiceNumText}>{i + 1}</Text>
            </View>
            <View style={styles.practiceBody}>
              <Text style={styles.practiceName}>{p.name}</Text>
              <Text style={styles.practiceDetail}>{p.detail}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  scroll: { paddingBottom: spacing.xxl },
  header: { padding: spacing.lg, paddingBottom: spacing.sm },
  title: { color: colors.white, fontSize: 26, fontWeight: fonts.bold, letterSpacing: 1 },
  subtitle: { color: colors.muted, fontSize: 12, letterSpacing: 1.5, marginTop: 4 },
  sectionPad: { paddingHorizontal: spacing.lg },
  pillarsGrid: {
    flexDirection: 'row', flexWrap: 'wrap',
    paddingHorizontal: spacing.lg, gap: spacing.sm, marginBottom: spacing.sm,
  },
  pillar: {
    width: '47%', backgroundColor: colors.card,
    borderWidth: 1, borderColor: colors.cardBorder,
    borderRadius: radius.md, padding: spacing.md, gap: 6,
  },
  pillarLabel: { color: colors.white, fontSize: 14, fontWeight: fonts.semibold },
  pillarDesc: { color: colors.muted, fontSize: 12, lineHeight: 16 },
  tipCard: {
    marginHorizontal: spacing.lg, backgroundColor: colors.navy,
    borderWidth: 1, borderColor: colors.navyLight,
    borderRadius: radius.md, padding: spacing.lg, marginBottom: spacing.md,
  },
  tipCardHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: spacing.sm },
  tipTitle: { color: colors.gold, fontSize: 16, fontWeight: fonts.semibold, flex: 1 },
  tipCounter: { color: colors.muted, fontSize: 12, marginTop: 2 },
  tipText: { color: colors.offWhite, fontSize: 14, lineHeight: 22 },
  tipFooter: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: spacing.md },
  nextBtn: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs },
  nextBtnText: { color: colors.gold, fontSize: 13 },
  readBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    backgroundColor: colors.gold, borderRadius: radius.sm,
    paddingHorizontal: spacing.md, paddingVertical: 6,
  },
  readBtnText: { color: colors.background, fontSize: 13, fontWeight: fonts.semibold },
  readDone: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  readDoneText: { color: colors.gold, fontSize: 13 },
  quoteCard: {
    marginHorizontal: spacing.lg, marginBottom: spacing.sm,
    paddingLeft: spacing.md, borderLeftWidth: 2, borderLeftColor: colors.goldDark,
  },
  quoteMarks: { color: colors.goldDark, fontSize: 28, lineHeight: 28, fontWeight: fonts.bold },
  quoteText: { color: colors.silver, fontSize: 14, lineHeight: 21, fontStyle: 'italic' },
  quoteSource: { color: colors.muted, fontSize: 12, marginTop: 4 },
  practiceRow: {
    flexDirection: 'row', gap: spacing.md,
    backgroundColor: colors.card, borderWidth: 1, borderColor: colors.cardBorder,
    borderRadius: radius.md, padding: spacing.md,
    marginBottom: spacing.sm, marginHorizontal: spacing.lg,
    alignItems: 'flex-start',
  },
  practiceNum: {
    width: 28, height: 28, borderRadius: 14,
    backgroundColor: colors.goldDark + '30', borderWidth: 1, borderColor: colors.goldDark,
    alignItems: 'center', justifyContent: 'center',
  },
  practiceNumText: { color: colors.gold, fontSize: 12, fontWeight: fonts.bold },
  practiceBody: { flex: 1 },
  practiceName: { color: colors.white, fontSize: 14, fontWeight: fonts.semibold, marginBottom: 3 },
  practiceDetail: { color: colors.silver, fontSize: 13, lineHeight: 18 },
});
