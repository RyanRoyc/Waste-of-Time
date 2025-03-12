import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface LevelGridProps {
  unlockedLevels: number;
  onLevelSelect: (level: number) => void;
  currentLevel: number;
}

export default function LevelGrid({ unlockedLevels, onLevelSelect, currentLevel }: LevelGridProps) {
  return (
    <View style={styles.grid}>
      {Array.from({ length: 12 }, (_, i) => i + 1).map((level) => (
        <Pressable
          key={level}
          onPress={() => level <= unlockedLevels && onLevelSelect(level)}
          style={[
            styles.levelItem,
            level <= unlockedLevels && styles.unlockedLevel,
            currentLevel === level && styles.currentLevel,
          ]}
        >
          {level <= unlockedLevels ? (
            <MaterialCommunityIcons 
              name="clock-check" 
              size={24} 
              color={currentLevel === level ? '#fff' : '#6366f1'} 
            />
          ) : (
            <MaterialCommunityIcons 
              name="clock-remove" 
              size={24} 
              color="#999" 
            />
          )}
          <Text style={[
            styles.levelText,
            currentLevel === level && styles.currentLevelText,
            level > unlockedLevels && styles.lockedLevelText
          ]}>
            {level}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 12,
    padding: 16,
  },
  levelItem: {
    width: 80,
    height: 80,
    borderRadius: 12,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#e0e0e0',
  },
  unlockedLevel: {
    borderColor: '#6366f1',
  },
  currentLevel: {
    backgroundColor: '#6366f1',
  },
  levelText: {
    marginTop: 4,
    fontSize: 16,
    color: '#666',
    fontWeight: '600',
  },
  currentLevelText: {
    color: '#fff',
  },
  lockedLevelText: {
    color: '#999',
  },
});