import AsyncStorage from '@react-native-async-storage/async-storage';

const K = {
  API_KEY: '@bond:openai_key',
  COMPLETED_TASKS: '@bond:completed_tasks',  // { "2024-01-15": { workout: true, mindset: true, ... } }
  STREAK: '@bond:streak',
  LAST_ACTIVE: '@bond:last_active',           // ISO date string "2024-01-15"
  WORKOUT_COMPLETIONS: '@bond:workout_completions', // Set of "2024-01-15" strings
};

function todayKey() {
  return new Date().toISOString().split('T')[0];
}

// --- API Key ---

export async function getApiKey() {
  return AsyncStorage.getItem(K.API_KEY);
}

export async function setApiKey(key) {
  return AsyncStorage.setItem(K.API_KEY, key.trim());
}

export async function clearApiKey() {
  return AsyncStorage.removeItem(K.API_KEY);
}

// --- Daily tasks ---

export async function getTodayTasks() {
  const raw = await AsyncStorage.getItem(K.COMPLETED_TASKS);
  const all = raw ? JSON.parse(raw) : {};
  return all[todayKey()] || {};
}

export async function completeTask(taskId) {
  const raw = await AsyncStorage.getItem(K.COMPLETED_TASKS);
  const all = raw ? JSON.parse(raw) : {};
  const key = todayKey();
  all[key] = { ...(all[key] || {}), [taskId]: true };
  // Prune entries older than 60 days
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - 60);
  for (const k of Object.keys(all)) {
    if (new Date(k) < cutoff) delete all[k];
  }
  await AsyncStorage.setItem(K.COMPLETED_TASKS, JSON.stringify(all));
  await updateStreak();
}

export async function uncompleteTask(taskId) {
  const raw = await AsyncStorage.getItem(K.COMPLETED_TASKS);
  const all = raw ? JSON.parse(raw) : {};
  const key = todayKey();
  if (all[key]) {
    delete all[key][taskId];
  }
  await AsyncStorage.setItem(K.COMPLETED_TASKS, JSON.stringify(all));
}

// --- Streak ---

export async function getStreak() {
  const raw = await AsyncStorage.getItem(K.STREAK);
  return raw ? parseInt(raw, 10) : 0;
}

export async function updateStreak() {
  const today = todayKey();
  const lastActive = await AsyncStorage.getItem(K.LAST_ACTIVE);

  if (lastActive === today) return; // Already updated today

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayKey = yesterday.toISOString().split('T')[0];

  const currentStreak = await getStreak();
  const newStreak = lastActive === yesterdayKey ? currentStreak + 1 : 1;

  await AsyncStorage.setItem(K.STREAK, String(newStreak));
  await AsyncStorage.setItem(K.LAST_ACTIVE, today);
}

// --- Workout completion ---

export async function markWorkoutDone(dateKey = null) {
  const key = dateKey || todayKey();
  const raw = await AsyncStorage.getItem(K.WORKOUT_COMPLETIONS);
  const done = raw ? JSON.parse(raw) : [];
  if (!done.includes(key)) done.push(key);
  await AsyncStorage.setItem(K.WORKOUT_COMPLETIONS, JSON.stringify(done));
  await completeTask('workout');
}

export async function getWorkoutCompletions() {
  const raw = await AsyncStorage.getItem(K.WORKOUT_COMPLETIONS);
  return raw ? JSON.parse(raw) : [];
}

export async function isWorkoutDoneToday() {
  const done = await getWorkoutCompletions();
  return done.includes(todayKey());
}
