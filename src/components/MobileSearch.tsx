import { Search, X } from 'lucide-react'

interface MobileSearchProps {
  search: string
  onSearchChange: (value: string) => void
}

export default function MobileSearch({ search, onSearchChange }: MobileSearchProps) {
  return (
    <div className="sm:hidden px-4 sm:px-6 md:px-8 pb-3">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate dark:text-slatedark" />
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-9 pr-8 py-2.5 rounded-full bg-surface dark:bg-surfacedark border border-line dark:border-linedark text-sm placeholder:text-slate/60 focus:border-cobalt focus:shadow-glow outline-none transition-all"
        />
        {search && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate hover:text-ink dark:hover:text-paperdark"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  )
}
