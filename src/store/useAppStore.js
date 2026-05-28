import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useAppStore = create(
  persist(
    (set, get) => ({
      profile: null,
      tasks: [],
      langue: 'fr',
      onboardingAnswers: {},
      notifications: [],

      setProfile: (profile) => set({ profile }),
      updateProfile: (updates) => set(state => ({
        profile: state.profile ? { ...state.profile, ...updates } : updates
      })),
      clearProfile: () => set({ profile: null, tasks: [], onboardingAnswers: {} }),

      setTasks: (tasks) => set({ tasks: Array.isArray(tasks) ? tasks : [] }),
      toggleTask: (taskId) => set(state => ({
        tasks: state.tasks.map(t =>
          t.id === taskId
            ? { ...t, complete: !t.complete, complete_at: !t.complete ? new Date().toISOString() : null }
            : t
        )
      })),
      addTask: (task) => set(state => ({ tasks: [...state.tasks, task] })),

      setLangue: (langue) => set({ langue }),

      setAnswer: (key, value) => set(state => ({
        onboardingAnswers: { ...state.onboardingAnswers, [key]: value }
      })),
      clearOnboardingAnswers: () => set({ onboardingAnswers: {} }),

      addNotification: (n) => set(state => ({ notifications: [n, ...state.notifications] })),
      markRead: (id) => set(state => ({
        notifications: state.notifications.map(n => n.id === id ? { ...n, lu: true } : n)
      })),

      getTasksByPhase: (phase) => (Array.isArray(get().tasks) ? get().tasks : []).filter(t => t.phase === phase),
      getUrgentTasks: () => (Array.isArray(get().tasks) ? get().tasks : []).filter(t => t.priorite === 'urgent' && !t.complete),
      getCompletionRate: () => {
        const tasks = Array.isArray(get().tasks) ? get().tasks : []
        if (!tasks.length) return 0
        return Math.round((tasks.filter(t => t.complete).length / tasks.length) * 100)
      },
    }),
    {
      name: 'maplepath-store',
      partialize: (state) => ({
        profile: state.profile,
        tasks: state.tasks,
        langue: state.langue,
      }),
      merge: (persisted, current) => ({
        ...current,
        ...persisted,
        tasks: Array.isArray(persisted?.tasks) ? persisted.tasks : [],
      }),
    }
  )
)

export default useAppStore
