import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import authApi from 'src/api/auth.api'
import Button from 'src/components/Button'
import Input from 'src/components/Input'
import { AppContext } from 'src/Contexts/app.context'
import type { ErrorResponse } from 'src/types/utils.type'
import { schema, type Schema } from 'src/utils/rules'
import { isAxiosUnprocessableEntityError } from 'src/utils/utils'

// type FormLogin = Omit<Schema, 'confirm_password'>
// const schemaLogin = schema.omit(['confirm_password'])

type FormLogin = Pick<Schema, 'email' | 'password'>
const schemaLogin = schema.pick(['email', 'password'])
export default function Login() {
  const navigate = useNavigate()
  const { setIsAuthenticated, setProfile } = useContext(AppContext)
  const {
    register,
    handleSubmit,
    setError,
    // setError,
    formState: { errors }
  } = useForm<FormLogin>({
    resolver: yupResolver(schemaLogin)
  })
  const loginAccountMutation = useMutation({
    mutationFn: (body: FormLogin) => authApi.loginAccount(body)
  })
  const onSubmit = handleSubmit((data) => {
    loginAccountMutation.mutate(data, {
      onSuccess: (data) => {
        setIsAuthenticated(true)
        setProfile(data.data.data.user)
        navigate('/')
      },
      onError: (errors) => {
        console.log(errors)
        if (isAxiosUnprocessableEntityError<ErrorResponse<FormLogin>>(errors)) {
          const formError = errors.response?.data.data
          if (formError) {
            Object.keys(formError).forEach((key) => {
              setError(key as keyof FormLogin, {
                message: formError[key as keyof FormLogin],
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
            <form className='rounded bg-white p-10 shadow-sm' onSubmit={onSubmit}>
              <div className='text-2xl'>Đăng Nhập</div>
              <Input
                type='email'
                name='email'
                placeholder='Email'
                className='mt-8'
                register={register}
                errorMessage={errors.email?.message}
              />
              <Input
                type='password'
                name='password'
                placeholder='Password'
                register={register}
                errorMessage={errors.password?.message}
              />
              <div className='flex items-center justify-center gap-1 text-sm'>
                <span className='text-slate-400'>Bạn chưa có tài khoản?</span>
                <Link to='/register' className='text-orange_main'>
                  Đăng ký
                </Link>
              </div>
              <div className='mt-2'>
                <Button
                  className='flex w-full items-center justify-center gap-1 bg-orange_main px-2 py-3 text-sm uppercase text-white hover:bg-orange-600'
                  type='submit'
                  isLoading={loginAccountMutation.isPending}
                  disabled={loginAccountMutation.isPending}
                >
                  Đăng Nhập
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
