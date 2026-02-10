import InputNumber, { type InputNumberProps } from '../InputNumber'

interface Props extends InputNumberProps {
  max?: number
  onIncrease?: (value: number) => void
  onDecrease?: (value: number) => void
  onType?: (value: number) => void
  onFocusOut?: (value: number) => void
  classNameWrapper?: string
}
export default function QuantityController({
  max,
  onIncrease,
  onDecrease,
  onType,
  onFocusOut,
  classNameWrapper = 'ml-10',
  value,
  ...rest
}: Props) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let _value = Number(event.target.value)
    if (max !== undefined && _value > max) {
      _value = max
    }
    if (_value < 1) {
      _value = 1
    }
    onType?.(_value)
  }
  const increase = () => {
    let _value = Number(value) + 1
    if (max !== undefined && _value > max) {
      _value = max
    }
    onIncrease?.(_value)
  }
  const decrease = () => {
    let _value = Number(value) - 1
    if (_value < 1) {
      _value = 1
    }
    onDecrease?.(_value)
  }

  const handleOnBlur = (event: React.FocusEvent<HTMLInputElement, Element>) => {
    onFocusOut?.(Number(event.target.value))
  }
  return (
    <div>
      <div className={`${classNameWrapper} flex items-center`}>
        <button
          className='flex h-8 w-8 cursor-pointer items-center justify-center rounded-l border border-gray-300'
          onClick={decrease}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='size-6'
          >
            <path strokeLinecap='round' strokeLinejoin='round' d='M5 12h14' />
          </svg>
        </button>
        <InputNumber
          value={value}
          classNameError='hidden'
          classNameInput='text-center h-8 w-12 border-y border-gray-300 outline-none'
          onChange={handleChange}
          onBlur={handleOnBlur}
          {...rest}
        />
        <button
          className='flex h-8 w-8 cursor-pointer items-center justify-center rounded-r border border-gray-300'
          onClick={increase}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='size-6'
          >
            <path strokeLinecap='round' strokeLinejoin='round' d='M12 4.5v15m7.5-7.5h-15' />
          </svg>
        </button>
      </div>
    </div>
  )
}
