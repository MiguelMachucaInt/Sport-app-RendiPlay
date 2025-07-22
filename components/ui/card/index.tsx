import { mergeStyles } from '@/utils/styles';
import type { VariantProps } from '@gluestack-ui/nativewind-utils';
import React from 'react';
import { View, ViewProps } from 'react-native';
import { cardStyle } from './styles';

type ICardProps = ViewProps &
    VariantProps<typeof cardStyle> & { className?: string };

const Card = React.forwardRef<React.ComponentRef<typeof View>, ICardProps>(
    function Card(
        { className, size = 'md', variant = 'elevated', ...props },
        ref
    ) {
        return (
            <View
                className={cardStyle({ size, variant, class: className })}
                {...props}
                style={mergeStyles(props.style)}
                ref={ref}
            />
        );
    }
);

Card.displayName = 'Card';

/* const styles = StyleSheet.create({
    container: {
        shadowColor: '#000', // Color de la sombra
        shadowOffset: {
            width: 0, // Desplazamiento horizontal
            height: 2, // Desplazamiento vertical
        },
        shadowOpacity: 0.25, // Opacidad de la sombra
        shadowRadius: 3.84, // Radio de la sombra
        elevation: 5, // Elevación para Android
        borderRadius: 10, // Opcional: bordes redondeados
        padding: 10,
    }
}) */

export { Card };
