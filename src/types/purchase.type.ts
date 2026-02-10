import type { Product } from './product.type'

export type purchasesStatus = -1 | 1 | 2 | 3 | 4 | 5
export type purchaseListStatus = purchasesStatus | 0
export interface Purchase {
  buy_count: number
  price: number
  price_before_discount: number
  status: purchasesStatus
  _id: string
  user: string
  product: Product
  createdAt: string
  updatedAt: string
}
