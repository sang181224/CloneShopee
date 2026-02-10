import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router-dom'
import productApi from 'src/api/product.api'
import ProductRating from 'src/components/ProductRating'
import { discountPercent, formatNumberToSocialStyle, forrmatCurrency, getIdFromNameId } from 'src/utils/utils'
import DOMPurify from 'dompurify'
import { useMemo, useRef, useState } from 'react'
import type { Product as ProductType } from 'src/types/product.type'
import Product from '../ProductList/components/Product'
import QuantityController from 'src/components/QuantityController'
import purchaseApi from 'src/api/purchase.api'
import { toast } from 'react-toastify'
import { purchasesStatus } from 'src/constants/purchase'
import path from 'src/constants/path'

export default function ProductDetail() {
  const { nameId } = useParams()
  const [byCount, setByCount] = useState(1)
  const id = getIdFromNameId(nameId as string)
  const queryClient = useQueryClient()
  const { data: productDetail } = useQuery({
    queryKey: ['product', id],
    queryFn: () => productApi.getProductDetail(id as string)
  })

  const navigate = useNavigate()
  const [activeImage, setActiveImage] = useState('')
  const [currentIndexImages, setCurrentIndexImage] = useState([0, 5])
  const imageRef = useRef<HTMLImageElement>(null)
  const product = productDetail?.data.data

  const imageCurrent = useMemo(
    () => (product ? product.images.slice(...currentIndexImages) : []),
    [product, currentIndexImages]
  )

  const queryConfig = { limit: '20', page: '1', category: product?.category._id }
  const { data: productsData, isPending } = useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => productApi.getProduct(queryConfig),
    enabled: Boolean(product),
    staleTime: 3 * 60 * 1000
  })

  const addToCartMutation = useMutation({
    mutationFn: purchaseApi.addToCart
  })
  // useEffect(() => {
  //   if (product && product.images.length > 0) {
  //     setActiveImage(product.images[0])
  //   }
  // }, [product])

  const nextImage = () => {
    if (currentIndexImages[1] < (product as ProductType).images.length) {
      setCurrentIndexImage((prev) => [prev[0] + 1, prev[1] + 1])
    }
  }
  const prevImage = () => {
    if (currentIndexImages[0] > 0) {
      setCurrentIndexImage((prev) => [prev[0] - 1, prev[1] - 1])
    }
  }
  const handleZoom = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    // Lấy toạ độ và kích thước của khung chứa ảnh (cái div cha)
    const rect = event.currentTarget.getBoundingClientRect()
    // Lấy thẻ img
    const image = imageRef.current as HTMLImageElement
    //naturalWidth / naturalHeight là kích thước gốc của ảnh, không bị thu nhỏ.
    const { naturalHeight, naturalWidth } = image
    //Cách 1
    // const { offsetX, offsetY } = event.nativeEvent
    //Cách 2
    //Lấy vị trí chuột trong khung ảnh
    const offsetX = event.pageX - (rect.x + window.scrollX)
    const offsetY = event.pageY - (rect.y + window.scrollY)

    //Tính vị trí zoom (top & left)
    const top = offsetY * (1 - naturalHeight / rect.height)
    const left = offsetX * (1 - naturalWidth / rect.width)
    image.style.width = naturalWidth + 'px'
    image.style.height = naturalHeight + 'px'
    image.style.maxWidth = 'unset'
    image.style.top = top + 'px'
    image.style.left = left + 'px'
  }
  const handleRemoveZoom = () => {
    imageRef.current?.removeAttribute('style')
  }
  const addToCart = () => {
    addToCartMutation.mutate(
      { buy_count: byCount, product_id: product?._id as string },
      {
        onSuccess: (data) => {
          queryClient.invalidateQueries({
            queryKey: ['purchaseInCart', { status: purchasesStatus.inCart }]
          })
          toast.success(data.data.message)
        }
      }
    )
  }
  const byNow = async () => {
    const res = await addToCartMutation.mutateAsync({ buy_count: byCount, product_id: product?._id as string })
    const purchase = res.data.data
    navigate(path.cart, { state: { purchaseId: purchase._id } })
  }
  if (isPending) {
    return (
      <div className='flex h-screen items-center justify-center bg-gray-200'>
        <div className='animate-pulse'>Đang tải sản phẩm...</div>
      </div>
    )
  }
  if (!product) {
    return <div>Đang tảii</div>
  }
  const currentImage = activeImage || product.image
  // console.log(currentImage)
  return (
    <div className='bg-gray-200'>
      <div className='py-4'>
        <div className='container rounded-sm bg-white'>
          <div className='grid grid-cols-12'>
            <div className='col-span-5 p-2'>
              <div
                className='relative w-full overflow-hidden pt-[100%]'
                onMouseMove={handleZoom}
                onMouseLeave={handleRemoveZoom}
              >
                <img
                  src={currentImage}
                  alt={product.name}
                  className='absolute left-0 top-0 h-full w-full'
                  ref={imageRef}
                />
              </div>
              <div className='relative mt-4 grid grid-cols-5 gap-1'>
                {imageCurrent.map((image) => {
                  const isActive = currentImage === image
                  return (
                    <button className='relative w-full cursor-pointer pt-[100%]' key={image}>
                      <img
                        src={image}
                        alt={product.name}
                        className='absolute left-0 top-0 h-full w-full'
                        onMouseEnter={() => setActiveImage(image)}
                      />
                      {isActive && (
                        <div className='absolute left-0 top-0 z-10 h-full w-full border-2 border-orange-400'></div>
                      )}
                    </button>
                  )
                })}

                <button
                  className='absolute left-0 top-1/2 z-10 h-11 w-7 -translate-y-1/2 bg-black/30 text-white'
                  onClick={prevImage}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth='1.5'
                    stroke='currentColor'
                    className='h-8 w-8'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5 8.25 12l7.5-7.5' />
                  </svg>
                </button>
                <button
                  className='absolute right-0 top-1/2 z-10 h-11 w-7 -translate-y-1/2 bg-black/30 text-white'
                  onClick={nextImage}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='h-8 w-8'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' d='m8.25 4.5 7.5 7.5-7.5 7.5' />
                  </svg>
                </button>
              </div>
            </div>
            <div className='col-span-7 p-5'>
              <h1 className='text-xl font-normal'>{product.name}</h1>
              <div className='mt-3 flex items-center'>
                <div className='flex items-center'>
                  <span className='mr-2 border-b border-black text-base'>{product.rating}</span>
                  <ProductRating
                    rating={product.rating}
                    activeClass='h-3 w-3 fill-orange_main'
                    nonActiveClass='h-3 w-3 text-orange_main'
                  />
                </div>
                <div className='mx-4 h-6 w-[1px] bg-gray-300'></div>
                <div className='flex items-center'>
                  <span className='mr-2 text-sm capitalize text-gray-500'>Đã bán</span>
                  <div className='text-base'>{formatNumberToSocialStyle(product.sold)}+</div>
                </div>
              </div>
              <div className='mt-3 flex items-center gap-5 bg-gray-50 px-3 py-5'>
                <div className='text-3xl text-orange_main'>{forrmatCurrency(product.price)}₫</div>
                <div className='text-md text-gray-400 line-through'>{forrmatCurrency(product.price)}₫</div>
                <div className='bg-orange_main/20 px-1 py-[2px] text-center text-xs font-semibold text-orange_main'>
                  {discountPercent(product.price_before_discount, product.price)}
                </div>
              </div>
              <div className='mt-3 flex items-center'>
                <span className='test-sm capitalize text-gray-500'>Số lượng</span>
                <QuantityController
                  onIncrease={setByCount}
                  onDecrease={setByCount}
                  onType={setByCount}
                  max={product.quantity}
                  value={byCount}
                />
                <span className='ml-5 text-sm text-gray-500'>{product.quantity} sản phẩm sẵn có</span>
              </div>
              <div className='mt-8 flex items-center gap-3'>
                <button
                  className='flex items-center gap-2 border border-orange_main bg-orange_main bg-orange_main/10 px-5 py-3 capitalize text-orange_main shadow-sm hover:bg-orange_main/5'
                  onClick={addToCart}
                >
                  <img
                    alt='icon-add-to-cart'
                    className='h-5 w-5'
                    src='https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/productdetailspage/f600cbfffbe02cc144a1.svg'
                  />

                  <span className='text-sm'>thêm vào giỏ hàng</span>
                </button>
                <button
                  onClick={byNow}
                  className='bg-orange_main px-5 py-3 text-sm capitalize text-white shadow-sm hover:bg-orange_main/90'
                >
                  Mua ngay
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='pb-4'>
        <div className='container rounded-sm bg-white p-7'>
          <div className='bg-gray-50 p-4 text-xl uppercase text-slate-800'>Mô tả sản phẩm</div>
          <div className='p-4 text-sm leading-loose text-slate-700'>
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(product.description)
              }}
            />
          </div>
        </div>
      </div>
      <div className='p-4'>
        <div className='container p-0'>
          <span className='text-md uppercase text-gray-500'>có thể bạn cũng thích</span>
          {productsData && (
            <div className='mt-4 grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6'>
              {productsData.data.data.products.map((product) => (
                <div className='col-span-1' key={product._id}>
                  <Product product={product} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
