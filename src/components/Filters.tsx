import { X } from 'lucide-react'

interface FiltersProps {
  categories: string[]
  brands: string[]
  selectedCategory: string
  selectedBrand: string
  onCategoryChange: (cat: string) => void
  onBrandChange: (brand: string) => void
}

export default function Filters({
  categories,
  brands,
  selectedCategory,
  selectedBrand,
  onCategoryChange,
  onBrandChange,
}: FiltersProps) {
  const hasFilters = selectedCategory || selectedBrand

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <p className="mini-tag">FILTERS</p>
        {hasFilters && (
          <button
            onClick={() => { onCategoryChange(''); onBrandChange('') }}
            className="text-xs text-cobalt hover:text-cobalt-dark flex items-center gap-1"
          >
            <X className="w-3 h-3" /> Clear all
          </button>
        )}
      </div>

      <div>
        <p className="text-xs font-medium mb-2 text-slate dark:text-slatedark">Category</p>
        <div className="space-y-1">
          <button
            onClick={() => onCategoryChange('')}
            className={`w-full text-left px-3 py-1.5 rounded-md text-sm transition-colors ${
              !selectedCategory
                ? 'bg-ink/10 dark:bg-white/10 font-medium'
                : 'text-slate dark:text-slatedark hover:bg-ink/5 dark:hover:bg-white/5'
            }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => onCategoryChange(cat)}
              className={`w-full text-left px-3 py-1.5 rounded-md text-sm capitalize transition-colors ${
                selectedCategory === cat
                  ? 'bg-ink/10 dark:bg-white/10 font-medium'
                  : 'text-slate dark:text-slatedark hover:bg-ink/5 dark:hover:bg-white/5'
              }`}
            >
              {cat.replace('-', ' ')}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-xs font-medium mb-2 text-slate dark:text-slatedark">Brand</p>
        <div className="space-y-1 max-h-48 overflow-y-auto">
          <button
            onClick={() => onBrandChange('')}
            className={`w-full text-left px-3 py-1.5 rounded-md text-sm transition-colors ${
              !selectedBrand
                ? 'bg-ink/10 dark:bg-white/10 font-medium'
                : 'text-slate dark:text-slatedark hover:bg-ink/5 dark:hover:bg-white/5'
            }`}
          >
            All
          </button>
          {brands.map((brand) => (
            <button
              key={brand}
              onClick={() => onBrandChange(brand)}
              className={`w-full text-left px-3 py-1.5 rounded-md text-sm transition-colors ${
                selectedBrand === brand
                  ? 'bg-ink/10 dark:bg-white/10 font-medium'
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
