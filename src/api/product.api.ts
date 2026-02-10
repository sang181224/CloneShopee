import type { Product, ProductList, ProductListConfig } from 'src/types/product.type'
import type { SuccsessResponse } from 'src/types/utils.type'
import http from 'src/utils/http'

const URL = 'products'
const productApi = {
  getProduct(params: ProductListConfig) {
    // console.log(params)
    return http.get<SuccsessResponse<ProductList>>(URL, {
      params
    })
  },
  getProductDetail(id: string) {
    return http.get<SuccsessResponse<Product>>(`${URL}/${id}`)
  }
}
export default productApi
