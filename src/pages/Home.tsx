import { useState, useMemo } from 'react'
import { useProducts } from '../context/ProductContext'
import Navbar from '../components/Navbar'
import MobileSearch from '../components/MobileSearch'
import Filters from '../components/Filters'
import SortSelect from '../components/SortSelect'
import ProductCard from '../components/ProductCard'
import Spinner from '../components/Spinner'

export default function Home() {
  const { products, loading, error } = useProducts()

  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedBrand, setSelectedBrand] = useState('')
  const [sortBy, setSortBy] = useState<string>('name-asc')
  const [showFilters, setShowFilters] = useState(false)

  const categories = useMemo(() => {
    const set = new Set(products.map((p) => p.category))
    return Array.from(set).sort()
  }, [products])

  const brands = useMemo(() => {
    const set = new Set(products.map((p) => p.brand).filter(Boolean))
    return Array.from(set).sort()
  }, [products])

  const filtered = useMemo(() => {
    let result = [...products]

    if (search) {
      const q = search.toLowerCase()
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.brand?.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      )
    }

    if (selectedCategory) {
      result = result.filter((p) => p.category === selectedCategory)
    }

    if (selectedBrand) {
      result = result.filter((p) => p.brand === selectedBrand)
    }

    const [key, dir] = sortBy.split('-')
    result.sort((a, b) => {
      let cmp = 0
      if (key === 'price') cmp = a.price - b.price
      else if (key === 'rating') cmp = a.rating - b.rating
      else if (key === 'name') cmp = a.title.localeCompare(b.title)
      return dir === 'desc' ? -cmp : cmp
    })

    return result
  }, [products, search, selectedCategory, selectedBrand, sortBy])

  if (error) {
    return (
      <div className="min-h-screen bg-paper dark:bg-inkdark text-ink dark:text-paperdark">
        <Navbar search={search} onSearchChange={setSearch} />
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 py-20 text-center">
          <div className="p-8 rounded-xl border border-rose/30 bg-rose/10 max-w-md mx-auto">
            <p className="text-rose font-medium mb-1">Something went wrong</p>
            <p className="text-sm text-slate dark:text-slatedark">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 btn-outline"
            >
              Try again
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-paper dark:bg-inkdark text-ink dark:text-paperdark">
      <Navbar search={search} onSearchChange={setSearch} />
      <MobileSearch search={search} onSearchChange={setSearch} />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="font-display font-semibold text-2xl tracking-tight">
              Electronics
            </h1>
            <p className="text-sm text-slate dark:text-slatedark">
              {filtered.length} product{filtered.length !== 1 ? 's' : ''} found
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden btn-outline px-3 py-1.5 text-xs"
            >
              {showFilters ? 'Hide filters' : 'Filters'}
            </button>
            <SortSelect value={sortBy as any} onChange={setSortBy} />
          </div>
        </div>

        <div className="flex gap-8">
          <aside className={`shrink-0 w-56 ${showFilters ? 'block' : 'hidden'} lg:block`}>
            <Filters
              categories={categories}
              brands={brands}
              selectedCategory={selectedCategory}
              selectedBrand={selectedBrand}
              onCategoryChange={(c) => { setSelectedCategory(c); setSelectedBrand('') }}
              onBrandChange={(b) => { setSelectedBrand(b); setSelectedCategory('') }}
            />
          </aside>

          <main className="flex-1 min-w-0">
            {loading ? (
              <Spinner />
            ) : filtered.length === 0 ? (
              <div className="p-12 rounded-xl border border-dashed border-line dark:border-linedark text-center">
                <div className="w-10 h-10 rounded-full bg-ink/5 dark:bg-white/5 grid place-content-center mx-auto mb-3">
                  <svg className="w-4 h-4 text-slate dark:text-slatedark" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <p className="text-sm font-medium">No products found</p>
                <p className="text-xs text-slate dark:text-slatedark mt-1">
                  Try adjusting your search or filters.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
                {filtered.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}
