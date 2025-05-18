/*import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface CounterButtonProps {
  onChange: (count: number) => void;
}

const CounterButton: React.FC<CounterButtonProps> = ({ onChange }) => {
  const [count, setCount] = useState(1);

  const increase = () => {
    const newCount = count + 1;
    setCount(newCount);
    onChange(newCount);
  };

  const decrease = () => {
    const newCount = count > 1 ? count - 1 : 1;
    setCount(newCount);
    onChange(newCount);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={decrease}>
        <Text style={styles.buttonText}>-</Text>
      </TouchableOpacity>
      <Text style={styles.count}>{count}</Text>
      <TouchableOpacity style={styles.button} onPress={increase}>
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#ddd',
    padding: 10,
    marginHorizontal: 10,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 20,
    color: '#333',
  },
  count: {
    fontSize: 20,
  },
});

export default CounterButton;
*/
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface CounterButtonProps {
  onChange: (count: number) => void;
  initialCount?: number;
  minCount?: number;
  maxCount?: number;
}

const CounterButton: React.FC<CounterButtonProps> = ({ 
  onChange, 
  initialCount = 1,
  minCount = 1,
  maxCount = 4
}) => {
  const [count, setCount] = useState(initialCount);

  const increase = () => {
    if (count < maxCount) {
      const newCount = count + 1;
      setCount(newCount);
      onChange(newCount);
    }
  };

  const decrease = () => {
    if (count > minCount) {
      const newCount = count - 1;
      setCount(newCount);
      onChange(newCount);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={[styles.button, count <= minCount && styles.buttonDisabled]} 
        onPress={decrease}
        disabled={count <= minCount}
      >
        <Text style={styles.buttonText}>-</Text>
      </TouchableOpacity>
      <Text style={styles.count}>{count}</Text>
      <TouchableOpacity 
        style={[styles.button, count >= maxCount && styles.buttonDisabled]} 
        onPress={increase}
        disabled={count >= maxCount}
      >
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 12,
    marginHorizontal: 15,
    borderRadius: 8,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#ddd',
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  count: {
    fontSize: 24,
    fontWeight: 'bold',
    minWidth: 40,
    textAlign: 'center',
  },
});

export default CounterButton;

