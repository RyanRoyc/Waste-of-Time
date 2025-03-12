import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GameButton from '../components/GameButton';
import LevelGrid from '../components/LevelGrid';

const SARCASTIC_MESSAGES = [
  "Wow, you really have nothing better to do?",
  "Congratulations on wasting more time!",
  "Your productivity is plummeting...",
  "Time you'll never get back!",
  "Your parents would be so proud",
  "Achievement Unlocked: Professional Time Waster",
];

export default function HomeScreen() {
  const [unlockedLevels, setUnlockedLevels] = useState(1);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadProgress();
  }, []);

  const loadProgress = async () => {
    try {
      const savedLevel = await AsyncStorage.getItem('unlockedLevels');
      if (savedLevel) {
        setUnlockedLevels(parseInt(savedLevel));
      }
    } catch (error) {
      console.error('Error loading progress:', error);
    }
  };

  const saveProgress = async (level: number) => {
    try {
      await AsyncStorage.setItem('unlockedLevels', level.toString());
    } catch (error) {
      console.error('Error saving progress:', error);
    }
  };

  const handleLevelComplete = () => {
    const randomMessage = SARCASTIC_MESSAGES[Math.floor(Math.random() * SARCASTIC_MESSAGES.length)];
    setMessage(randomMessage);

    if (currentLevel === unlockedLevels && currentLevel < 12) {
      setUnlockedLevels(prev => {
        const newLevel = prev + 1;
        saveProgress(newLevel);
        return newLevel;
      });
    }
  };

  const getRequiredTime = (level: number) => level * 5;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Waste of Time</Text>
      <Text style={styles.subtitle}>Level {currentLevel}</Text>
      <Text style={styles.timeText}>{getRequiredTime(currentLevel)} seconds</Text>
      
      <View style={styles.gameArea}>
        <GameButton
          requiredTime={getRequiredTime(currentLevel)}
          onComplete={handleLevelComplete}
          isActive={true}
        />
      </View>

      {message && <Text style={styles.message}>{message}</Text>}

      <LevelGrid
        unlockedLevels={unlockedLevels}
        onLevelSelect={setCurrentLevel}
        currentLevel={currentLevel}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 60,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    color: '#6366f1',
  },
  subtitle: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 4,
    color: '#666',
  },
  timeText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#999',
    marginBottom: 32,
  },
  gameArea: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    fontStyle: 'italic',
    color: '#666',
    marginBottom: 32,
    paddingHorizontal: 20,
  },
});