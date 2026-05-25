import type { RoadmapResponse } from '../types'

const API_BASE = import.meta.env.VITE_API_URL || ''

export async function fetchRoadmap(handle: string, token: string): Promise<RoadmapResponse> {
  const url = `${API_BASE}/api/roadmap?handle=${encodeURIComponent(handle)}`
  const res = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  })
  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: 'Failed to fetch roadmap' }))
    throw new Error(error.message || `HTTP ${res.status}`)
  }
  return res.json()
}
