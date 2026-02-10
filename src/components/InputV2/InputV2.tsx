import { useController, type FieldPath, type FieldValues, type UseControllerProps } from 'react-hook-form'

export interface InputNumberProps extends React.InputHTMLAttributes<HTMLInputElement> {
  classNameInput?: string
  classNameError?: string
}

function InputV2<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(props: UseControllerProps<TFieldValues, TName> & InputNumberProps) {
  const {
    type,
    onChange,
    className,
    classNameInput = 'p-2 w-full outline-none border text-sm border-gray-300 focus:border-gray-500 focus:shadow-sm',
    classNameError = ' text-red-600 min-h-[1.5rem] text-sm',
    ...rest
  } = props
  const { field, fieldState } = useController(props)
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const valueFromInput = event.target.value
    // console.log(valueFromInput)
    const numberCondition = type === 'number' && (/^\d+$/.test(valueFromInput) || valueFromInput === '')
    if (numberCondition || type !== 'number') {
      field.onChange(event)
      if (onChange) onChange(event)
    }
  }
  return (
    <div className={className}>
      <input className={classNameInput} {...rest} {...field} onChange={handleChange} value={field.value || ''} />
      <div className={classNameError}>{fieldState.error?.message}</div>
    </div>
  )
}
export default InputV2
