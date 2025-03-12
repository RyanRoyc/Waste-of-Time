import React, { useState, useEffect } from 'react';
import { View, Pressable, Animated, StyleSheet } from 'react-native';

interface GameButtonProps {
  requiredTime: number;
  onComplete: () => void;
  isActive: boolean;
}

export default function GameButton({ requiredTime, onComplete, isActive }: GameButtonProps) {
  const [pressing, setPressing] = useState(false);
  const [progress] = useState(new Animated.Value(0));
  
  useEffect(() => {
    if (pressing && isActive) {
      progress.setValue(0);
      Animated.timing(progress, {
        toValue: 1,
        duration: requiredTime * 1000,
        useNativeDriver: false,
      }).start(({ finished }) => {
        if (finished) {
          onComplete();
        }
      });
    } else {
      progress.stopAnimation();
      progress.setValue(0);
    }
  }, [pressing, isActive]);

  const progressInterpolation = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={styles.container}>
      <Pressable
        onPressIn={() => setPressing(true)}
        onPressOut={() => setPressing(false)}
        style={[
          styles.button,
          pressing && styles.buttonPressed,
          !isActive && styles.buttonDisabled
        ]}
        disabled={!isActive}
      >
        <Animated.View
          style={[
            styles.progress,
            {
              width: progressInterpolation,
            },
          ]}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#f0f0f0',
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonPressed: {
    transform: [{ scale: 0.95 }],
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  progress: {
    position: 'absolute',
    height: '100%',
    backgroundColor: '#6366f1',
    opacity: 0.3,
  },
});