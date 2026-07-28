import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import type { Product, ProductFormData } from '../types'
import { fetchProducts, createProduct as apiCreate, updateProduct as apiUpdate, deleteProduct as apiDelete } from '../utils/api'

interface ProductContextValue {
  products: Product[]
  loading: boolean
  error: string | null
  addProduct: (data: ProductFormData) => void
  editProduct: (id: number, data: Partial<ProductFormData>) => void
  removeProduct: (id: number) => void
}

const ProductContext = createContext<ProductContextValue | null>(null)

export function ProductProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)
    fetchProducts()
      .then((data) => {
        if (!cancelled) setProducts(data)
      })
      .catch((err) => {
        if (!cancelled) setError(err.message)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => { cancelled = true }
  }, [])

  function addProduct(data: ProductFormData) {
    const temp: Product = {
      id: Date.now(),
      rating: 0,
      discountPercentage: 0,
      thumbnail: `https://placehold.co/400x400?text=${encodeURIComponent(data.title)}`,
      images: [],
      reviews: [],
      tags: [],
      sku: '',
      weight: 0,
      warrantyInformation: '',
      shippingInformation: '',
      availabilityStatus: 'In Stock',
      returnPolicy: '',
      minimumOrderQuantity: 1,
      ...data,
    }
    setProducts((prev) => [temp, ...prev])
    apiCreate(data).then((created) => {
      setProducts((prev) => prev.map((p) => (p.id === temp.id ? { ...p, ...created, id: created.id || temp.id } : p)))
    }).catch(() => {})
  }

  function editProduct(id: number, data: Partial<ProductFormData>) {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...data } : p)))
    apiUpdate(id, data).catch(() => {})
  }

  function removeProduct(id: number) {
    setProducts((prev) => prev.filter((p) => p.id !== id))
    apiDelete(id).catch(() => {})
  }

  return (
    <ProductContext.Provider value={{ products, loading, error, addProduct, editProduct, removeProduct }}>
      {children}
    </ProductContext.Provider>
  )
}

export function useProducts() {
  const ctx = useContext(ProductContext)
  if (!ctx) throw new Error('useProducts must be used within ProductProvider')
  return ctx
}
