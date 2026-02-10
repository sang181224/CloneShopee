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
export type Schema = yup.InferType<typeof schema>
