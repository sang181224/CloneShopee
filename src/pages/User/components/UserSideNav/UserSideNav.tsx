import { useContext } from 'react'
import { Link } from 'react-router-dom'
import path from 'src/constants/path'
import { AppContext } from 'src/Contexts/app.context'
import userDefaultSVG from 'src/assets/images/userdefault.svg'

export default function UserSideNav() {
  const { profile } = useContext(AppContext)
  return (
    <div>
      <div className='flex items-center border-b border-gray-200 py-4'>
        <Link to={path.profile} className='h-12 w-12 flex-shrink-0 overflow-hidden rounded-full border border-black/10'>
          <img
            alt='avatar'
            className='h-full w-full rounded-full object-cover'
            src={profile?.avatar || userDefaultSVG}
          />
        </Link>
        <div className='flex-grow overflow-hidden pl-4'>
          <div className='mb-2 truncate font-semibold text-black'>{profile?.email}</div>
          <Link to={path.profile} className='flex items-center capitalize text-gray-500'>
            <svg
              width={12}
              height={12}
              viewBox='0 0 12 12'
              xmlns='http://www.w3.org/2000/svg'
              style={{ marginRight: 4 }}
            >
              <path
                d='M8.54 0L6.987 1.56l3.46 3.48L12 3.48M0 8.52l.073 3.428L3.46 12l6.21-6.18-3.46-3.48'
                fill='#9B9B9B'
                fillRule='evenodd'
              />
            </svg>
            Sửa hồ sơ
          </Link>
        </div>
      </div>
      <div className='mt-8'>
        <Link to={path.profile} className='flex items-center capitalize text-orange_main transition-colors'>
          <div className='mr-3 h-[20px] w-[20px]'>
            <img
              src='https://down-vn.img.susercontent.com/file/ba61750a46794d8847c3f463c5e71cc4'
              className='h-full w-full'
              alt=''
            />
          </div>
          <span>tài khoản của tôi</span>
        </Link>
        <Link to={path.ChangePassword} className='mt-4 flex items-center capitalize text-gray-700 transition-colors'>
          <div className='mr-3 h-[20px] w-[20px]'>
            <img
              src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8AAlHm5z3ZkszmgUFRnL-7LyUIyu9VgKR-Q&s'
              className='h-full w-full'
              alt=''
            />
          </div>
          <span>Đổi mật khẩu</span>
        </Link>
        <Link to={path.HistoryPurchase} className='mt-4 flex items-center capitalize text-gray-700 transition-colors'>
          <div className='mr-3 h-[20px] w-[20px]'>
            <img
              src='https://down-vn.img.susercontent.com/file/f0049e9df4e536bc3e7f140d071e9078'
              className='h-full w-full'
              alt=''
            />
          </div>
          <span>Đơn mua</span>
        </Link>
      </div>
    </div>
  )
}
