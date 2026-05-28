import { useAuth } from '@clerk/clerk-react'

async function apiFetch(path, options = {}, token) {
  const res = await fetch(path, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Unknown error' }))
    throw new Error(err.error || `HTTP ${res.status}`)
  }
  return res.json()
}

export function createApiClient(getToken) {
  return {
    getProfile: () => apiFetch('/api/profile', {}, getToken()),
    saveProfile: (data) => apiFetch('/api/profile', { method: 'POST', body: data }, getToken()),
    patchProfile: (data) => apiFetch('/api/profile', { method: 'PATCH', body: data }, getToken()),

    getTasks: () => apiFetch('/api/tasks', {}, getToken()),
    saveTasks: (tasks) => apiFetch('/api/tasks', { method: 'POST', body: { tasks } }, getToken()),
    patchTask: (id, data) => apiFetch('/api/tasks', { method: 'PATCH', body: { id, ...data } }, getToken()),

    saveQuizSession: (data) => apiFetch('/api/quiz', { method: 'POST', body: data }, getToken()),
    getQuizSessions: () => apiFetch('/api/quiz', {}, getToken()),

    getPresence: () => apiFetch('/api/presence', {}, getToken()),
    addPresence: (data) => apiFetch('/api/presence', { method: 'POST', body: data }, getToken()),
    deletePresence: (id) => apiFetch('/api/presence', { method: 'DELETE', body: { id } }, getToken()),
  }
}

export function useApi() {
  const { getToken } = useAuth()
  const token = getToken()
  return createApiClient(() => token)
}
