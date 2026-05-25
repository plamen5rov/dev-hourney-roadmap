import { BookOpen, Share2, Download } from 'lucide-react'

interface HeaderProps {
  title?: string
  showShare?: boolean
  onShare?: () => void
  onDownloadCard?: () => void
}

export function Header({ title = 'Dev Journey Roadmap', showShare = false, onShare, onDownloadCard }: HeaderProps) {
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-border-default bg-bg-surface/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-md bg-accent-secondary flex items-center justify-center">
          <BookOpen className="w-4 h-4 text-bg-default" />
        </div>
        <span className="text-base font-semibold text-text-primary">{title}</span>
      </div>
      {showShare && (
        <div className="flex items-center gap-2">
          <button
            onClick={onDownloadCard}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-text-secondary bg-surface-float rounded-full hover:bg-surface-hover transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            Card
          </button>
          <button
            onClick={onShare}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-accent-primary bg-accent-primary-flat rounded-full hover:bg-accent-primary/20 transition-colors"
          >
            <Share2 className="w-3.5 h-3.5" />
            Share
          </button>
        </div>
      )}
    </header>
  )
}
