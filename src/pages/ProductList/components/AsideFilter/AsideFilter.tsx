import { createSearchParams, Link, useNavigate } from 'react-router-dom'
import Button from 'src/components/Button'
import type { Category } from 'src/types/category.type'
import classNames from 'classnames'
import path from 'src/constants/path'
import { Controller, useForm } from 'react-hook-form'
import { schema, type Schema } from 'src/utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import InputNumber from 'src/components/InputNumber'
import RatingStars from 'src/components/RatingStars'
import { omit } from 'lodash'
import type { QueryConfig } from 'src/hooks/useQueryConfig'
interface Props {
  queryConfig: QueryConfig
  categories: Category[]
}
type FormFilter = Pick<Schema, 'price_max' | 'price_min'>
const schemaFilter = schema.pick(['price_max', 'price_min'])
// const schemaFilter = schema.pick(['price_min', 'price_max'])
export default function AsideFilter({ categories, queryConfig }: Props) {
  const {
    control,
    handleSubmit,
    trigger,
    reset,
    formState: { errors }
  } = useForm<FormFilter>({
    defaultValues: {
      price_max: '',
      price_min: ''
    },
    resolver: yupResolver(schemaFilter),
    shouldFocusError: false
  })
  const navigate = useNavigate()
  // console.log(errors)
  const onSubmit = handleSubmit((data) => {
    navigate({
      pathname: path.home,
      search: createSearchParams({
        ...queryConfig,
        price_min: data.price_min,
        price_max: data.price_max
      }).toString()
    })
  })
  const handleRemoveFilter = () => {
    navigate({
      pathname: path.home,
      search: createSearchParams(omit(queryConfig, ['category', 'price_min', 'price_max', 'rating_filter'])).toString()
    })
    reset()
  }
  return (
    <div className='py-4 capitalize'>
      <Link
        to={path.home}
        className={classNames('flex items-center font-bold', {
          'font-bold text-orange_main': !queryConfig.category
        })}
      >
        <svg
          viewBox='0 0 12 10'
          className={classNames('mr-2 h-3 w-3 cursor-pointer', {
            'fill-orange_main font-bold': !queryConfig.category
          })}
        >
          <g fillRule='evenodd' stroke='none' strokeWidth={1}>
            <g transform='translate(-373 -208)'>
              <g transform='translate(155 191)'>
                <g transform='translate(218 17)'>
                  <path d='m0 2h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z' />
                  <path d='m0 6h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z' />
                  <path d='m0 10h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z' />
                </g>
              </g>
            </g>
          </g>
        </svg>
        Tất cả danh mục
      </Link>
      <div className='my-3 border border-gray-300'></div>
      <ul>
        {categories.map((category) => {
          const isActive = category._id === queryConfig.category
          return (
            <Link
              to={{
                pathname: path.home,
                search: createSearchParams({
                  ...queryConfig,
                  category: category._id
                }).toString()
              }}
              key={category._id}
              className={classNames('flex items-center py-2 text-sm', {
                'font-bold text-orange_main': isActive
              })}
            >
              {isActive && (
                <svg viewBox='0 0 4 7' className='mr-1 h-2 w-2 fill-orange_main'>
                  <polygon points='4 3.5 0 0 0 7'></polygon>
                </svg>
              )}
              {category.name}
            </Link>
          )
        })}
      </ul>
      <div className='my-3 flex items-center font-bold uppercase'>
        <svg enableBackground='new 0 0 15 15' viewBox='0 0 15 15' x={0} y={0} className='mr-2 h-4 w-3 stroke-black'>
          <g>
            <polyline
              fill='none'
              points='5.5 13.2 5.5 5.8 1.5 1.2 13.5 1.2 9.5 5.8 9.5 10.2'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeMiterlimit={10}
            />
          </g>
        </svg>
        Bộ lọc tìm kiếm
      </div>
      <div className='my-3 border border-gray-300'></div>
      <div className='my-5'>
        <div className='text-sm'>Khoản giá</div>
        <form className='mt-2' onSubmit={onSubmit}>
          <div className='flex items-start'>
            <Controller
              control={control}
              name='price_min'
              render={({ field }) => {
                return (
                  <InputNumber
                    type='text'
                    placeholder='₫ TỪ'
                    className='grow'
                    classNameError='hidden'
                    classNameInput='p-1 w-full outline-none border text-sm border-gray-300 focus:border-gray-500 focus:shadow-sm'
                    // onChange={field.onChange}
                    // value={field.value}
                    // ref={field.ref}
                    {...field}
                    onChange={(event) => {
                      field.onChange(event)
                      trigger('price_max')
                    }}
                  />
                )
              }}
            />
            {/* <InputV2
              control={control}
              name='price_min'
              type='number'
              placeholder='₫ TỪ'
              className='grow'
              classNameError='hidden'
              classNameInput='p-1 w-full outline-none border text-sm border-gray-300 focus:border-gray-500 focus:shadow-sm'
              onChange={() => {
                trigger('price_max')
              }}
            /> */}
            <div className='mx-2 mt-1 shrink-0'>-</div>
            <Controller
              control={control}
              name='price_max'
              render={({ field }) => {
                return (
                  <InputNumber
                    type='text'
                    placeholder='₫ ĐẾN'
                    className='grow'
                    classNameError='hidden'
                    classNameInput='p-1 w-full outline-none border text-sm border-gray-300 focus:border-gray-500 focus:shadow-sm'
                    // onChange={field.onChange}
                    // value={field.value}
                    // ref={field.ref}
                    {...field}
                    onChange={(event) => {
                      field.onChange(event)
                      trigger('price_min')
                    }}
                  />
                )
              }}
            />
          </div>
          <div className='min-h-[1.5rem] text-center text-sm text-red-600'>{errors.price_min?.message}</div>
          <Button className='mb-5 flex w-full items-center justify-center bg-orange_main p-2 uppercase text-white hover:bg-orange_main/90'>
            áp dụng
          </Button>
        </form>
        <div className='my-3 border border-gray-300'></div>
        <div className='my-5 text-sm'>
          Đánh giá
          <RatingStars queryConfig={queryConfig} />
        </div>
        <div className='my-3 border border-gray-300'></div>
        <Button
          onClick={() => handleRemoveFilter()}
          className='mt-5 flex w-full items-center justify-center bg-orange_main p-2 uppercase text-white hover:bg-orange_main/90'
        >
          xoá tất cả
        </Button>
      </div>
    </div>
  )
}
