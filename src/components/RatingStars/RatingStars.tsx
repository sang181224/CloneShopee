import classNames from 'classnames'
import { createSearchParams, useNavigate } from 'react-router-dom'
import path from 'src/constants/path'
import type { QueryConfig } from 'src/hooks/useQueryConfig'

interface Props {
  queryConfig: QueryConfig
}
export default function RatingStars({ queryConfig }: Props) {
  const { rating_filter } = queryConfig
  const navigate = useNavigate()
  const handleStarFilter = (starNumber: number) => {
    navigate({
      pathname: path.home,
      search: createSearchParams({
        ...queryConfig,
        rating_filter: String(starNumber)
      }).toString()
    })
  }
  return (
    <div>
      <ul>
        {Array(5)
          .fill(0)
          .map((_, index) => (
            <div
              key={index}
              className={classNames('flex items-center gap-1 p-1 px-2', {
                'rounded-2xl bg-gray-200/60 bg-slate-300': Number(rating_filter) === 5 - index
              })}
              tabIndex={0}
              role='button'
              aria-hidden='true'
              onClick={() => handleStarFilter(5 - index)}
            >
              <li className='flex gap-[2px]'>
                {Array(5)
                  .fill(0)
                  .map((_, indexStar) => {
                    if (indexStar < 5 - index) {
                      return (
                        <svg
                          key={indexStar}
                          xmlns='http://www.w3.org/2000/svg'
                          viewBox='0 0 24 24'
                          fill='currentColor'
                          className='h-4 w-4 fill-yellow-400 text-yellow-400'
                        >
                          <path
                            fillRule='evenodd'
                            d='M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z'
                            clipRule='evenodd'
                          />
                        </svg>
                      )
                    }
                    return (
                      <svg
                        key={indexStar}
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth={1.5}
                        stroke='currentColor'
                        className='h-4 w-4 text-yellow-400'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z'
                        />
                      </svg>
                    )
                  })}
              </li>
              {index !== 0 && <span className='lowercase'>trở lên</span>}
            </div>
          ))}
      </ul>
    </div>
  )
}
