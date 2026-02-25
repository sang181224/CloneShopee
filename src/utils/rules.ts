// import type { RegisterOptions, UseFormGetValues } from 'react-hook-form'
import * as yup from 'yup'
// import type { formDataRegister } from 'src/pages/Register/Register'

// type Rules = { [key in keyof formDataRegister]?: RegisterOptions<formDataRegister, key> }
// export const getRules = (getValues?: UseFormGetValues<formDataRegister>): Rules => ({
//   email: {
//     required: {
//       value: true,
//       message: 'Email là bắt buộc'
//     },
//     pattern: {
//       value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
//       message: 'Email không đúng định dạng'
//     },
//     minLength: {
//       value: 6,
//       message: 'Email phải từ 6 - 160 ký tự'
//     },
//     maxLength: {
//       value: 160,
//       message: 'Email phải từ 6 - 160 ký tự'
//     }
//   },
//   password: {
//     required: {
//       value: true,
//       message: 'Mật khẩu không được để trống'
//     },
//     minLength: {
//       value: 6,
//       message: 'Mật khẩu phải từ 6 - 160 ký tự'
//     },
//     maxLength: {
//       value: 160,
//       message: 'Mật khẩu phải từ 6 - 160 ký tự'
//     }
//   },
//   confirm_password: {
//     required: {
//       value: true,
//       message: 'Mật khẩu xác nhận không được để trống'
//     },
//     maxLength: {
//       value: 160,
//       message: 'Mật khẩu phải từ 6 - 160 ký tự'
//     },
//     minLength: {
//       value: 6,
//       message: 'Mật khẩu phải từ 6 - 160 ký tự'
//     },
//     validate:
//       typeof getValues === 'function'
//         ? (value) => value === getValues('password') || 'Nhập lại password không khớp'
//         : undefined
//   }
// })
function testPriceMinMax(this: yup.TestContext<yup.AnyObject>) {
  const { price_min, price_max } = this.parent
  if (price_min === '' || price_max === '') {
    return true
  }
  return Number(price_max) >= Number(price_min)
}
export const schema = yup.object({
  email: yup
    .string()
    .required('Email là bẳt buộc')
    .email('Email không đúng định dạng')
    .min(5, 'Độ dài phải từ 5 - 160 ký tự')
    .max(160, 'Độ dài phải từ 5 - 160 ký tự'),
  password: yup
    .string()
    .required('Password là bẳt buộc')
    .min(6, 'Độ dài phải từ 5 - 160 ký tự')
    .max(160, 'Độ dài phải từ 5 - 160 ký tự'),
  confirm_password: yup
    .string()
    .required('Nhập lại password là bẳt buộc')
    .min(6, 'Độ dài phải từ 5 - 160 ký tự')
    .max(160, 'Độ dài phải từ 5 - 160 ký tự')
    .oneOf([yup.ref('password')], 'Nhập lại password không khớp'),
  price_min: yup.string().default('').test({
    name: 'price-not-allowed',
    message: 'Giá cả không phù hợp',
    test: testPriceMinMax
  }),
  price_max: yup.string().default('').test({
    name: 'price-not-allowed',
    message: 'Giá cả không phù hợp',
    test: testPriceMinMax
  }),
  name: yup.string().trim().required('Không được để trống')
})

export const userSchema = yup.object({
  name: yup.string().max(160, 'Độ dài tối đa là 160 ký tự'),
  phone: yup.string().max(20, 'Độ dài tối đa là 20 ký tự'),
  address: yup.string().max(160, 'Độ dài tối đa là 160 ký tự'),
  avatar: yup.string().max(1000, 'Độ dài tối đa là 1000 ký tự'),
  day_of_birth: yup.date().max(new Date(), 'Vui lòng chọn một ngày trong quá khứ'),
  password: schema.fields['password'],
  new_password: schema.fields['password'],
  confirm_password: schema.fields['confirm_password']
})

export type Schema = yup.InferType<typeof schema>
export type UserSchema = yup.InferType<typeof userSchema>
