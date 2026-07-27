import type { Product } from '../types'

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

export async function fetchProduct(id: number): Promise<Product> {
  const res = await fetch(`${BASE_URL}/products/${id}`)
  if (!res.ok) throw new Error(`Failed to fetch product (${res.status})`)
  return res.json()
}
