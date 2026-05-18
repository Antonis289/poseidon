import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { colors, spacing, radius, fonts } from '../theme';

export function BondButton({ label, onPress, loading, style, variant = 'gold' }) {
  return (
    <TouchableOpacity
      style={[styles.button, styles[variant], style]}
      onPress={onPress}
      activeOpacity={0.8}
      disabled={loading}
    >
      {loading
        ? <ActivityIndicator color={variant === 'ghost' ? colors.gold : colors.background} size="small" />
        : <Text style={[styles.label, styles[`${variant}Label`]]}>{label}</Text>
      }
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gold: {
    backgroundColor: colors.gold,
  },
  ghost: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.gold,
  },
  label: {
    fontSize: 14,
    fontWeight: fonts.semibold,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  goldLabel: {
    color: colors.background,
  },
  ghostLabel: {
    color: colors.gold,
  },
});
