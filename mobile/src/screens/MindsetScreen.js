import React, { useState, useEffect } from 'react';
import {
  View, Text, ScrollView, StyleSheet, TouchableOpacity, Animated
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, fonts, radius } from '../theme';
import { SectionLabel } from '../components/BondCard';
import { API_BASE } from '../config';

const PILLARS = [
  { icon: 'eye-outline', label: 'Composure', desc: 'Never react. Always respond.' },
  { icon: 'body-outline', label: 'Presence', desc: 'Control the room without trying.' },
  { icon: 'chatbubble-ellipses-outline', label: 'Economy', desc: 'Every word earns its place.' },
  { icon: 'shield-outline', label: 'Resilience', desc: 'Discomfort is the sharpening stone.' },
];

export default function MindsetScreen() {
  const [tips, setTips] = useState([]);
  const [current, setCurrent] = useState(0);
  const fadeAnim = new Animated.Value(1);

  useEffect(() => {
    fetch(`${API_BASE}/bond/mindset/all`)
      .then(r => r.json())
      .then(d => setTips(d.tips))
      .catch(() => {});
  }, []);

  const advanceTip = () => {
    Animated.sequence([
      Animated.timing(fadeAnim, { toValue: 0, duration: 200, useNativeDriver: true }),
      Animated.timing(fadeAnim, { toValue: 1, duration: 300, useNativeDriver: true }),
    ]).start();
    setCurrent(c => (c + 1) % tips.length);
  };

  const tip = tips[current];

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        <View style={styles.header}>
          <Text style={styles.title}>The Bond Mindset</Text>
          <Text style={styles.subtitle}>Psychological architecture of 007</Text>
        </View>

        {/* Four pillars */}
        <SectionLabel style={{ paddingHorizontal: spacing.lg }}>Core Pillars</SectionLabel>
        <View style={styles.pillarsGrid}>
          {PILLARS.map(p => (
            <View key={p.label} style={styles.pillar}>
              <Ionicons name={p.icon} size={22} color={colors.gold} />
              <Text style={styles.pillarLabel}>{p.label}</Text>
              <Text style={styles.pillarDesc}>{p.desc}</Text>
            </View>
          ))}
        </View>

        {/* Directive of the day */}
        {tip && (
          <>
            <SectionLabel style={{ paddingHorizontal: spacing.lg }}>Directives</SectionLabel>
            <Animated.View style={[styles.tipCard, { opacity: fadeAnim }]}>
              <Text style={styles.tipTitle}>{tip.title}</Text>
              <Text style={styles.tipText}>{tip.tip}</Text>
              <TouchableOpacity style={styles.nextBtn} onPress={advanceTip}>
                <Text style={styles.nextBtnText}>Next directive</Text>
                <Ionicons name="arrow-forward" size={14} color={colors.gold} />
              </TouchableOpacity>
            </Animated.View>
          </>
        )}

        {/* Bond quotes */}
        <SectionLabel style={{ paddingHorizontal: spacing.lg }}>From the Man Himself</SectionLabel>
        {QUOTES.map((q, i) => (
          <View key={i} style={styles.quoteCard}>
            <Text style={styles.quoteMarks}>"</Text>
            <Text style={styles.quoteText}>{q.text}</Text>
            <Text style={styles.quoteSource}>— {q.source}</Text>
          </View>
        ))}

        {/* Daily practice */}
        <SectionLabel style={{ paddingHorizontal: spacing.lg }}>Daily Practice</SectionLabel>
        <View style={styles.practiceList}>
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
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const QUOTES = [
  { text: "The job is done and the bitch is dead.", source: "Casino Royale — Craig's first reported line to M" },
  { text: "I've got a little itch, down there. Would you mind?", source: "Casino Royale — to Vesper, unbroken after torture" },
  { text: "Do I look like I give a damn?", source: "Casino Royale — on drinking Martinis" },
];

const PRACTICES = [
  { name: "The Cold Finish", detail: "End every shower with 60 seconds of cold water. Builds tolerance for discomfort daily." },
  { name: "The Pause", detail: "Before responding to pressure, take one slow breath. Never the first word out." },
  { name: "The Walk", detail: "Walk 20% slower than you normally would. Observe. Don't rush." },
  { name: "Economy", detail: "Remove one filler word from your speech today. Then another tomorrow." },
  { name: "The Look", detail: "Hold eye contact one second past where you'd normally look away." },
];

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  scroll: { paddingBottom: spacing.xxl },
  header: { padding: spacing.lg, paddingBottom: spacing.sm },
  title: { color: colors.white, fontSize: 26, fontWeight: fonts.bold, letterSpacing: 1 },
  subtitle: { color: colors.muted, fontSize: 12, letterSpacing: 1.5, marginTop: 4 },
  pillarsGrid: {
    flexDirection: 'row', flexWrap: 'wrap',
    paddingHorizontal: spacing.lg, gap: spacing.sm, marginBottom: spacing.md,
  },
  pillar: {
    width: '47%',
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    borderRadius: radius.md,
    padding: spacing.md,
    gap: 6,
  },
  pillarLabel: { color: colors.white, fontSize: 14, fontWeight: fonts.semibold },
  pillarDesc: { color: colors.muted, fontSize: 12, lineHeight: 16 },
  tipCard: {
    marginHorizontal: spacing.lg,
    backgroundColor: colors.navy,
    borderWidth: 1,
    borderColor: colors.navyLight,
    borderRadius: radius.md,
    padding: spacing.lg,
    marginBottom: spacing.md,
  },
  tipTitle: { color: colors.gold, fontSize: 16, fontWeight: fonts.semibold, marginBottom: spacing.sm },
  tipText: { color: colors.offWhite, fontSize: 14, lineHeight: 22 },
  nextBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    marginTop: spacing.md,
    alignSelf: 'flex-end',
  },
  nextBtnText: { color: colors.gold, fontSize: 13 },
  quoteCard: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.sm,
    paddingLeft: spacing.md,
    borderLeftWidth: 2,
    borderLeftColor: colors.goldDark,
  },
  quoteMarks: { color: colors.goldDark, fontSize: 28, lineHeight: 28, fontWeight: fonts.bold },
  quoteText: { color: colors.silver, fontSize: 14, lineHeight: 21, fontStyle: 'italic' },
  quoteSource: { color: colors.muted, fontSize: 12, marginTop: 4 },
  practiceList: { paddingHorizontal: spacing.lg },
  practiceRow: {
    flexDirection: 'row',
    gap: spacing.md,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
    alignItems: 'flex-start',
  },
  practiceNum: {
    width: 28, height: 28, borderRadius: 14,
    backgroundColor: colors.goldDark + '30',
    borderWidth: 1, borderColor: colors.goldDark,
    alignItems: 'center', justifyContent: 'center',
  },
  practiceNumText: { color: colors.gold, fontSize: 12, fontWeight: fonts.bold },
  practiceBody: { flex: 1 },
  practiceName: { color: colors.white, fontSize: 14, fontWeight: fonts.semibold, marginBottom: 3 },
  practiceDetail: { color: colors.silver, fontSize: 13, lineHeight: 18 },
});
