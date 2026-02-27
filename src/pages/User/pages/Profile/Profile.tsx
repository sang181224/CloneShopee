import { yupResolver } from '@hookform/resolvers/yup'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import userApi from 'src/api/user.api'
import Button from 'src/components/Button'
import Input from 'src/components/Input'
import InputNumber from 'src/components/InputNumber'
import { userSchema, type UserSchema } from 'src/utils/rules'
import DateSelect from '../../components/DateSelect'

type FormData = Pick<UserSchema, 'name' | 'address' | 'avatar' | 'phone' | 'day_of_birth'>
const profileSchema = userSchema.pick(['name', 'address', 'avatar', 'phone', 'day_of_birth'])
export default function Profile() {
  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
    setValue
    // watch,
    // setError
  } = useForm<FormData>({
    resolver: yupResolver(profileSchema)
  })
  const { data: profileData } = useQuery({
    queryKey: ['profileData'],
    queryFn: () => userApi.getProfile()
  })
  const profile = profileData?.data.data
  useEffect(() => {
    if (profile) {
      setValue('name', profile.name as string)
      setValue('address', profile.address as string)
      setValue('avatar', profile.avatar as string)
      setValue('phone', profile.phone as string)
      setValue('day_of_birth', profile.date_of_birth ? new Date(profile.date_of_birth) : new Date(1990, 0, 1))
    }
  }, [profile, setValue])
  const onSubmit = handleSubmit((data) => {})
  console.log(profile)
  return (
    <div className='rounded-sm bg-white px-7 pb-20 shadow'>
      <div className='border-b border-b-gray-200 py-4'>
        <div className='text-lg font-medium capitalize text-gray-900'>hồ sơ của tôi</div>
        <div className='mt-1 text-sm text-gray-700'>Quản lý thông tin hồ sơ để bảo mật tài khoản</div>
      </div>
      <form className='mt-8 flex flex-col-reverse items-center sm:flex-row sm:items-start' onSubmit={onSubmit}>
        <div className='mt-6 w-full flex-grow sm:border-r sm:border-gray-200 sm:pr-12 md:mt-0'>
          <div className='flex flex-col xl:flex-row'>
            <div className='w-full truncate pt-3 capitalize xl:w-[20%] xl:text-right'>Email</div>
            <div className='w-full xl:w-[80%] xl:pl-5'>
              <div className='pt-3 text-gray-700'>{profile?.email}</div>
            </div>
          </div>
          <div className='mt-6 flex flex-col xl:flex-row'>
            <div className='w-full truncate pt-3 capitalize xl:w-[20%] xl:text-right'>Tên</div>
            <div className='w-full xl:w-[80%] xl:pl-5'>
              <Input
                classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500
                 focus:shadow-sm'
                register={register}
                name='name'
                placeholder='Tên'
                errorMessage={errors.name?.message}
              />
            </div>
          </div>
          <div className='flex flex-col xl:flex-row'>
            <div className='w-full truncate pt-3 capitalize xl:w-[20%] xl:text-right'>Số điện thoại</div>
            <div className='w-full xl:w-[80%] xl:pl-5'>
              <Controller
                name='phone'
                control={control}
                render={({ field }) => (
                  <InputNumber
                    classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500
                 focus:shadow-sm'
                    placeholder='Số điện thoại'
                    errorMessage={errors.name?.message}
                    {...field}
                    onChange={field.onChange}
                  />
                )}
              />
            </div>
          </div>
          <div className='flex flex-col xl:flex-row'>
            <div className='w-full truncate pt-3 capitalize xl:w-[20%] xl:text-right'>Địa chỉ</div>
            <div className='w-full xl:w-[80%] xl:pl-5'>
              <Input
                classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500
                 focus:shadow-sm'
                register={register}
                name='address'
                placeholder='Địa chỉ'
                errorMessage={errors.name?.message}
              />
            </div>
          </div>
          <DateSelect />
          <div className='mt-6 flex flex-col xl:flex-row'>
            <div className='w-full truncate pt-3 capitalize xl:w-[20%] xl:text-right' />
            <div className='flex w-full justify-between xl:w-[80%] xl:pl-5'>
              <Button className='flex items-center justify-center rounded-sm bg-orange_main px-4 py-2 text-center text-sm text-white hover:bg-orange_main/80'>
                Lưu
              </Button>
            </div>
          </div>
        </div>
        <div className='flex w-full flex-shrink-0 flex-col items-center justify-center sm:w-72 sm:border-l sm:border-gray-200'>
          <div className='h-24 w-24 rounded-full border border-black/10'>
            <img
              alt='avatar'
              className='h-full w-full rounded-full object-cover'
              src='https://i.imgur.com/7GIbjb1.png'
            />
          </div>
          <input className='hidden' type='file' accept='.jpg,.jpeg,.png' />
          <button
            type='button'
            className='mt-4 flex h-10 items-center justify-center rounded-sm border border-gray-200 px-3 capitalize transition hover:border-gray-300 hover:bg-gray-50'
          >
            Chọn ảnh
          </button>
          <div className='mt-3 text-gray-400'>
            <div>Dụng lượng file tối đa 1 MB</div>
            <div>Định dạng:.JPEG, .PNG</div>
          </div>
        </div>
      </form>
    </div>
  )
}
