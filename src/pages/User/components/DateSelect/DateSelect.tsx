import { range } from 'lodash'
import { useState } from 'react'

interface Props {
  onChange?: (value: Date) => void
  value?: Date
  errorMessage?: string
}

export default function DateSelect({ onChange, value, errorMessage }: Props) {
  const [date, setDate] = useState({
    date: value?.getDate() || 1,
    month: value?.getMonth() || 0,
    year: value?.getFullYear() || 1990
  })

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target
    const newDate = {
      ...date,
      [name]: value
    }
    setDate(newDate)
    if (onChange) {
      onChange(new Date(newDate.year, newDate.month, newDate.date))
    }
  }
  return (
    <div>
      <div className='flex flex-col xl:flex-row'>
        <div className='w-full truncate pt-3 capitalize xl:w-[20%] xl:text-right'>Năm sinh</div>
        <div className='w-full xl:w-[80%] xl:pl-5'>
          <div className='flex justify-between'>
            <select
              value={value?.getDate() || date?.date}
              name='date'
              onChange={handleChange}
              className='w-[32%] rounded-sm border border-gray-300 px-3 py-2 outline-none hover:cursor-pointer hover:border-orange_main focus:border-gray-500'
            >
              <option value='' disabled>
                Ngày
              </option>
              {range(1, 32).map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
            <select
              value={value?.getMonth() || date?.month}
              name='month'
              onChange={handleChange}
              className='w-[32%] rounded-sm border border-gray-300 px-3 py-2 outline-none hover:border-orange_main focus:border-gray-500'
            >
              <option value='' disabled>
                Tháng
              </option>
              {range(0, 12).map((item) => (
                <option key={item} value={item}>
                  {item + 1}
                </option>
              ))}
            </select>
            <select
              value={value?.getFullYear() || date.year}
              name='year'
              onChange={handleChange}
              className='w-[32%] rounded-sm border border-gray-300 px-3 py-2 outline-none hover:border-orange_main focus:border-gray-500'
            >
              <option value='' disabled>
                Năm
              </option>
              {range(1990, new Date().getFullYear() + 1).map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
          <div className='min-h-[1.5rem] text-sm text-red-600'>{errorMessage}</div>
        </div>
      </div>
    </div>
  )
}
