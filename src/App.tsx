import {useState} from 'react';
import {generateDate} from 'utils'
import classNames from 'classnames'
import dayjs from "dayjs";
import {GrFormNext, GrFormPrevious} from 'react-icons/gr'

function App() {
  const [today, setToday] = useState<dayjs.Dayjs>(() => dayjs())
  const [selectedDate, selectDate] = useState<dayjs.Dayjs | null>(today)

  const days = ["S", 'M', 'T', 'W', 'T', 'F', 'S']

  return (
    <div className='flex text-sm gap-10 h-screen justify-center items-center divide-x-2  font-mono'>
      <div className='w-96 border-x'>
        <div className='flex justify-between'>
          <h1 className='font-bold'>
            {today.format('MMMM, YYYY')}
          </h1>
          <div className='flex items-center gap-5'>
            <GrFormPrevious
              className='w-5 h-5 cursor-pointer rounded-full hover:bg-black hover:text-white transition-colors'
              onClick={() => {
                setToday(today.month(today.month() - 1))
              }}
            />
            <h1
              className='cursor-pointer hover:bg-black hover:text-white rounded-md px-2 transition-colors'
              onClick={() => {
                setToday(dayjs())
              }}
            >
              Today
            </h1>
            <GrFormNext
              className='w-5 h-5 cursor-pointer rounded-full hover:bg-black hover:text-white transition-colors'
              onClick={() => {
                setToday(today.month(today.month() + 1))
              }}
            />
          </div>
        </div>
        <div className="border-b border-t grid grid-cols-7 h-14 text-gray-500">
          {days.map((day, index) => (
            <h1
              key={index}
              className='grid place-content-center'
            >
              {day}
            </h1>
          ))}
        </div>
        <div className="grid grid-cols-7">
          {generateDate(today.month(), today.year()).map(({date, currentMonth, today}, index) => {
            return (
              <div
                key={index}
                className='h-14 border-b grid place-content-center'
              >
                <h1
                  onClick={() => {
                    selectDate(
                      date.isSame(selectedDate) ? null : date
                    )
                  }}
                  className={classNames('h-10 w-10 grid place-content-center rounded-full hover:bg-black hover:text-white cursor-pointer transition-colors', {
                    'text-gray-400': !currentMonth,
                    'bg-red-600 text-white': today,
                    'bg-black text-white': date.isSame(selectedDate)
                  })}
                >
                  {date.date()}
                </h1>
              </div>
            )
          })}
        </div>
      </div>
      <div className='h-96 px-5'>
        <h1 className='font-semibold'>
          Schedule for {(selectedDate || today).toDate().toDateString()}
        </h1>
        <p>No meetings for today</p>
      </div>
    </div>
  );
}

export default App;
