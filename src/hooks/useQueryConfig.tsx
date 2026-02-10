import useQueryParams from 'src/hooks/useQueryParams'
import { isUndefined, omitBy } from 'lodash'

export type QueryConfig = {
  page?: string
  exclude?: string
  limit?: string
  name?: string
  order?: 'asc' | 'desc'
  price_max?: string
  price_min?: string
  rating_filter?: string
  sort_by?: 'createdAt' | 'view' | 'sold' | 'price'
  category?: string
}
export default function useQueryConfig() {
  const queryParams: QueryConfig = useQueryParams()
  const queryConfig: QueryConfig = omitBy(
    {
      page: queryParams.page || 1,
      exclude: queryParams.exclude,
      limit: queryParams.limit || 20,
      name: queryParams.name,
      order: queryParams.order,
      price_max: queryParams.price_max,
      price_min: queryParams.price_min,
      rating_filter: queryParams.rating_filter,
      sort_by: queryParams.sort_by,
      category: queryParams.category
    },
    isUndefined
  )
  return queryConfig
}
