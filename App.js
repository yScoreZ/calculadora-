import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function App() {
  const [displayValue, setDisplayValue] = useState('');
  const [operator, setOperator] = useState('');
  let stop = false;

  function clear() {
    setDisplayValue('');
    setOperator('');
  }

  function addNumber(value) {
    if (!stop) {
      if ((value === '.' && displayValue.indexOf('.') === -1) || value !== '.') {
        setDisplayValue(displayValue + value);
      }
    } else {
      if ((value === '.' && displayValue.indexOf('.') === -1) || value !== '.') {
        setDisplayValue('');
        stop = false;
        setOperator('');
        setDisplayValue(displayValue + value);
      }
    }
  }

  function addOperator(op) {
    if (displayValue === '') {
      setDisplayValue('0');
    }

    if (operator === '') {
      setOperator(op);
      setDisplayValue(displayValue + op);
    } else {
      calculateTotal();
      setDisplayValue(displayValue + op);
      setOperator(op);
      stop = false;
    }
  }

  function calculateTotal() {
    if (!stop) {
      const numbers = displayValue.split(operator);

      if (numbers[1] === '') {
        setDisplayValue(displayValue + '0');
        numbers[1] = '0';
      }

      switch (operator) {
        case '+':
          setDisplayValue(`${parseFloat(numbers[0]) + parseFloat(numbers[1])}`);
          break;
        case '-':
          setDisplayValue(`${parseFloat(numbers[0]) - parseFloat(numbers[1])}`);
          break;
        case '*':
          setDisplayValue(`${parseFloat(numbers[0]) * parseFloat(numbers[1])}`);
          break;
        case '/':
          setDisplayValue(`${parseFloat(numbers[0]) / parseFloat(numbers[1])}`);
          break;
      }

      stop = true;
    }
  }

  return (
    <View style={styles.container}>
      {/* DISPLAY */}
      <View style={styles.display}>
        <TextInput
          style={styles.input}
          placeholder="0"
          value={displayValue}
          editable={false}
        />
        <Text style={styles.history}>{''}</Text>
      </View>

      {/* BUTTONS */}
      <View style={styles.row}>
        <TouchableOpacity style={[styles.button, styles.TextAC]} onPress={() => clear()}>
          <Text style={styles.buttonText}>AC</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.gray, styles.SinalBarra]} onPress={() => addOperator('/')}>
          <Text style={styles.buttonTextSinalBarra}>/</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.row}>
        <TouchableOpacity style={styles.button} onPress={() => addNumber('7')}>
          <Text style={styles.buttonText}>7</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => addNumber('8')}>
          <Text style={styles.buttonText}>8</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => addNumber('9')}>
          <Text style={styles.buttonText}>9</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.gray]} onPress={() => addOperator('*')}>
          <Text style={styles.buttonTextSinal}>*</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.row}>
        <TouchableOpacity style={styles.button} onPress={() => addNumber('4')}>
          <Text style={styles.buttonText}>4</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => addNumber('5')}>
          <Text style={styles.buttonText}>5</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => addNumber('6')}>
          <Text style={styles.buttonText}>6</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.gray]} onPress={() => addOperator('-')}>
          <Text style={styles.buttonTextSinal}>-</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.row}>
        <TouchableOpacity style={styles.button} onPress={() => addNumber('1')}>
          <Text style={styles.buttonText}>1</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => addNumber('2')}>
          <Text style={styles.buttonText}>2</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => addNumber('3')}>
          <Text style={styles.buttonText}>3</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.gray]} onPress={() => addOperator('+')}>
          <Text style={styles.buttonTextSinal}>+</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.row}>
        <View />
        <TouchableOpacity style={styles.button} onPress={() => addNumber('.')}>
          <Text style={styles.buttonText}>.</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => addNumber('0')}>
          <Text style={styles.buttonText}>0</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.purple]} onPress={() => calculateTotal()}>
          <Text style={styles.buttonText}>=</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff', // Cor de fundo ajustada
  },
  display: {
    textAlign: 'right',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#ffffff', // Cor de fundo branca
    borderWidth: 0,
    color: '#6d53d6', // Cor do texto preta
    fontSize: 40, // Tamanho do texto
    fontWeight: '400',
    textAlign: 'right',
    width: '100%',
    padding: 25,
    paddingTop: 100,
    paddingBottom: 30,
  },
  clear:{
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  history: {
    color: '#6d53d6',
    fontSize: 15,
    fontWeight: '500',
    height: 18,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
    justifyContent: 'center',
  },
  button: {
    backgroundColor: 'transparent',
    borderRadius: 2,
    color: '#f2f2f2',
    cursor: 'pointer',
    fontSize: 24,
    fontWeight: '500',
    height: 50,
    margin: 2,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  buttonText: {
    color: '#f2f2f2',
    fontSize: 24,
    fontWeight: '500',
  },
  buttonTextSinal: {
    color: '#2f2b39',
    fontSize: 24,
    fontWeight: '500',
  },
  buttonTextClear: {
    color: 'transparent'
  },
  gray: {
    backgroundColor: '#eaeaea',
    color: '#2f2d38',
  },
  purple: {
    backgroundColor: '#5cd928',
    color: '#f2f2f2',
  },

  button: {
    backgroundColor: '#c2c2c2', // Cor de fundo para os botões
    borderRadius: 5, // Bordas arredondadas
    color: '#fff', // Cor do texto
    cursor: 'pointer',
    fontSize: 24,
    fontWeight: '500',
    height: 80, // Ajuste a altura conforme necessário
    margin: 5, // Ajuste a margem conforme necessário
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  
  buttonText: {
    color: '#fff', // Cor do texto
    fontSize: 24,
    fontWeight: '500',
  },
  
  buttonTextSinal: {
    color: '#2f2b39',
    fontSize: 24,
    fontWeight: '500',
  },
  gray: {
    backgroundColor: '#eaeaea',
    color: '#2f2d38',
  },
  
  purple: {
    backgroundColor: '#333333',
    color: '#fff', // Cor do texto
    flex: 2,
  },
  TextAC:{
    flex: 3,
  },
  SinalBarra:{
    flex: 1,
  },
});