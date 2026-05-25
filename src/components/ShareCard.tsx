import type { Profile, DayPlan } from '../types'

interface ShareCardProps {
  handle: string
  profile: Profile
  days: DayPlan[]
  totalArticles: number
}

export function ShareCard({ handle, profile, days, totalArticles }: ShareCardProps) {
  const topics = days.map((d) => d.topic)

  return (
    <div
      className="w-[1200px] h-[630px] p-12 flex flex-col justify-between"
      style={{ background: 'linear-gradient(135deg, #0A0A0A 0%, #151515 50%, #1a1025 100%)' }}
    >
      <div>
        <div className="flex items-center gap-4 mb-8">
          <div className="w-14 h-14 rounded-xl bg-[#ea618c] flex items-center justify-center">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0A0A0A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
            </svg>
          </div>
          <div>
            <h1 className="text-[40px] font-bold text-[#F2F2F2]">Dev Journey Roadmap</h1>
            <p className="text-[18px] text-[#A1A1A1]">Powered by daily.dev</p>
          </div>
        </div>

        <div className="flex items-center gap-6 mb-8">
          {profile.image && (
            <img
              src={profile.image}
              alt={profile.name || ''}
              className="w-20 h-20 rounded-full border-3 border-[#ea618c]"
              crossOrigin="anonymous"
            />
          )}
          <div>
            <h2 className="text-[32px] font-bold text-[#F2F2F2]">
              @{handle}
            </h2>
            <p className="text-[18px] text-[#A1A1A1]">
              {profile.reputation} rep &middot; {totalArticles} articles &middot; 7-day roadmap
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-12 gap-y-3">
          {topics.map((topic, i) => (
            <div key={i} className="flex items-center gap-3">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center text-[14px] font-bold"
                style={{
                  background: i % 2 === 0 ? 'rgba(234, 97, 140, 0.15)' : 'rgba(113, 73, 230, 0.15)',
                  color: i % 2 === 0 ? '#ea618c' : '#7149e6',
                }}
              >
                {i + 1}
              </div>
              <span className="text-[20px] text-[#F2F2F2]">{topic}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#ea618c]" />
          <div className="w-3 h-3 rounded-full bg-[#7149e6]" />
          <div className="w-3 h-3 rounded-full bg-[#5CFF5E]" />
          <span className="text-[16px] text-[#8E8E8E] ml-2">
            {days.filter((d) => d.articles.length > 0).length} days &middot; {totalArticles} articles
          </span>
        </div>
        <span className="text-[16px] text-[#8E8E8E]">devjourney.roadmap</span>
      </div>
    </div>
  )
}
