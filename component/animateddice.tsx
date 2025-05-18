import React, { useEffect } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Canvas, Circle, Group } from '@shopify/react-native-skia';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  withRepeat,
  Easing,
} from 'react-native-reanimated';

interface AnimatedDiceProps {
  value: number;
  size?: number;
  onPress: () => void;
}

const AnimatedDice: React.FC<AnimatedDiceProps> = ({ value, size = 100, onPress }) => {
  const rotation = useSharedValue(0);
  const scale = useSharedValue(1);

  useEffect(() => {
    rotation.value = withRepeat(withTiming(360, { duration: 500 }), 1, true);
    scale.value = withTiming(1.2, { duration: 250 }, () => {
      scale.value = withTiming(1, { duration: 250 });
    });
  }, [value]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { rotate: `${rotation.value}deg` },
        { scale: scale.value },
      ],
    };
  });

  const dotPositions = [
    [],
    [[0.5, 0.5]],
    [[0.3, 0.3], [0.7, 0.7]],
    [[0.3, 0.3], [0.5, 0.5], [0.7, 0.7]],
    [[0.3, 0.3], [0.3, 0.7], [0.7, 0.3], [0.7, 0.7]],
    [[0.3, 0.3], [0.3, 0.7], [0.5, 0.5], [0.7, 0.3], [0.7, 0.7]],
    [[0.3, 0.3], [0.3, 0.5], [0.3, 0.7], [0.7, 0.3], [0.7, 0.5], [0.7, 0.7]],
  ];

  return (
    <TouchableOpacity onPress={onPress}>
      <Animated.View style={[styles.container, { width: size, height: size }, animatedStyle]}>
        <Canvas style={{ flex: 1 }}>
          <Group>
            {/* Dice body */}
            <Circle r={size / 2} cx={size / 2} cy={size / 2} color="white" />
            {/* Dice outline */}
            <Circle r={size / 2} cx={size / 2} cy={size / 2} color="black" style="stroke" strokeWidth={2} />
            {/* Dice dots */}
            {dotPositions[value - 1].map((pos, index) => (
              <Circle
                key={index}
                r={size * 0.08}
                cx={pos[0] * size}
                cy={pos[1] * size}
                color="black"
              />
            ))}
          </Group>
        </Canvas>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AnimatedDice;