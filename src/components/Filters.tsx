import { RotateCcw } from 'lucide-react'

interface FiltersProps {
  categories: string[]
  brands: string[]
  selectedCategory: string
  selectedBrand: string
  onCategoryChange: (cat: string) => void
  onBrandChange: (brand: string) => void
  onCloseMobile?: () => void
}

export default function Filters({
  categories,
  brands,
  selectedCategory,
  selectedBrand,
  onCategoryChange,
  onBrandChange,
  onCloseMobile,
}: FiltersProps) {
  const hasFilters = selectedCategory || selectedBrand

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-3 border-b border-line dark:border-linedark">
        <span className="mini-tag">FILTERS & CATEGORIES</span>
        {hasFilters && (
          <button
            onClick={() => { onCategoryChange(''); onBrandChange('') }}
            type="button"
            className="text-xs text-cobalt dark:text-cobalt-light hover:underline flex items-center gap-1 font-medium"
          >
            <RotateCcw className="w-3 h-3" /> Reset
          </button>
        )}
      </div>

      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-slate dark:text-slatedark mb-2.5">
          Categories
        </p>
        <div className="space-y-1">
          <button
            onClick={() => { onCategoryChange(''); if (onCloseMobile) onCloseMobile() }}
            type="button"
            className={`w-full text-left px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
              !selectedCategory
                ? 'bg-ink dark:bg-paperdark text-paper dark:text-inkdark'
                : 'text-slate dark:text-slatedark hover:bg-ink/5 dark:hover:bg-white/5'
            }`}
          >
            All Categories
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => { onCategoryChange(cat); if (onCloseMobile) onCloseMobile() }}
              type="button"
              className={`w-full text-left px-3 py-2 rounded-lg text-xs sm:text-sm capitalize transition-colors ${
                selectedCategory === cat
                  ? 'bg-ink dark:bg-paperdark text-paper dark:text-inkdark font-medium'
                  : 'text-slate dark:text-slatedark hover:bg-ink/5 dark:hover:bg-white/5'
              }`}
            >
              {cat.replace('-', ' ')}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-slate dark:text-slatedark mb-2.5">
          Brands
        </p>
        <div className="space-y-1 max-h-56 overflow-y-auto pr-1">
          <button
            onClick={() => { onBrandChange(''); if (onCloseMobile) onCloseMobile() }}
            type="button"
            className={`w-full text-left px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
              !selectedBrand
                ? 'bg-ink dark:bg-paperdark text-paper dark:text-inkdark'
                : 'text-slate dark:text-slatedark hover:bg-ink/5 dark:hover:bg-white/5'
            }`}
          >
            All Brands
          </button>
          {brands.map((brand) => (
            <button
              key={brand}
              onClick={() => { onBrandChange(brand); if (onCloseMobile) onCloseMobile() }}
              type="button"
              className={`w-full text-left px-3 py-2 rounded-lg text-xs sm:text-sm transition-colors ${
                selectedBrand === brand
                  ? 'bg-ink dark:bg-paperdark text-paper dark:text-inkdark font-medium'
                  : 'text-slate dark:text-slatedark hover:bg-ink/5 dark:hover:bg-white/5'
              }`}
            >
              {brand}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
