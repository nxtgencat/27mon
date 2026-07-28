import type { Product, ProductFormData } from '../types'

const BASE_URL = 'https://dummyjson.com'

export interface ProductsResponse {
  products: Product[]
  total: number
  skip: number
  limit: number
}

export async function fetchProducts(): Promise<Product[]> {
  const res = await fetch(`${BASE_URL}/products?limit=100`)
  if (!res.ok) throw new Error(`Failed to fetch products (${res.status})`)
  const data: ProductsResponse = await res.json()
  return data.products
}

export async function createProduct(data: ProductFormData): Promise<Product> {
  const res = await fetch(`${BASE_URL}/products/add`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error(`Failed to create product (${res.status})`)
  return res.json()
}

export async function updateProduct(id: number, data: Partial<ProductFormData>): Promise<Product> {
  const res = await fetch(`${BASE_URL}/products/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error(`Failed to update product (${res.status})`)
  return res.json()
}

export async function deleteProduct(id: number): Promise<void> {
  const res = await fetch(`${BASE_URL}/products/${id}`, {
    method: 'DELETE',
  })
  if (!res.ok) throw new Error(`Failed to delete product (${res.status})`)
}
