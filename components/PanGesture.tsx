import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

const WINDOW_WIDTH = Dimensions.get('window').width;

const SIZE = 100;
const CIRCLE_RADIUS = WINDOW_WIDTH / 2 - 10;

const PanGesture: React.FC = () => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const initialTranslateX = useSharedValue(0);
  const initialTranslateY = useSharedValue(0);

  const panGesture = Gesture.Pan()
    .onStart(() => {
      initialTranslateX.value = translateX.value;
      initialTranslateY.value = translateY.value;
    })
    .onUpdate((event) => {
      translateX.value = initialTranslateX.value + event.translationX;
      translateY.value = initialTranslateY.value + event.translationY;
    })
    .onEnd(() => {
      const distance = Math.sqrt(translateX.value ** 2 + translateY.value ** 2);

      if (distance > CIRCLE_RADIUS) {
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
      }
    });

  const reanimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }, { translateY: translateY.value }],
    };
  });

  const gesture = Gesture.Exclusive(panGesture);

  return (
    <GestureHandlerRootView>
      <View style={style.container}>
        <View style={style.bigBircle}>
          <GestureDetector gesture={gesture}>
            <Animated.View style={[style.smallCircle, reanimatedStyle]}></Animated.View>
          </GestureDetector>
        </View>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({});

export default PanGesture;

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  smallCircle: {
    width: SIZE,
    height: SIZE,
    backgroundColor: 'rgba(255,99,71, 0.7)',
    borderRadius: 50,
  },
  bigBircle: {
    width: CIRCLE_RADIUS * 2,
    height: CIRCLE_RADIUS * 2,
    backgroundColor: 'rgba(255,99,71, 0.1)',
    borderRadius: CIRCLE_RADIUS,
    borderWidth: 3,
    borderColor: 'rgba(255,99,71, 0.7)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
