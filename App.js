import { StatusBar } from 'expo-status-bar';
import { TouchableOpacity, StyleSheet, SafeAreaView, useWindowDimensions } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Canvas, LinearGradient, Rect, vec } from '@shopify/react-native-skia';
import { useDerivedValue, useSharedValue } from 'react-native-reanimated';

function getRandomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  
  // Concatenate the values and return the color string
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

export default function App() {

const { width, height } = useWindowDimensions();

const leftColor = useSharedValue('red');
const rightColor = useSharedValue('blue');

const colors = useDerivedValue(() => {
  return [leftColor.value, rightColor.value];
}, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <Canvas style={{ flex: 1 }}>
        <Rect x={0} y={0} width={width} height={height}>
          <LinearGradient
            start={vec(0, 0)}
            end={vec(width, height)}
            colors={colors}
          />
        </Rect>
      </Canvas>
      <TouchableOpacity
        style={styles.buttonContainer} 
        onPress={() => {
          leftColor.value = getRandomColor();
          rightColor.value = getRandomColor();
          console.log("Current values:");
          console.log(leftColor.value);
          console.log(rightColor.value);
        }}>
        <FontAwesome name="random" size={24} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white', // Set background color to ensure button is visible
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 40,
    right: 40,
    height: 65,
    borderRadius: 40,
    aspectRatio: 1,
    zIndex: 10,
    backgroundColor: '#111',
    justifyContent: 'center',
    alignItems: 'center',
  }
});

/*
import { Svg, Circle, LinearGradient, Stop } from 'react-native-svg';
<Svg height="100%" width="100%">
        <LinearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <Stop offset="0%" stopColor="blue" stopOpacity="1" />
          <Stop offset="100%" stopColor="red" stopOpacity="1" />
        </LinearGradient>
        <Circle cx="200" cy="200" r="150" fill="url(#grad)" />
      </Svg>
*/