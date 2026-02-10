import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { omit } from 'lodash'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import authApi from 'src/api/auth.api'
import Input from 'src/components/Input'
import { AppContext } from 'src/Contexts/app.context'
import type { ErrorResponse } from 'src/types/utils.type'
import { schema, type Schema } from 'src/utils/rules'
import { isAxiosUnprocessableEntityError } from 'src/utils/utils'

// export interface formDataRegister {
//   email: string
//   password: string
//   confirm_password: string
// }
// type formDataRegister = Schema
type formDataRegister = Pick<Schema, 'email' | 'password' | 'confirm_password'>
const schemaRegister = schema.pick(['email', 'password', 'confirm_password'])
export default function Register() {
  const navigate = useNavigate()
  const { setIsAuthenticated, setProfile } = useContext(AppContext)
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<formDataRegister>({
    resolver: yupResolver(schemaRegister)
  })
  const registerAccountMutation = useMutation({
    mutationFn: (body: Omit<formDataRegister, 'confirm_password'>) => authApi.registerAccount(body)
  })
  const onSubmit = handleSubmit((data) => {
    const body = omit(data, ['confirm_password'])
    registerAccountMutation.mutate(body, {
      onSuccess: (data) => {
        setIsAuthenticated(true)
        setProfile(data.data.data.user)
        navigate('/')
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntityError<ErrorResponse<Omit<formDataRegister, 'confirm_password'>>>(error)) {
          const formError = error.response?.data.data
          if (formError) {
            Object.keys(formError).forEach((key) => {
              setError(key as keyof Omit<formDataRegister, 'confirm_password'>, {
                message: formError[key as keyof Omit<formDataRegister, 'confirm_password'>],
                type: 'Server'
              })
            })
          }
        }
      }
    })
  })

  return (
    <div className='bg-orange_main'>
      <div className='mx-auto max-w-5xl px-4'>
        <div className='lg:pr-18 grid grid-cols-1 py-12 lg:grid-cols-5 lg:py-32'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form className='rounded bg-white p-10 shadow-sm' onSubmit={onSubmit} noValidate>
              <div className='text-2xl'> Đăng Ký </div>
              <Input
                name='email'
                type='email'
                placeholder='Password'
                className='mt-8'
                errorMessage={errors.email?.message}
                register={register}
              />
              <Input
                name='password'
                type='password'
                placeholder='Password'
                errorMessage={errors.password?.message}
                register={register}
              />
              <Input
                name='confirm_password'
                type='password'
                placeholder='Password'
                errorMessage={errors.confirm_password?.message}
                register={register}
              />
              <div className='flex items-center justify-center gap-1 text-sm'>
                <span className='text-slate-400'>Bạn đã có tài khoản?</span>
                <Link to='/login' className='text-orange_main'>
                  Đăng nhập
                </Link>
              </div>
              <div className='mt-2'>
                <button className='w-full bg-orange_main px-2 py-3 text-center text-sm uppercase text-white hover:bg-orange-600'>
                  Đăng Ký
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
