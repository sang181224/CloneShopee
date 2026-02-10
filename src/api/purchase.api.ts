import type { Purchase, purchaseListStatus } from 'src/types/purchase.type'
import type { SuccsessResponse } from 'src/types/utils.type'
import http from 'src/utils/http'

const URL = 'purchases'

const purchaseApi = {
  addToCart(body: { product_id: string; buy_count: number }) {
    return http.post<SuccsessResponse<Purchase>>(`${URL}/add-to-cart`, body)
  },
  getPurchases(params: { status: purchaseListStatus }) {
    return http.get<SuccsessResponse<Purchase[]>>(`${URL}`, {
      params
    })
  },
  buyPurchases(body: { product_id: string; buy_count: number }[]) {
    return http.post<SuccsessResponse<Purchase[]>>(`${URL}/buy-products`, body)
  },
  updatePurchase(body: { product_id: string; buy_count: number }) {
    return http.put<SuccsessResponse<Purchase>>(`${URL}/update-purchase`, body)
  },
  deletePurchase(purchaseIds: string[]) {
    return http.delete<SuccsessResponse<{ deleted_count: number }>>(`${URL}`, {
      data: purchaseIds
    })
  }
}
export default purchaseApi
