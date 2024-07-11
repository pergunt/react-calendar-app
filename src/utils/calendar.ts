import dayjs, {Dayjs} from 'dayjs'

export const generateDate = (month = dayjs().month(), year = dayjs().year()) => {
  const firstDateOfMonth = dayjs().year(year).month(month).startOf('month')
  const lastDateOfMonth = dayjs().year(year).month(month).endOf('month')

  const datesArray: {
    currentMonth: boolean;
    today?: boolean;
    date: Dayjs;
  }[] = []

  // prefix dates
  for (let i = 0; i < firstDateOfMonth.day(); i++) {
    datesArray.push({
      currentMonth: false,
      date: firstDateOfMonth.day(i)
    })
  }

  const today = dayjs().startOf('day')

  // generate current date
  for (let i = firstDateOfMonth.date(); i <= lastDateOfMonth.date(); i++) {
    const date = firstDateOfMonth.date(i)

    datesArray.push({
      currentMonth: true,
      date,
      today: date.isSame(today)
    })
  }

  const remaining = 42 - datesArray.length

  // suffix dates
  for (let i = lastDateOfMonth.date() + 1; i <= lastDateOfMonth.date() + remaining; i++) {
    datesArray.push({
      currentMonth: false,
      date: lastDateOfMonth.date(i)
    })
  }

  return datesArray
}
