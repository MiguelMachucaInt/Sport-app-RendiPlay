import { colors } from '@/assets/colors/styles'
import { mergeStyles } from '@/utils/styles'
import { StyleSheet } from 'react-native'
import { Badge, BadgeText, IBadgeProps } from '../badge'

export interface OurBadgeProps extends IBadgeProps {
    text: string
    active?: boolean
    badgeTextProps?: IBadgeProps
}
function OurBadge({ text, active, badgeTextProps, ...badgeProps }: Readonly<OurBadgeProps>) {
    return (
        <Badge
            variant='outline'
            action='muted'
            {...badgeProps}
            style={mergeStyles(styles.badge, active && styles.active, badgeProps.style)}
        >
            <BadgeText
                {...badgeTextProps}
                style={mergeStyles(active && styles.textActive, badgeTextProps?.style)}
            >
                {text}
            </BadgeText>
        </Badge>
    )
}

const styles = StyleSheet.create({
    badge: {
        borderColor: colors.primary.naranja,
        borderRadius: 10,
        justifyContent: 'center'
    },
    active: {
        backgroundColor: colors.primary.naranja
    },
    textActive: {
        color: 'white'
    }
})

export default OurBadge
