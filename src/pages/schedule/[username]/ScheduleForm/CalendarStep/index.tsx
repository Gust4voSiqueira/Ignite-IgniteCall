import { Calendar } from '@/components/Calendar'
import {
  CloseTab,
  Container,
  LoadingContainer,
  TimePicker,
  TimePickerHeader,
  TimePickerItem,
  TimePickerList,
} from './styles'
import { useState } from 'react'
import dayjs from 'dayjs'
import { api } from '@/lib/axios'
import { useRouter } from 'next/router'
import { useQuery } from '@tanstack/react-query'
import { X } from 'phosphor-react'
import { Loading } from '@/components/Loading'

interface Availability {
  possibleTimes: number[]
  availabilityTimes: number[]
}

interface CalendarStepProps {
  onSelectDateTime: (date: Date) => void
}

export function CalendarStep({ onSelectDateTime }: CalendarStepProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const isDateSelected = !!selectedDate

  const router = useRouter()
  const username = String(router.query.username)

  const weekDay = selectedDate ? dayjs(selectedDate).format('dddd') : null
  const describedDate = selectedDate
    ? dayjs(selectedDate).format('DD[ de ]MMMM')
    : null

  const selectedDateWithoutTime = selectedDate
    ? dayjs(selectedDate).format('YYYY-MM-DD')
    : null

  const { data: availability } = useQuery<Availability>(
    ['availability', selectedDateWithoutTime],
    async () => {
      const response = await api.get(`/users/${username}/availability`, {
        params: {
          date: selectedDateWithoutTime,
        },
      })

      return response.data
    },
    {
      enabled: !!selectedDate,
    },
  )

  function handleSelectTime(hour: number) {
    const dateWithTime = dayjs(selectedDate)
      .set('hour', hour)
      .startOf('hour')
      .toDate()

    onSelectDateTime(dateWithTime)
  }

  function onClearSelectedDate() {
    setSelectedDate(null)
  }

  return (
    <Container isTimePickerOpen={isDateSelected}>
      <Calendar onDateSelected={setSelectedDate} />

      {isDateSelected && (
        <>
          {/* <TimePicker>
            <TimePickerHeader>
              {weekDay}, <span>{describedDate}</span>
            </TimePickerHeader>

            <CloseTab onClick={onClearSelectedDate}>
              <X size={20} />
            </CloseTab>

            <LoadingContainer>
              <Loading width="48px" height="48px" />
            </LoadingContainer>
          </TimePicker> */}

          <TimePicker>
            <TimePickerHeader>
              {weekDay}, <span>{describedDate}</span>
            </TimePickerHeader>

            <TimePickerList>
              <CloseTab onClick={onClearSelectedDate}>
                <X size={20} />
              </CloseTab>

              {!availability && (
                <LoadingContainer>
                  <Loading width="48px" height="48px" />
                </LoadingContainer>
              )}

              {availability?.possibleTimes.map((hour) => {
                return (
                  <TimePickerItem
                    key={hour}
                    disabled={!availability.availabilityTimes.includes(hour)}
                    onClick={() => handleSelectTime(hour)}
                  >
                    {String(hour).padStart(2, '0')}:00h
                  </TimePickerItem>
                )
              })}
            </TimePickerList>
          </TimePicker>
        </>
      )}
    </Container>
  )
}
