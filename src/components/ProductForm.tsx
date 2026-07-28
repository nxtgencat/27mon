import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import type { Product, ProductFormData } from '../types'

interface ProductFormProps {
  product?: Product | null
  onSubmit: (data: ProductFormData) => void
  onClose: () => void
}

export default function ProductForm({ product, onSubmit, onClose }: ProductFormProps) {
  const [form, setForm] = useState<ProductFormData>({
    title: '',
    description: '',
    price: 0,
    category: '',
    brand: '',
    stock: 0,
  })

  useEffect(() => {
    if (product) {
      setForm({
        title: product.title,
        description: product.description,
        price: product.price,
        category: product.category,
        brand: product.brand || '',
        stock: product.stock,
      })
    }
  }, [product])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.title.trim()) return
    onSubmit(form)
  }

  return (
    <div className="fixed inset-0 z-[60] grid place-content-center p-4 sm:p-5">
      <div onClick={onClose} className="absolute inset-0 bg-ink/40 backdrop-blur-sm" />
      <div className="relative bg-surface dark:bg-surfacedark rounded-xl shadow-lg w-[min(92vw,520px)] p-5 sm:p-6 animate-fadeUp max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-line dark:border-linedark">
          <div>
            <span className="mini-tag block mb-0.5">FORM SPECIMEN</span>
            <h3 className="font-display font-semibold text-lg sm:text-xl tracking-tight">
              {product ? 'Edit Product' : 'Add New Product'}
            </h3>
          </div>
          <button
            onClick={onClose}
            type="button"
            className="btn-icon text-slate dark:text-slatedark hover:text-ink dark:hover:text-paperdark"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium mb-1.5 text-slate dark:text-slatedark">
              Title <span className="text-rose">*</span>
            </label>
            <input
              required
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="e.g. Wireless Noise-Canceling Headphones"
              className="field"
            />
          </div>

          <div>
            <label className="block text-xs font-medium mb-1.5 text-slate dark:text-slatedark">
              Description
            </label>
            <textarea
              rows={3}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Provide a short overview of features and specs..."
              className="field resize-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium mb-1.5 text-slate dark:text-slatedark">
                Price ($)
              </label>
              <div className="flex">
                <span className="px-3 py-2.5 rounded-l-lg border border-r-0 border-line dark:border-linedark bg-ink/5 dark:bg-white/5 text-sm text-slate dark:text-slatedark select-none">$</span>
                <input
                  type="number"
                  min={0}
                  step="0.01"
                  value={form.price || ''}
                  onChange={(e) => setForm({ ...form, price: parseFloat(e.target.value) || 0 })}
                  className="flex-1 min-w-0 px-4 py-2.5 rounded-r-lg bg-surface dark:bg-surfacedark border border-line dark:border-linedark text-sm outline-none focus:border-cobalt focus:shadow-glow transition-all"
                  placeholder="0.00"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium mb-1.5 text-slate dark:text-slatedark">
                Stock Quantity
              </label>
              <input
                type="number"
                min={0}
                value={form.stock || ''}
                onChange={(e) => setForm({ ...form, stock: parseInt(e.target.value) || 0 })}
                placeholder="0"
                className="field"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium mb-1.5 text-slate dark:text-slatedark">
                Category
              </label>
              <input
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                placeholder="e.g. smartphones"
                className="field"
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1.5 text-slate dark:text-slatedark">
                Brand
              </label>
              <input
                value={form.brand}
                onChange={(e) => setForm({ ...form, brand: e.target.value })}
                placeholder="e.g. Apple"
                className="field"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-line dark:border-linedark mt-6">
            <button type="button" onClick={onClose} className="btn-ghost px-4 py-2">
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              {product ? 'Save Changes' : 'Create Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
