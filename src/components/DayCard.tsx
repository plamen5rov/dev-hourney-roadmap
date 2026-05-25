import { CheckCircle2, Circle } from 'lucide-react'
import { ArticleCard } from './ArticleCard'
import type { DayPlan } from '../types'

interface DayCardProps {
  day: DayPlan
  onToggleComplete: (day: number) => void
}

export function DayCard({ day, onToggleComplete }: DayCardProps) {
  return (
    <div className="bg-bg-surface border border-border-default rounded-xl overflow-hidden">
      <div className="px-6 py-4 border-l-[3px] border-accent-secondary flex items-center justify-between">
        <div>
          <h3 className="text-text-primary text-xl font-bold">
            Day {day.day}: {day.topic}
          </h3>
          <p className="text-text-tertiary text-sm mt-0.5">
            {day.articles.length} article{day.articles.length !== 1 ? 's' : ''}
          </p>
        </div>
        <button
          onClick={() => onToggleComplete(day.day)}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
            day.completed
              ? 'bg-accent-primary text-bg-default'
              : 'bg-accent-primary-flat text-accent-primary border border-accent-primary hover:bg-accent-primary/20'
          }`}
        >
          {day.completed ? (
            <>
              <CheckCircle2 className="w-4 h-4" />
              Done
            </>
          ) : (
            <>
              <Circle className="w-4 h-4" />
              Mark Complete
            </>
          )}
        </button>
      </div>
      <div className="p-6 space-y-3">
        {day.articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  )
}
