import { useState, useRef, useEffect } from 'react'
import { ArrowUpDown, ChevronDown, Check } from 'lucide-react'

export type SortKey = 'price-asc' | 'price-desc' | 'rating-desc' | 'rating-asc' | 'name-asc' | 'name-desc'

const OPTIONS: { value: SortKey; label: string }[] = [
  { value: 'name-asc', label: 'Name A-Z' },
  { value: 'name-desc', label: 'Name Z-A' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating-desc', label: 'Rating: High to Low' },
  { value: 'rating-asc', label: 'Rating: Low to High' },
]

interface SortSelectProps {
  value: SortKey
  onChange: (value: SortKey) => void
}

export default function SortSelect({ value, onChange }: SortSelectProps) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const current = OPTIONS.find((o) => o.value === value)

  return (
    <div className="relative inline-block text-left" ref={rootRef}>
      <button
        onClick={() => setOpen(!open)}
        type="button"
        className="flex items-center gap-2 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-lg border border-line dark:border-linedark bg-surface dark:bg-surfacedark text-xs sm:text-sm font-medium hover:border-ink dark:hover:border-paperdark transition-colors"
      >
        <ArrowUpDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate dark:text-slatedark shrink-0" />
        <span className="truncate max-w-[130px] sm:max-w-none">{current?.label || 'Sort by'}</span>
        <ChevronDown className={`w-3.5 h-3.5 text-slate dark:text-slatedark transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="panel right-0 left-auto w-52 p-1.5 animate-fadeUp">
          <div className="px-2 py-1 mb-1">
            <span className="mini-tag">SORT BY</span>
          </div>
          {OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => { onChange(opt.value); setOpen(false) }}
              type="button"
              className={`menu-item justify-between ${
                value === opt.value
                  ? 'bg-ink/10 dark:bg-white/10 font-medium'
                  : 'text-slate dark:text-slatedark'
              }`}
            >
              <span>{opt.label}</span>
              {value === opt.value && (
                <Check className="w-3.5 h-3.5 text-cobalt dark:text-cobalt-light shrink-0" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
