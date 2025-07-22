import { withControl } from '@/utils/hocs/withControl'
import { withLabel } from '@/utils/hocs/withLabel'
import { Labelable } from '@/utils/interfaces'
import { useState } from 'react'
import DatePicker, { DatePickerProps } from 'react-native-date-picker'

interface OurDatePickerProps extends Labelable, Partial<DatePickerProps> { }
function OurDatePicker({ ...props }: Readonly<OurDatePickerProps>) {
    const [date, setDate] = useState<Date>(props.date ?? new Date())

    function handleChange(newDate: Date) {
        setDate(newDate)
        if (props.onDateChange) props.onDateChange(newDate)
    }

    return (
        <DatePicker locale='es' {...props} date={date} onDateChange={handleChange} />
    )
}

export default withControl(withLabel(OurDatePicker))
