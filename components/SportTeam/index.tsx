import { YStack, YStackProps } from '@tamagui/stacks'
import { SizableText, SizableTextProps } from '@tamagui/text'

interface SportTeamProps {
	containerProps?: YStackProps
	teamName: string
	textProps?: SizableTextProps
}
function SportTeam({ containerProps, teamName, textProps }: Readonly<SportTeamProps>) {
	return (
		<YStack
			alignItems="center"
			justifyContent="center"
			gap={5}
			{...containerProps}
		>
			{/* <FontAwesome6 name="stroopwafel" size={36} color="black" /> */}
			<SizableText {...textProps}>{teamName}</SizableText>
		</YStack>
	)
}

export default SportTeam
