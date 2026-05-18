import React, { useState } from 'react';
import {
  View, Text, ScrollView, StyleSheet, TouchableOpacity
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, fonts, radius } from '../theme';
import { GoldDivider, SectionLabel } from '../components/BondCard';
import { COCKTAILS } from '../data/bondData';

export default function CocktailsScreen() {
  const [open, setOpen] = useState(0);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>The Bar</Text>
          <Text style={styles.subtitle}>Shaken. Stirred. As Bond orders.</Text>
        </View>

        <View style={styles.rule}>
          <Text style={styles.ruleText}>
            Know what you want. Order it precisely. Never apologise for your preferences.
          </Text>
        </View>

        {COCKTAILS.map((c, i) => (
          <TouchableOpacity
            key={i}
            style={[styles.card, open === i && styles.cardOpen]}
            onPress={() => setOpen(open === i ? -1 : i)}
            activeOpacity={0.8}
          >
            <View style={styles.cardHeader}>
              <View style={{ flex: 1 }}>
                <Text style={styles.cardName}>{c.name}</Text>
                <Text style={styles.cardOrigin}>{c.origin}</Text>
              </View>
              <Ionicons
                name={open === i ? 'chevron-up' : 'chevron-down'}
                size={18} color={colors.gold}
              />
            </View>

            {open === i && (
              <View style={styles.cardBody}>
                <GoldDivider />
                <SectionLabel>Ingredients</SectionLabel>
                {c.ingredients.map((ing, j) => (
                  <View key={j} style={styles.ingRow}>
                    <View style={styles.ingDot} />
                    <Text style={styles.ingText}>{ing}</Text>
                  </View>
                ))}
                <SectionLabel>Method</SectionLabel>
                <Text style={styles.method}>{c.method}</Text>
                <View style={styles.bondNote}>
                  <Ionicons name="information-circle" size={16} color={colors.gold} />
                  <Text style={styles.bondNoteText}>{c.bond_note}</Text>
                </View>
              </View>
            )}
          </TouchableOpacity>
        ))}

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Craig's training diet was disciplined — alcohol was the exception, not the rule. These are tools of character, not habits.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.lg, paddingBottom: spacing.xxl },
  header: { marginBottom: spacing.lg },
  title: { color: colors.white, fontSize: 26, fontWeight: fonts.bold, letterSpacing: 1 },
  subtitle: { color: colors.muted, fontSize: 12, letterSpacing: 1.5, marginTop: 4 },
  rule: {
    backgroundColor: colors.navy, borderWidth: 1, borderColor: colors.navyLight,
    borderRadius: radius.md, padding: spacing.md, marginBottom: spacing.lg,
    borderLeftWidth: 2, borderLeftColor: colors.gold,
  },
  ruleText: { color: colors.offWhite, fontSize: 13, lineHeight: 20, fontStyle: 'italic' },
  card: {
    backgroundColor: colors.card, borderWidth: 1, borderColor: colors.cardBorder,
    borderRadius: radius.md, padding: spacing.md, marginBottom: spacing.md,
  },
  cardOpen: { borderColor: colors.goldDark },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  cardName: { color: colors.white, fontSize: 18, fontWeight: fonts.semibold, letterSpacing: 0.5 },
  cardOrigin: { color: colors.muted, fontSize: 12, marginTop: 3 },
  cardBody: { marginTop: spacing.sm },
  ingRow: {
    flexDirection: 'row', alignItems: 'center', gap: spacing.sm,
    paddingVertical: 5, borderBottomWidth: 1, borderBottomColor: colors.cardBorder,
  },
  ingDot: { width: 5, height: 5, borderRadius: 3, backgroundColor: colors.gold },
  ingText: { color: colors.offWhite, fontSize: 14 },
  method: { color: colors.silver, fontSize: 14, lineHeight: 21 },
  bondNote: {
    flexDirection: 'row', gap: spacing.sm, marginTop: spacing.md,
    padding: spacing.md, backgroundColor: colors.surface, borderRadius: radius.sm,
  },
  bondNoteText: { color: colors.silver, fontSize: 13, flex: 1, lineHeight: 19 },
  footer: { marginTop: spacing.sm, padding: spacing.md, borderRadius: radius.md, backgroundColor: colors.surface },
  footerText: { color: colors.muted, fontSize: 12, lineHeight: 18, textAlign: 'center' },
});
