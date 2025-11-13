import { withControl } from '@/utils/hocs/withControl'
import { withLabel } from '@/utils/hocs/withLabel'
import { Labelable } from '@/utils/interfaces'
import { useState } from 'react'
import { View } from 'react-native'
import DatePicker, { DatePickerProps } from 'react-native-date-picker'

interface OurDatePickerProps extends Labelable, Partial<DatePickerProps> {}
function OurDatePicker({ ...props }: Readonly<OurDatePickerProps>) {
	const [date, setDate] = useState<Date>(props.date ?? new Date())

	function handleChange(newDate: Date) {
		setDate(newDate)
		if (props.onDateChange) props.onDateChange(newDate)
	}

	return (
		<View
			style={{
				alignItems: 'center',
				justifyContent: 'center',
				borderRadius: 12,
				backgroundColor: 'rgba(128,128,128,0.1)',
				paddingVertical: 8
			}}
		>
			<DatePicker
				locale="es"
				{...props}
				date={date}
				onDateChange={handleChange}
				style={{ alignSelf: 'center', maxWidth: 280 }}
			/>
		</View>
	)
}

export default withControl(withLabel(OurDatePicker))
