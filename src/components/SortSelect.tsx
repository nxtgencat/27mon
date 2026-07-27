import { useState, useRef, useEffect } from 'react'
import { ArrowUpDown, ChevronDown, Check } from 'lucide-react'

type SortKey = 'price-asc' | 'price-desc' | 'rating-desc' | 'rating-asc' | 'name-asc' | 'name-desc'

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
    <div className="relative" ref={rootRef}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg border border-line dark:border-linedark bg-surface dark:bg-surfacedark text-sm hover:border-ink dark:hover:border-paperdark transition-colors"
      >
        <ArrowUpDown className="w-4 h-4 text-slate dark:text-slatedark shrink-0" />
        <span className="hidden sm:inline">{current?.label}</span>
        <ChevronDown className="w-3.5 h-3.5 text-slate dark:text-slatedark" />
      </button>

      {open && (
        <div className="absolute top-full right-0 mt-2 p-1.5 rounded-xl bg-surface dark:bg-surfacedark shadow-lg border border-line dark:border-linedark z-40 w-48">
          {OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => { onChange(opt.value); setOpen(false) }}
              className="w-full text-left px-2.5 py-1.5 rounded-md hover:bg-ink/5 dark:hover:bg-white/5 text-sm flex items-center justify-between gap-2"
            >
              <span>{opt.label}</span>
              {value === opt.value && (
                <Check className="w-3.5 h-3.5 text-cobalt shrink-0" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
