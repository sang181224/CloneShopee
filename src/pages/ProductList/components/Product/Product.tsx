import { Link } from 'react-router-dom'
import ProductRating from 'src/components/ProductRating'
import type { Product as ProductType } from 'src/types/product.type'
import { formatNumberToSocialStyle, forrmatCurrency, generateNameId } from 'src/utils/utils'

interface Props {
  product: ProductType
}
export default function Product({ product }: Props) {
  return (
    <Link to={generateNameId({ name: product.name, id: product._id })}>
      <div className='overflow-hidden rounded-md bg-white shadow transition-transform duration-100 hover:translate-y-[-0.06rem] hover:shadow-md'>
        <div className='relative w-full pt-[100%]'>
          <img
            src='https://down-vn.img.susercontent.com/file/vn-11134258-820l4-mg6dynjsmvbea7'
            alt=''
            className='absolute left-0 top-0 z-10 h-full w-full'
          />
          <img src={product.image} alt={product.name} className='absolute left-0 top-0 h-full w-full bg-white' />
        </div>
        <div className='overflow-hidden p-2'>
          <div className='line-clamp-2 min-h-10 text-sm'>{product.name}</div>
          <div className='mt-3 flex items-center gap-2'>
            <div className='max-w-[50%] truncate text-gray-500 line-through'>
              <span className='text-xs'>₫</span>
              <span className='text-sm'>{forrmatCurrency(product.price_before_discount)}</span>
            </div>
            <div className='truncate text-orange_main'>
              <span className='text-xs'>₫</span>
              <span className='test-sm'>{forrmatCurrency(product.price)}</span>
            </div>
          </div>
          <div className='mt-3 flex items-center justify-start text-xs'>
            <ProductRating rating={product.rating} />
            <div className='ml-3 flex'>
              <span>Đã bán&nbsp;</span>
              <span>{formatNumberToSocialStyle(product.sold)}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
