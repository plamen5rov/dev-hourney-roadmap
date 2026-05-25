import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useNavigate, useParams } from 'react-router-dom'
import { InputPage } from './pages/InputPage'
import { RoadmapPage } from './pages/RoadmapPage'
import { fetchRoadmap } from './api/roadmap'
import type { RoadmapResponse } from './types'

const CACHE_KEY = (handle: string) => `roadmap:${handle}`
const CACHE_TTL = 1000 * 60 * 60 // 1 hour

interface CachedData {
  data: RoadmapResponse
  timestamp: number
}

function getCached(handle: string): RoadmapResponse | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY(handle))
    if (!raw) return null
    const cached: CachedData = JSON.parse(raw)
    if (Date.now() - cached.timestamp > CACHE_TTL) {
      localStorage.removeItem(CACHE_KEY(handle))
      return null
    }
    return cached.data
  } catch {
    return null
  }
}

function setCached(handle: string, data: RoadmapResponse) {
  try {
    localStorage.setItem(CACHE_KEY(handle), JSON.stringify({ data, timestamp: Date.now() }))
  } catch {
    // ignore quota errors
  }
}

interface RoadmapRouteProps {
  roadmap: RoadmapResponse | null
  onCache: (handle: string, data: RoadmapResponse) => void
}

function RoadmapRoute({ roadmap, onCache }: RoadmapRouteProps) {
  const { handle } = useParams()
  const [data, setData] = useState<RoadmapResponse | null>(roadmap)

  useEffect(() => {
    if (roadmap && handle) {
      onCache(handle, roadmap)
      setData(roadmap)
    } else if (handle) {
      const cached = getCached(handle)
      if (cached) setData(cached)
    }
  }, [roadmap, handle, onCache])

  if (!data) {
    return (
      <div className="min-h-screen bg-bg-default flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-accent-secondary/30 border-t-accent-secondary rounded-full animate-spin mx-auto mb-4" />
          <p className="text-text-secondary">Loading roadmap...</p>
        </div>
      </div>
    )
  }
  return <RoadmapPage data={data} handle={handle!} />
}

function AppRoutes() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [roadmap, setRoadmap] = useState<RoadmapResponse | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleCache = (handle: string, data: RoadmapResponse) => {
    setCached(handle, data)
  }

  const handleSubmit = async (handle: string, token: string) => {
    setLoading(true)
    setError(null)
    try {
      const data = await fetchRoadmap(handle, token)
      setRoadmap(data)
      setCached(handle, data)
      navigate(`/roadmap/${handle}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Routes>
      <Route
        path="/"
        element={<InputPage onSubmit={handleSubmit} loading={loading} error={error} />}
      />
      <Route
        path="/roadmap/:handle"
        element={<RoadmapRoute roadmap={roadmap} onCache={handleCache} />}
      />
    </Routes>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}
