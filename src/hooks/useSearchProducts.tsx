import { createSearchParams, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { schema, type Schema } from 'src/utils/rules'
import useQueryConfig from 'src/hooks/useQueryConfig'
import { omit } from 'lodash'
import path from 'src/constants/path'

type formData = Pick<Schema, 'name'>
const schemaSearch = schema.pick(['name'])
export default function useSearchProducts() {
  const navigate = useNavigate()
  const queryConfig = useQueryConfig()
  const { register, handleSubmit } = useForm<formData>({
    defaultValues: {
      name: ''
    },
    resolver: yupResolver(schemaSearch)
  })
  const handleSearch = handleSubmit((data) => {
    console.log(data)
    const config = queryConfig.order
      ? omit(
          {
            ...queryConfig,
            name: data.name
          },
          ['order', 'sort_by']
        )
      : omit(
          {
            ...queryConfig,
            name: data.name
          },
          ['order']
        )
    navigate({
      pathname: path.home,
      search: createSearchParams(config).toString()
    })
  })
  return { register, handleSearch }
}
