import { useState } from 'react'
import { BookOpen, Share2, Download } from 'lucide-react'

const XIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
)

const LinkedInIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
)

const FacebookIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
)

interface HeaderProps {
  title?: string
  showShare?: boolean
  onShare?: () => void
  onDownloadCard?: () => void
  shareUrl?: string
  shareText?: string
}

export function Header({
  title = 'Dev Journey Roadmap',
  showShare = false,
  onShare,
  onDownloadCard,
  shareUrl,
  shareText,
}: HeaderProps) {
  const [showMenu, setShowMenu] = useState(false)

  const shareToX = () => {
    const url = encodeURIComponent(shareUrl || window.location.href)
    const text = encodeURIComponent(shareText || 'Check out my Dev Journey Roadmap!')
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank')
    setShowMenu(false)
  }

  const shareToLinkedIn = () => {
    const url = encodeURIComponent(shareUrl || window.location.href)
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank')
    setShowMenu(false)
  }

  const shareToFacebook = () => {
    const url = encodeURIComponent(shareUrl || window.location.href)
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank')
    setShowMenu(false)
  }

  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-border-default bg-bg-surface/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-md bg-accent-secondary flex items-center justify-center">
          <BookOpen className="w-4 h-4 text-bg-default" />
        </div>
        <span className="text-base font-semibold text-text-primary">{title}</span>
      </div>
      {showShare && (
        <div className="flex items-center gap-2 relative">
          <button
            onClick={onDownloadCard}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-text-secondary bg-surface-float rounded-full hover:bg-surface-hover transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            Card
          </button>
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-accent-primary bg-accent-primary-flat rounded-full hover:bg-accent-primary/20 transition-colors"
            >
              <Share2 className="w-3.5 h-3.5" />
              Share
            </button>
            {showMenu && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setShowMenu(false)} />
                <div className="absolute right-0 top-full mt-2 w-48 bg-bg-elevated border border-border-default rounded-xl shadow-lg z-50 overflow-hidden">
                  <button
                    onClick={shareToX}
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm text-text-primary hover:bg-surface-hover transition-colors"
                  >
                    <XIcon />
                    Share on X
                  </button>
                  <button
                    onClick={shareToLinkedIn}
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm text-text-primary hover:bg-surface-hover transition-colors"
                  >
                    <LinkedInIcon />
                    Share on LinkedIn
                  </button>
                  <button
                    onClick={shareToFacebook}
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm text-text-primary hover:bg-surface-hover transition-colors"
                  >
                    <FacebookIcon />
                    Share on Facebook
                  </button>
                  <div className="border-t border-border-default">
                    <button
                      onClick={() => {
                        if (onShare) onShare()
                        setShowMenu(false)
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm text-accent-primary hover:bg-surface-hover transition-colors"
                    >
                      <Share2 className="w-4 h-4" />
                      Copy Link
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
