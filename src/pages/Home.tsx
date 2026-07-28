import { useState, useMemo } from 'react'
import { Plus, SlidersHorizontal, PackageX } from 'lucide-react'
import { useProducts } from '../context/ProductContext'
import Navbar from '../components/Navbar'
import MobileSearch from '../components/MobileSearch'
import Filters from '../components/Filters'
import FilterDrawer from '../components/FilterDrawer'
import SortSelect, { type SortKey } from '../components/SortSelect'
import ProductCard from '../components/ProductCard'
import ProductForm from '../components/ProductForm'
import ConfirmDelete from '../components/ConfirmDelete'
import Spinner from '../components/Spinner'
import type { Product, ProductFormData } from '../types'

export default function Home() {
  const { products, loading, error, addProduct, editProduct, removeProduct } = useProducts()

  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedBrand, setSelectedBrand] = useState('')
  const [sortBy, setSortBy] = useState<SortKey>('name-asc')
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<Product | null>(null)
  const [deleting, setDeleting] = useState<Product | null>(null)

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
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
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

  function handleAdd(data: ProductFormData) {
    addProduct(data)
    setShowForm(false)
  }

  function handleEdit(data: ProductFormData) {
    if (!editing) return
    editProduct(editing.id, data)
    setEditing(null)
  }

  function handleDelete() {
    if (!deleting) return
    removeProduct(deleting.id)
    setDeleting(null)
  }

  if (error) {
    return (
      <div className="min-h-screen bg-paper dark:bg-inkdark text-ink dark:text-paperdark font-sans">
        <Navbar search={search} onSearchChange={setSearch} />
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 py-20 text-center">
          <div className="p-8 rounded-xl border border-rose/30 bg-rose/10 max-w-md mx-auto">
            <p className="text-rose font-medium mb-1">Failed to load catalog</p>
            <p className="text-xs text-slate dark:text-slatedark mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              type="button"
              className="btn-outline text-xs"
            >
              Reload Page
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-paper dark:bg-inkdark text-ink dark:text-paperdark font-sans transition-colors duration-300">
      <Navbar search={search} onSearchChange={setSearch} />
      <MobileSearch search={search} onSearchChange={setSearch} />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 py-6 sm:py-8">
        {/* Specimen Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pb-6 border-b border-line dark:border-linedark">
          <div>
            <span className="ticket-tag mb-3 inline-flex">
              <span className="w-1.5 h-1.5 rounded-full bg-mint animate-pulse" />
              ELECTRONICS STORE
            </span>
            <h1 className="font-display font-semibold text-2xl sm:text-3xl md:text-4xl tracking-tight mt-1">
              Store Catalog
            </h1>
            <p className="text-xs sm:text-sm text-slate dark:text-slatedark mt-1">
              Showing <span className="font-mono font-medium text-ink dark:text-paperdark">{filtered.length}</span> product{filtered.length !== 1 ? 's' : ''} available
            </p>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            <button
              onClick={() => setShowForm(true)}
              type="button"
              className="btn-primary inline-flex items-center gap-1.5 text-xs sm:text-sm"
            >
              <Plus className="w-4 h-4" /> <span>Add Product</span>
            </button>

            {/* Mobile / Tablet Filter Button */}
            <button
              onClick={() => setIsDrawerOpen(true)}
              type="button"
              className="btn-outline lg:hidden inline-flex items-center gap-1.5 text-xs sm:text-sm"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filters</span>
              {(selectedCategory || selectedBrand) && (
                <span className="w-2 h-2 rounded-full bg-cobalt dark:bg-cobalt-light" />
              )}
            </button>

            <SortSelect value={sortBy} onChange={setSortBy} />
          </div>
        </div>

        {/* Main Content Layout */}
        <div className="flex gap-8 items-start">
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block sticky top-24 w-56 shrink-0 p-5 rounded-xl bg-surface dark:bg-surfacedark border border-line/60 dark:border-linedark/60 shadow-xs">
            <Filters
              categories={categories}
              brands={brands}
              selectedCategory={selectedCategory}
              selectedBrand={selectedBrand}
              onCategoryChange={(c) => { setSelectedCategory(c); setSelectedBrand('') }}
              onBrandChange={(b) => { setSelectedBrand(b); setSelectedCategory('') }}
            />
          </aside>

          {/* Product Grid & States */}
          <main className="flex-1 min-w-0">
            {loading ? (
              <Spinner />
            ) : filtered.length === 0 ? (
              <div className="p-10 sm:p-14 rounded-xl border border-dashed border-line dark:border-linedark text-center max-w-lg mx-auto my-8">
                <div className="w-12 h-12 rounded-full bg-ink/5 dark:bg-white/5 grid place-content-center mx-auto mb-3 text-slate dark:text-slatedark">
                  <PackageX className="w-6 h-6" />
                </div>
                <h3 className="font-display font-semibold text-base sm:text-lg mb-1">No products found</h3>
                <p className="text-xs sm:text-sm text-slate dark:text-slatedark max-w-xs mx-auto mb-5 leading-relaxed">
                  No inventory items match your current search query or filter options.
                </p>
                <button
                  onClick={() => { setSearch(''); setSelectedCategory(''); setSelectedBrand('') }}
                  type="button"
                  className="btn-secondary px-5 py-2 text-xs"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-5">
                {filtered.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onEdit={setEditing}
                    onDelete={setDeleting}
                  />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Drawer */}
      <FilterDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        categories={categories}
        brands={brands}
        selectedCategory={selectedCategory}
        selectedBrand={selectedBrand}
        onCategoryChange={(c) => { setSelectedCategory(c); setSelectedBrand('') }}
        onBrandChange={(b) => { setSelectedBrand(b); setSelectedCategory('') }}
      />

      {/* Form Dialog */}
      {showForm && (
        <ProductForm product={null} onSubmit={handleAdd} onClose={() => setShowForm(false)} />
      )}

      {/* Edit Dialog */}
      {editing && (
        <ProductForm product={editing} onSubmit={handleEdit} onClose={() => setEditing(null)} />
      )}

      {/* Delete Confirmation Alert Dialog */}
      {deleting && (
        <ConfirmDelete
          title={deleting.title}
          onConfirm={handleDelete}
          onCancel={() => setDeleting(null)}
        />
      )}
    </div>
  )
}
