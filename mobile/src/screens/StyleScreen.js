import React, { useState, useEffect } from 'react';
import {
  View, Text, ScrollView, StyleSheet, TouchableOpacity
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, fonts, radius } from '../theme';
import { SectionLabel, GoldDivider } from '../components/BondCard';
import { API_BASE } from '../config';

const TABS = ['Suits', 'Casual', 'Accessories', 'Grooming'];

export default function StyleScreen() {
  const [guide, setGuide] = useState(null);
  const [tab, setTab] = useState(0);

  useEffect(() => {
    fetch(`${API_BASE}/bond/style`)
      .then(r => r.json())
      .then(d => setGuide(d.style))
      .catch(() => {});
  }, []);

  const sections = guide ? [guide.suits, guide.casual, guide.accessories, guide.grooming] : [];
  const current = sections[tab] || [];

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>The Bond Wardrobe</Text>
        <Text style={styles.subtitle}>Casino Royale · Tom Ford Era</Text>
      </View>

      {/* Tabs */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabScroll} contentContainerStyle={styles.tabContent}>
        {TABS.map((t, i) => (
          <TouchableOpacity
            key={t}
            style={[styles.tab, tab === i && styles.tabActive]}
            onPress={() => setTab(i)}
          >
            <Text style={[styles.tabText, tab === i && styles.tabTextActive]}>{t}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        {current.map((item, i) => (
          <StyleItem key={i} item={item} category={TABS[tab]} />
        ))}

        {tab === 0 && (
          <View style={styles.fitNote}>
            <Ionicons name="information-circle-outline" size={16} color={colors.gold} />
            <Text style={styles.fitNoteText}>
              <Text style={{ color: colors.gold }}>The Rule: </Text>
              Fit is everything. A £300 suit that fits perfectly beats a £2,000 suit that doesn't. Find a good tailor.
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

function StyleItem({ item, category }) {
  const [open, setOpen] = useState(false);
  const tipKey = category === 'Suits' ? 'fit_tip' : category === 'Casual' ? 'tip' : category === 'Accessories' ? 'tip' : 'detail';
  const tip = item[tipKey];

  return (
    <TouchableOpacity
      style={styles.item}
      onPress={() => setOpen(o => !o)}
      activeOpacity={0.8}
    >
      <View style={styles.itemHeader}>
        <View style={styles.itemLeft}>
          <View style={styles.dot} />
          <Text style={styles.itemName}>{item.name}</Text>
        </View>
        <Ionicons name={open ? 'chevron-up' : 'chevron-down'} size={16} color={colors.muted} />
      </View>

      {open && (
        <View style={styles.itemBody}>
          <Text style={styles.itemDesc}>{item.description}</Text>
          {tip && (
            <>
              <GoldDivider />
              <View style={styles.tipRow}>
                <Ionicons name="bulb-outline" size={14} color={colors.gold} style={{ marginTop: 1 }} />
                <Text style={styles.tipText}>{tip}</Text>
              </View>
            </>
          )}
          {item.budget && (
            <View style={styles.budgetBadge}>
              <Text style={styles.budgetText}>{item.budget}</Text>
            </View>
          )}
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  header: { padding: spacing.lg, paddingBottom: spacing.sm },
  title: { color: colors.white, fontSize: 26, fontWeight: fonts.bold, letterSpacing: 1 },
  subtitle: { color: colors.muted, fontSize: 12, letterSpacing: 1.5, marginTop: 4 },
  tabScroll: { maxHeight: 50 },
  tabContent: { paddingHorizontal: spacing.lg, gap: spacing.sm, alignItems: 'center' },
  tab: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  tabActive: { borderColor: colors.gold, backgroundColor: colors.gold + '15' },
  tabText: { color: colors.silver, fontSize: 13, fontWeight: fonts.medium },
  tabTextActive: { color: colors.gold },
  scroll: { flex: 1, marginTop: spacing.md },
  content: { padding: spacing.lg },
  item: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  itemHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  itemLeft: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, flex: 1 },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: colors.gold },
  itemName: { color: colors.white, fontSize: 15, fontWeight: fonts.medium, flex: 1 },
  itemBody: { marginTop: spacing.md },
  itemDesc: { color: colors.silver, fontSize: 14, lineHeight: 21 },
  tipRow: { flexDirection: 'row', gap: spacing.sm },
  tipText: { color: colors.offWhite, fontSize: 13, lineHeight: 20, flex: 1 },
  budgetBadge: {
    alignSelf: 'flex-start',
    marginTop: spacing.sm,
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
    borderRadius: radius.sm,
    backgroundColor: colors.navy,
    borderWidth: 1,
    borderColor: colors.navyLight,
  },
  budgetText: { color: colors.silver, fontSize: 11, letterSpacing: 0.5 },
  fitNote: {
    flexDirection: 'row',
    gap: spacing.sm,
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: radius.md,
    borderLeftWidth: 2,
    borderLeftColor: colors.gold,
    marginTop: spacing.sm,
  },
  fitNoteText: { color: colors.silver, fontSize: 13, flex: 1, lineHeight: 20 },
});
