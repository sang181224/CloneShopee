import { Link } from 'react-router-dom'
import Popover from '../Popover'
import { useContext } from 'react'
import { AppContext } from 'src/Contexts/app.context'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import authApi from 'src/api/auth.api'
import { purchasesStatus } from 'src/constants/purchase'
import path from 'src/constants/path'

export default function NavHeader() {
  const { setIsAuthenticated, isAuthenticate, setProfile, profile } = useContext(AppContext)
  const queryClient = useQueryClient()
  const logoutMutation = useMutation({
    mutationFn: () => authApi.logout(),
    onSuccess: () => {
      setIsAuthenticated(false)
      setProfile(null)
      queryClient.removeQueries({ queryKey: ['purchaseInCart', { status: purchasesStatus.inCart }] })
    }
  })
  const handleLogout = () => {
    logoutMutation.mutate()
  }
  return (
    <div className='flex justify-end text-sm sm:justify-between'>
      <div className='hidden items-center gap-3 sm:flex'>
        <Link to='/' className='text-sm capitalize hover:text-white/70'>
          Kênh người bán
        </Link>
        <div className='h-4 border-r-[1px] border-r-white/30'></div>
        <Link to='/' className='text-sm capitalize hover:text-white/70'>
          Tải ứng dụng
        </Link>
      </div>
      <div className='flex gap-5 text-sm'>
        <Popover
          as={'span'}
          offsetValue={7}
          // initalOpen={true}
          className='flex cursor-pointer items-center gap-2 py-1 hover:text-gray-300'
          renderPopover={
            <div className='flex cursor-pointer flex-col gap-3 rounded-sm bg-white py-3 pl-3 pr-16 text-sm text-black shadow-sm'>
              <span className='hover:text-orange_main'>Tiếng Việt</span>
              <span className='hover:text-orange_main'>English</span>
            </div>
          }
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth='1.5'
            stroke='currentColor'
            className='h-5 w-5'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418'
            />
          </svg>
          <span>Tiếng Việt</span>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth='1.5'
            stroke='currentColor'
            className='h-5 w-5'
          >
            <path strokeLinecap='round' strokeLinejoin='round' d='m19.5 8.25-7.5 7.5-7.5-7.5' />
          </svg>
        </Popover>
        {isAuthenticate && (
          <Popover
            className='flex cursor-pointer items-center gap-2 py-1 hover:text-gray-300'
            offsetValue={7}
            renderPopover={
              <div className='flex cursor-pointer flex-col items-start gap-3 rounded-sm bg-white px-5 py-3 text-sm text-black shadow-sm'>
                <Link to={path.profile} className='hover:text-cyan-400'>
                  Tài Khoản Của Tôi
                </Link>
                <Link to={'/donmua'} className='hover:text-cyan-400'>
                  Đơn Mua
                </Link>
                <button className='hover:text-cyan-400' onClick={handleLogout}>
                  Đăng Xuất
                </button>
              </div>
            }
          >
            <div className='ml-2 h-5 w-5 flex-shrink-0'>
              <img
                src='https://i.imgur.com/7GIbjb1.png'
                alt='avatar'
                className='h-full w-full rounded-full object-cover'
              />
            </div>
            <span>{profile?.email}</span>
          </Popover>
        )}
        {!isAuthenticate && (
          <div className='flex items-center gap-3'>
            <Link to={path.register} className='capitalize hover:text-white/70'>
              Đăng ký
            </Link>
            <div className='h-4 border-r-[1px] border-r-white/30'></div>
            <Link to={path.login} className='capitalize hover:text-white/70'>
              Đăng nhập
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
