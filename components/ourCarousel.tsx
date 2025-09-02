import { colors } from '@/assets/colors/styles'
import { mergeStyles } from '@/utils/styles'
import { useRef } from 'react'
import { Dimensions, StyleProp, View, ViewStyle } from 'react-native'
import { useSharedValue } from 'react-native-reanimated'
import Carousel, {
	ICarouselInstance,
	Pagination,
	TCarouselProps
} from 'react-native-reanimated-carousel'
import { BasicProps } from 'react-native-reanimated-carousel/lib/typescript/components/Pagination/Basic'

const width = Dimensions.get('window').width

interface OurCarouselProps {
	paginationProps?: BasicProps<any>
	baseStyle?: StyleProp<ViewStyle>
}
function OurCarousel({
	paginationProps,
	data,
	baseStyle,
	...props
}: Readonly<OurCarouselProps & TCarouselProps>) {
	const ref = useRef<ICarouselInstance>(null)
	const progress = useSharedValue<number>(0)

	const onPressPagination = (index: number) => {
		ref.current?.scrollTo({
			count: index - progress.value,
			animated: true
		})
	}
	if (!data || data.length === 0) return null

	// Caso especial: solo 1 item
	if (data.length === 1) {
		const animationValue = useSharedValue(0)
		return (
			<View style={baseStyle}>
				{props.renderItem({ item: data[0], index: 0, animationValue })}
			</View>
		)
	}
	return (
		<View style={baseStyle}>
			<Carousel
				ref={ref}
				loop={false}
				width={width}
				{...props}
				data={data}
				onProgressChange={progress}
			/>

			<Pagination.Basic
				progress={progress}
				data={data}
				{...paginationProps}
				containerStyle={mergeStyles(
					{ gap: 5 },
					paginationProps?.containerStyle
				)}
				onPress={(index) => {
					onPressPagination(index)
					if (paginationProps?.onPress) paginationProps.onPress(index)
				}}
				dotStyle={mergeStyles(
					{ backgroundColor: 'gray', borderRadius: 50 },
					paginationProps?.dotStyle
				)}
				activeDotStyle={mergeStyles(
					{ backgroundColor: colors.primary.naranja },
					paginationProps?.activeDotStyle
				)}
			/>
		</View>
	)
}

export default OurCarousel
