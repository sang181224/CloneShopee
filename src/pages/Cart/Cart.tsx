import { useMutation, useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import purchaseApi from 'src/api/purchase.api'
import Button from 'src/components/Button'
import QuantityController from 'src/components/QuantityController'
import { purchasesStatus } from 'src/constants/purchase'
import type { Purchase } from 'src/types/purchase.type'
import { forrmatCurrency } from 'src/utils/utils'
import { produce } from 'immer'
import { keyBy } from 'lodash'
import { toast } from 'react-toastify'
import { Link, useLocation } from 'react-router-dom'
import path from 'src/constants/path'

interface ExtendedPurchases extends Purchase {
  checked: boolean
  disable: boolean
}
export default function Cart() {
  const [extendedPurchases, setExtendedPurchases] = useState<ExtendedPurchases[]>([])
  const { data: purchaseInCartData, refetch } = useQuery({
    queryKey: ['purchaseInCart', { status: purchasesStatus.inCart }],
    queryFn: () => purchaseApi.getPurchases({ status: purchasesStatus.inCart })
  })
  const upadtePurchaseMutation = useMutation({
    mutationFn: purchaseApi.updatePurchase,
    onSuccess: () => {
      refetch()
    }
  })
  const buyPurchaseMutation = useMutation({
    mutationFn: purchaseApi.buyPurchases,
    onSuccess: (data) => {
      refetch()
      toast.success(data.data.message, {
        autoClose: 1000
      })
    }
  })
  const deletePurchaseMutation = useMutation({
    mutationFn: purchaseApi.deletePurchase,
    onSuccess: (data) => {
      refetch()
      toast.success(data.data.message, {
        autoClose: 1000
      })
    }
  })
  const purchaseInCart = purchaseInCartData?.data.data
  // console.log(purchaseInCart)
  const isAllChecked = extendedPurchases.every((purchase) => purchase.checked)
  const checkedPurchases = extendedPurchases.filter((purchase) => purchase.checked)
  const checkedPurchasesCount = checkedPurchases.length
  const totalCheckedPurchasesPrice = checkedPurchases.reduce((result, current) => {
    return result + current.product.price * current.buy_count
  }, 0)
  const totalCheckedPurchasesSavingPrice = checkedPurchases.reduce((result, current) => {
    return result + (current.product.price_before_discount - current.product.price) * current.buy_count
  }, 0)
  const localtion = useLocation()
  const chosenPurchaseId = (localtion.state as { purchaseId: string } | null)?.purchaseId
  // console.log(chosenPurchaseId)
  // console.log(localtion)
  useEffect(() => {
    setExtendedPurchases((prev) => {
      const extendedpurchaseInCartObj = keyBy(prev, '_id')
      // console.log(extendedpurchaseInCartObj)
      return (
        purchaseInCart?.map((purchase) => {
          const isChosenPurchaseId = purchase._id === chosenPurchaseId
          return {
            ...purchase,
            checked: isChosenPurchaseId || Boolean(extendedpurchaseInCartObj[purchase._id]?.checked),
            disable: false
          }
        }) || []
      )
    })
  }, [purchaseInCart, chosenPurchaseId])
  useEffect(() => {
    return () => {
      history.replaceState(null, '')
    }
  }, [])
  // console.log(extendedPurchases)

  //dùng immer
  const handleCheck = (purchaseIndex: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setExtendedPurchases(
      produce((draft) => {
        //draft ở đây đại diện cho extendedPurchase prev
        draft[purchaseIndex].checked = e.target.checked
      })
    )
  }
  const handleCheckAll = () => {
    setExtendedPurchases((prev) =>
      prev.map((purchase) => ({
        ...purchase,
        checked: !isAllChecked
      }))
    )
  }

  const handleTypeQuantity = (purchaseIndex: number) => (value: number) => {
    setExtendedPurchases(
      produce((draft) => {
        //draft ở đây đại diện cho extendedPurchase prev
        draft[purchaseIndex].buy_count = value
      })
    )
  }

  const handleQuantity = (purchaseIndex: number, value: number, enable: boolean) => {
    // console.log('value: ', value, enable)
    // console.log('bug: ', value, extendedPurchases[purchaseIndex].buy_count)
    if (enable) {
      const purchase = (extendedPurchases as Purchase[])[purchaseIndex]
      if (value === purchase.buy_count) return
      setExtendedPurchases(
        produce((draft) => {
          draft[purchaseIndex].disable = true
        })
      )
      upadtePurchaseMutation.mutate({ product_id: purchase.product._id, buy_count: value })
    }
  }

  const handleDelete = (purchaseIndex: number) => () => {
    const purchaseId = extendedPurchases[purchaseIndex]._id
    deletePurchaseMutation.mutate([purchaseId])
  }
  const handleDeleteManyPurchases = () => {
    const purchaseIds = checkedPurchases.map((purchase) => purchase._id)
    deletePurchaseMutation.mutate(purchaseIds)
  }

  const handleBuyPurchase = () => {
    if (checkedPurchases.length > 0) {
      console.log(checkedPurchases)
      const body = checkedPurchases.map((purchase) => ({
        product_id: purchase.product._id,
        buy_count: purchase.buy_count
      }))
      buyPurchaseMutation.mutate(body)
    }
  }
  return (
    <div className='bg-gray-100 py-6'>
      <div className='container'>
        {extendedPurchases.length > 0 ? (
          <>
            <div className='overflow-auto'>
              <div className='min-w-[1000px]'>
                <div className='grid grid-cols-12 border-b-2 bg-white px-8 py-4'>
                  <div className='col-span-6'>
                    <div className='flex items-center'>
                      <input
                        type='checkbox'
                        className='mr-4 h-4 w-4 accent-orange_main'
                        checked={isAllChecked}
                        onChange={handleCheckAll}
                      />
                      <span className='text-sm capitalize text-black'>Sản phẩm</span>
                    </div>
                  </div>
                  <div className='col-span-6'>
                    <div className='grid grid-cols-6 text-sm capitalize text-gray-500'>
                      <div className='col-span-2 text-center'>
                        <span>Đơn giá</span>
                      </div>
                      <div className='col-span-2 text-center'>
                        <span>số lượng</span>
                      </div>
                      <div className='col-span-1 text-center'>
                        <span>số tiền</span>
                      </div>
                      <div className='col-span-1 text-center'>
                        <span>thao tác</span>
                      </div>
                    </div>
                  </div>
                </div>
                {extendedPurchases?.map((purchase, index) => (
                  <div className='grid grid-cols-12 border bg-white px-8 py-4' key={purchase._id}>
                    <div className='col-span-6'>
                      <div className='grid grid-cols-6'>
                        <div className='col-span-4 flex'>
                          <div className='flex items-center justify-center'>
                            <input
                              type='checkbox'
                              className='mr-4 h-4 w-4 accent-orange_main'
                              checked={purchase.checked}
                              onChange={handleCheck(index)}
                            />
                          </div>
                          <div className='flex'>
                            <img src={purchase.product.image} alt={purchase.product.name} className='mr-3 h-20 w-20' />
                            <div className='overflow-hidden pt-1'>
                              <span className='line-clamp-2 text-sm'>{purchase.product.name}</span>
                            </div>
                          </div>
                        </div>
                        <div className='col-span-2 flex items-center justify-center text-center text-sm text-gray-500'>
                          {purchase.product.category.name}
                        </div>
                      </div>
                    </div>
                    <div className='col-span-6 flex items-center'>
                      <div className='grid w-full grid-cols-6 items-center text-sm text-gray-500'>
                        <div className='col-span-2 flex justify-center'>
                          <div className='flex justify-center'>
                            <span className='mr-3 line-through'>
                              {forrmatCurrency(purchase.price_before_discount)}₫
                            </span>
                            <span className='text-black'>{forrmatCurrency(purchase.price)}₫</span>
                          </div>
                        </div>
                        <div className='col-span-2 text-center'>
                          <QuantityController
                            max={purchase.product.quantity}
                            value={purchase.buy_count}
                            classNameWrapper='ml-0 justify-center'
                            onIncrease={(value) => handleQuantity(index, value, value <= purchase.product.quantity)}
                            onDecrease={(value) => handleQuantity(index, value, value >= 1)}
                            onType={handleTypeQuantity(index)}
                            onFocusOut={(value) =>
                              handleQuantity(index, value, value >= 1 && value <= purchase.product.quantity)
                            }
                            disabled={purchase.disable}
                          />
                        </div>
                        <div className='col-span-1 text-center text-orange_main'>
                          {forrmatCurrency(purchase.price * purchase.buy_count)}₫
                        </div>
                        <div className='col-span-1 text-center'>
                          <button
                            className='bg-none text-sm text-black transition-colors hover:text-orange_main'
                            onClick={handleDelete(index)}
                          >
                            Xoá
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className='sticky bottom-0 flex flex-col items-end justify-start bg-white px-6 py-4 md:flex-row md:items-center md:justify-between'>
              <div className='flex items-center'>
                <div className='flex items-center justify-center'>
                  <input
                    type='checkbox'
                    className='h-4 w-4 accent-orange_main'
                    checked={isAllChecked}
                    onChange={handleCheckAll}
                  />
                  <button className='text-md ml-4 capitalize' onClick={handleCheckAll}>
                    chọn tất cả ({extendedPurchases.length})
                  </button>
                </div>
                <button className='text-md px-4' onClick={handleDeleteManyPurchases}>
                  Xoá
                </button>
              </div>
              <div className='flex flex-col items-end md:flex-row md:items-center'>
                <div>
                  <div className='flex items-center'>
                    <div className='text-md'>Tổng cộng ({checkedPurchasesCount} sản phẩm): </div>
                    <span className='ml-3 text-2xl text-orange_main'>
                      {forrmatCurrency(totalCheckedPurchasesPrice)}₫
                    </span>
                  </div>
                  <div className='flex items-center justify-end gap-3 text-sm'>
                    <span>Tiết kiệm:</span>
                    <span className='text-orange_main'>{forrmatCurrency(totalCheckedPurchasesSavingPrice)}₫</span>
                  </div>
                </div>
                <Button
                  onClick={handleBuyPurchase}
                  disabled={buyPurchaseMutation.isPending}
                  isLoading={buyPurchaseMutation.isPending}
                  className='ml-3 flex h-12 w-44 items-center justify-center gap-1 bg-orange_main text-sm uppercase text-white hover:bg-orange-600'
                >
                  Mua hàng
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className='text-center'>
            <div className='mx-auto flex h-[380px] w-[380px] flex-col items-center justify-center p-3'>
              <img
                src='	https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/assets/12fe8880616de161.png'
                alt='Không có sản phẩm'
                className='h-24 w-24'
              />
              <span className='my-5 text-sm font-bold capitalize text-gray-500'>Giỏ hàng của bạn còn trống</span>
              <Link to={path.home} className='rounded-sm bg-orange_main px-10 py-3 text-white hover:opacity-90'>
                Mua ngay
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
