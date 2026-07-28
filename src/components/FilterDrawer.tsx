import { X } from 'lucide-react'
import Filters from './Filters'

interface FilterDrawerProps {
  isOpen: boolean
  onClose: () => void
  categories: string[]
  brands: string[]
  selectedCategory: string
  selectedBrand: string
  onCategoryChange: (cat: string) => void
  onBrandChange: (brand: string) => void
}

export default function FilterDrawer({
  isOpen,
  onClose,
  categories,
  brands,
  selectedCategory,
  selectedBrand,
  onCategoryChange,
  onBrandChange,
}: FilterDrawerProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[60] lg:hidden">
      <div onClick={onClose} className="absolute inset-0 bg-ink/40 backdrop-blur-sm" />
      <div className="absolute inset-x-0 bottom-0 rounded-t-2xl bg-paper dark:bg-inkdark border-t border-line dark:border-linedark p-6 animate-fadeUp max-h-[85vh] overflow-y-auto shadow-2xl">
        <div className="w-10 h-1.5 rounded-full bg-line dark:bg-linedark mx-auto mb-4" />
        
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-line dark:border-linedark">
          <div>
            <span className="mini-tag">MOBILE DRAWER</span>
            <h3 className="font-display font-semibold text-lg">Filter Products</h3>
          </div>
          <button
            onClick={onClose}
            type="button"
            className="btn-icon"
            aria-label="Close filters"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <Filters
          categories={categories}
          brands={brands}
          selectedCategory={selectedCategory}
          selectedBrand={selectedBrand}
          onCategoryChange={onCategoryChange}
          onBrandChange={onBrandChange}
          onCloseMobile={onClose}
        />

        <div className="mt-6 pt-4 border-t border-line dark:border-linedark">
          <button
            onClick={onClose}
            type="button"
            className="btn-primary w-full py-3"
          >
            Apply Filters & Close
          </button>
        </div>
      </div>
    </div>
  )
}
