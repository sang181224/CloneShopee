import type { Category } from 'src/types/category.type'
import type { SuccsessResponse } from 'src/types/utils.type'
import http from 'src/utils/http'

const URL = 'categories'

const categoryApi = {
  getCategory() {
    return http.get<SuccsessResponse<Category[]>>(URL)
  }
}
export default categoryApi
