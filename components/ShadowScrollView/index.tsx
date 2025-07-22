import { LinearGradient } from 'expo-linear-gradient';
import React, { useRef, useState } from 'react';
import {
    Animated,
    LayoutChangeEvent,
    NativeScrollEvent,
    NativeSyntheticEvent,
    ScrollView,
    ScrollViewProps,
    StyleProp,
    StyleSheet,
    View,
    ViewStyle
} from 'react-native';

interface ShadowScrollViewProps extends ScrollViewProps {
    shadowColor?: string;
    containerStyles?: StyleProp<ViewStyle>;
}

export const ShadowScrollView: React.FC<ShadowScrollViewProps> = ({
    children,
    horizontal = false,
    style,
    contentContainerStyle,
    shadowColor = '#00000033',
    containerStyles,
    ...restProps
}) => {
    const [offsetStart, setOffsetStart] = useState(0);
    const [offsetEnd, setOffsetEnd] = useState(0);

    const [shadowsEnabled, setShadowsEnabled] = useState(false);

    const showStartShadow = useRef(new Animated.Value(0)).current;
    const showEndShadow = useRef(new Animated.Value(0)).current;

    const scrollViewSize = useRef(0);
    const scrollContentSize = useRef(0);

    const animateOpacity = (animatedValue: Animated.Value, toValue: number) => {
        Animated.timing(animatedValue, {
            toValue,
            duration: 100,
            useNativeDriver: true,
        }).start();
    };

    const updateShadowsFromOffset = (offset: number, visibleSize: number, totalSize: number) => {
        const atStart = offset <= 0;
        const atEnd = offset + visibleSize >= totalSize - 1;

        animateOpacity(showStartShadow, atStart ? 0 : 1);
        animateOpacity(showEndShadow, atEnd ? 0 : 1);
    };

    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const { contentOffset, layoutMeasurement, contentSize } = event.nativeEvent;
        const offset = horizontal ? contentOffset.x : contentOffset.y;
        const visibleSize = horizontal ? layoutMeasurement.width : layoutMeasurement.height;
        const totalSize = horizontal ? contentSize.width : contentSize.height;

        updateShadowsFromOffset(offset, visibleSize, totalSize);
    };

    const onLayoutScroll = (e: LayoutChangeEvent) => {
        const size = horizontal ? e.nativeEvent.layout.width : e.nativeEvent.layout.height;
        scrollViewSize.current = size;
        updateShadowsAndOffsets();
    };

    const onContentSizeChange = (w: number, h: number) => {
        const size = horizontal ? w : h;
        scrollContentSize.current = size;
        updateShadowsAndOffsets();
    };

    const updateShadowsAndOffsets = () => {
        const container = scrollViewSize.current;
        const content = scrollContentSize.current;

        const hasScroll = content > container;

        setShadowsEnabled(hasScroll);

        if (!hasScroll) {
            const margin = (container - content) / 2;
            setOffsetStart(margin);
            setOffsetEnd(margin);
            animateOpacity(showStartShadow, 0);
            animateOpacity(showEndShadow, 0);
        } else {
            setOffsetStart(0);
            setOffsetEnd(0);
            updateShadowsFromOffset(0, container, content); // ⚠️ fuerza evaluación inicial correcta
        }
    };

    const shadowStyle: ViewStyle = horizontal
        ? styles.horizontalShadow
        : styles.verticalShadow;

    return (
        <View
            style={[
                styles.wrapper,
                containerStyles,
                { flexDirection: horizontal ? 'row' : 'column' },
            ]}
        >
            {shadowsEnabled && (
                <Animated.View
                    style={[
                        shadowStyle,
                        {
                            opacity: showStartShadow,
                            ...(horizontal ? { left: offsetStart } : { top: offsetStart }),
                        },
                    ]}
                    pointerEvents="none"
                >
                    <LinearGradient
                        colors={[shadowColor, 'transparent']}
                        style={StyleSheet.absoluteFill}
                        start={{ x: 0, y: 0 }}
                        end={horizontal ? { x: 1, y: 0 } : { x: 0, y: 1 }}
                    />
                </Animated.View>
            )}

            <ScrollView
                horizontal={horizontal}
                style={[styles.scroll, style]}
                contentContainerStyle={contentContainerStyle}
                onScroll={handleScroll}
                onLayout={onLayoutScroll}
                onContentSizeChange={onContentSizeChange}
                scrollEventThrottle={16}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                {...restProps}
            >
                {children}
            </ScrollView>

            {shadowsEnabled && (
                <Animated.View
                    style={[
                        shadowStyle,
                        {
                            opacity: showEndShadow,
                            ...(horizontal ? { right: offsetEnd } : { bottom: offsetEnd }),
                        },
                    ]}
                    pointerEvents="none"
                >
                    <LinearGradient
                        colors={['transparent', shadowColor]}
                        style={StyleSheet.absoluteFill}
                        start={{ x: 0, y: 0 }}
                        end={horizontal ? { x: 1, y: 0 } : { x: 0, y: 1 }}
                    />
                </Animated.View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        position: 'relative'
    },
    scroll: {
        flexGrow: 0,
    },
    horizontalShadow: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        width: 15,
        zIndex: 10,
    },
    verticalShadow: {
        position: 'absolute',
        left: 0,
        right: 0,
        height: 15,
        zIndex: 10,
    },
});
