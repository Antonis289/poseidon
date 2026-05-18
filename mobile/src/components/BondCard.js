import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, spacing, radius, fonts } from '../theme';

export function BondCard({ title, subtitle, children, onPress, style, accent }) {
  const Container = onPress ? TouchableOpacity : View;
  return (
    <Container
      style={[styles.card, accent && styles.accentBorder, style]}
      onPress={onPress}
      activeOpacity={0.75}
    >
      {(title || subtitle) && (
        <View style={styles.header}>
          {title && <Text style={styles.title}>{title}</Text>}
          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>
      )}
      {children}
    </Container>
  );
}

export function GoldDivider() {
  return <View style={styles.divider} />;
}

export function SectionLabel({ children }) {
  return <Text style={styles.sectionLabel}>{children}</Text>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  accentBorder: {
    borderColor: colors.goldDark,
  },
  header: {
    marginBottom: spacing.sm,
  },
  title: {
    color: colors.white,
    fontSize: 16,
    fontWeight: fonts.semibold,
    letterSpacing: 0.5,
  },
  subtitle: {
    color: colors.silver,
    fontSize: 13,
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: colors.goldDark,
    marginVertical: spacing.md,
    opacity: 0.4,
  },
  sectionLabel: {
    color: colors.gold,
    fontSize: 11,
    fontWeight: fonts.semibold,
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginBottom: spacing.sm,
    marginTop: spacing.md,
  },
});
