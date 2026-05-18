import React, { useState, useRef } from 'react';
import {
  View, Text, TextInput, FlatList, StyleSheet,
  TouchableOpacity, KeyboardAvoidingView, Platform, ActivityIndicator
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, fonts, radius } from '../theme';
import { API_BASE } from '../config';

const STARTERS = [
  "What's the best workout to build Craig's physique?",
  "How do I find a Tom Ford-style suit on a budget?",
  "What should I eat to look like Casino Royale Bond?",
  "How do I carry myself like Bond in a room?",
];

export default function CoachScreen() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Good. You're here. I'll be direct — transforming into the Casino Royale version of Bond is a full-spectrum commitment: body, wardrobe, mindset. Ask me anything specific. I don't do vague."
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const listRef = useRef(null);

  const send = async (text) => {
    const msg = text || input.trim();
    if (!msg || loading) return;
    setInput('');

    const userMsg = { role: 'user', content: msg };
    const next = [...messages, userMsg];
    setMessages(next);
    setLoading(true);

    try {
      const history = next.slice(0, -1).map(m => ({ role: m.role, content: m.content }));
      const res = await fetch(`${API_BASE}/bond/coach`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: msg, history }),
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.response }]);
    } catch {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "Connection lost. Check your server is running."
      }]);
    } finally {
      setLoading(false);
      setTimeout(() => listRef.current?.scrollToEnd({ animated: true }), 100);
    }
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>007</Text>
          </View>
          <View>
            <Text style={styles.coachName}>Bond Coach</Text>
            <Text style={styles.coachSub}>Casino Royale Transformation</Text>
          </View>
        </View>
        <View style={styles.onlineDot} />
      </View>

      <FlatList
        ref={listRef}
        data={messages}
        keyExtractor={(_, i) => String(i)}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        onContentSizeChange={() => listRef.current?.scrollToEnd({ animated: false })}
        ListHeaderComponent={messages.length === 1 ? (
          <View style={styles.starters}>
            <Text style={styles.startersLabel}>Quick starts</Text>
            {STARTERS.map((s, i) => (
              <TouchableOpacity key={i} style={styles.starter} onPress={() => send(s)}>
                <Text style={styles.starterText}>{s}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ) : null}
        renderItem={({ item }) => (
          <View style={[styles.bubble, item.role === 'user' ? styles.userBubble : styles.aiBubble]}>
            {item.role === 'assistant' && (
              <Text style={styles.bubbleRole}>COACH</Text>
            )}
            <Text style={[styles.bubbleText, item.role === 'user' && styles.userText]}>
              {item.content}
            </Text>
          </View>
        )}
        ListFooterComponent={loading ? (
          <View style={styles.typingRow}>
            <ActivityIndicator size="small" color={colors.gold} />
            <Text style={styles.typingText}>Responding...</Text>
          </View>
        ) : null}
      />

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            value={input}
            onChangeText={setInput}
            placeholder="Ask the coach..."
            placeholderTextColor={colors.muted}
            multiline
            maxLength={500}
            onSubmitEditing={() => send()}
            returnKeyType="send"
          />
          <TouchableOpacity
            style={[styles.sendBtn, (!input.trim() || loading) && styles.sendBtnDisabled]}
            onPress={() => send()}
            disabled={!input.trim() || loading}
          >
            <Ionicons name="send" size={18} color={(!input.trim() || loading) ? colors.muted : colors.background} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.cardBorder,
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  avatar: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: colors.gold,
    alignItems: 'center', justifyContent: 'center',
  },
  avatarText: { color: colors.background, fontWeight: fonts.bold, fontSize: 12, letterSpacing: 1 },
  coachName: { color: colors.white, fontWeight: fonts.semibold, fontSize: 15 },
  coachSub: { color: colors.muted, fontSize: 11 },
  onlineDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#2ECC71' },
  list: { padding: spacing.md, gap: spacing.sm, paddingBottom: spacing.md },
  starters: { marginBottom: spacing.lg },
  startersLabel: { color: colors.muted, fontSize: 12, letterSpacing: 1, marginBottom: spacing.sm },
  starter: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    borderRadius: radius.md,
    padding: spacing.sm,
    marginBottom: spacing.xs,
  },
  starterText: { color: colors.silver, fontSize: 13 },
  bubble: {
    maxWidth: '85%',
    padding: spacing.md,
    borderRadius: radius.md,
    marginBottom: spacing.xs,
  },
  aiBubble: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 2,
  },
  userBubble: {
    backgroundColor: colors.gold,
    alignSelf: 'flex-end',
    borderBottomRightRadius: 2,
  },
  bubbleRole: {
    color: colors.gold,
    fontSize: 10,
    fontWeight: fonts.bold,
    letterSpacing: 1.5,
    marginBottom: 4,
  },
  bubbleText: { color: colors.offWhite, fontSize: 14, lineHeight: 21 },
  userText: { color: colors.background },
  typingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    padding: spacing.md,
    alignSelf: 'flex-start',
  },
  typingText: { color: colors.muted, fontSize: 13 },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: spacing.md,
    gap: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.cardBorder,
    backgroundColor: colors.background,
  },
  input: {
    flex: 1,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    color: colors.white,
    fontSize: 15,
    maxHeight: 100,
  },
  sendBtn: {
    width: 44, height: 44,
    borderRadius: 22,
    backgroundColor: colors.gold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendBtnDisabled: { backgroundColor: colors.card },
});
