import Input from 'src/components/Input'

export default function Profile() {
  return (
    <div className='rounded-sm bg-white px-7 pb-20 shadow'>
      <div className='border-b border-b-gray-200 py-4'>
        <div className='text-lg font-medium capitalize text-gray-900'>hồ sơ của tôi</div>
        <div className='mt-1 text-sm text-gray-700'>Quản lý thông tin hồ sơ để bảo mật tài khoản</div>
      </div>
      <div className='mt-8 flex flex-col-reverse items-center sm:flex-row sm:items-start'>
        <form className='mt-6 w-full flex-grow sm:border-r sm:border-gray-200 sm:pr-12 md:mt-0'>
          <div className='flex flex-col xl:flex-row'>
            <div className='w-full truncate pt-3 capitalize xl:w-[20%] xl:text-right'>Email</div>
            <div className='w-full xl:w-[80%] xl:pl-5'>
              <div className='pt-3 text-gray-700'>ng*****************@gmail.com</div>
            </div>
          </div>
          <div className='mt-6 flex flex-col xl:flex-row'>
            <div className='w-full truncate pt-3 capitalize xl:w-[20%] xl:text-right'>Tên</div>
            <div className='w-full xl:w-[80%] xl:pl-5'>
              <Input
                classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500
                 focus:shadow-sm'
              />
            </div>
          </div>
          <div className='flex flex-col xl:flex-row'>
            <div className='w-full truncate pt-3 capitalize xl:w-[20%] xl:text-right'>Số điện thoại</div>
            <div className='w-full xl:w-[80%] xl:pl-5'>
              <Input
                classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500
                 focus:shadow-sm'
              />
            </div>
          </div>
          <div className='flex flex-col xl:flex-row'>
            <div className='w-full truncate pt-3 capitalize xl:w-[20%] xl:text-right'>Địa chỉ</div>
            <div className='w-full xl:w-[80%] xl:pl-5'>
              <Input
                classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500
                 focus:shadow-sm'
              />
            </div>
          </div>
          <div className='flex flex-col xl:flex-row'>
            <div className='w-full truncate pt-3 capitalize xl:w-[20%] xl:text-right'>Năm sinh</div>
            <div className='flex w-full justify-between xl:w-[80%] xl:pl-5'>
              <select className='w-[32%] rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500'>
                <option value='' selected disabled>
                  Ngày
                </option>
              </select>
              <select className='w-[32%] rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500'>
                <option value='' selected disabled>
                  Tháng
                </option>
              </select>
              <select className='w-[32%] rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500'>
                <option value='' selected disabled>
                  Năm
                </option>
              </select>
            </div>
          </div>
        </form>
        <div className='flex w-full flex-shrink-0 flex-col items-center justify-center sm:w-72 sm:border-l sm:border-gray-200'>
          <div className='h-24 w-24 rounded-full border border-black/10'>
            <img
              alt='avatar'
              className='h-full w-full rounded-full object-cover'
              src='https://i.imgur.com/7GIbjb1.png'
            />
          </div>
          <input className='hidden' type='file' accept='.jpg,.jpeg,.png' />
          <button className='mt-4 flex h-10 items-center justify-center rounded-sm border border-gray-200 px-3 capitalize transition hover:border-gray-300 hover:bg-gray-50'>
            Chọn ảnh
          </button>
          <div className='mt-3 text-gray-400'>
            <div>Dụng lượng file tối đa 1 MB</div>
            <div>Định dạng:.JPEG, .PNG</div>
          </div>
        </div>
      </div>
    </div>
  )
}
