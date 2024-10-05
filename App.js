import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [userInfo, setUserInfo] = useState(null);

  // Função para salvar o objeto JSON no AsyncStorage
  const saveUserInfo = async () => {
    try {
      const user = {
        name: name,
        age: age,
        email: email,
      };
      // Converter o objeto em uma string JSON
      const jsonValue = JSON.stringify(user);
      await AsyncStorage.setItem('@user_info', jsonValue);
      alert('Informações do usuário salvas!');
      loadUserInfo()
    } catch (e) {
      console.log(e);
    }
  };

  // Função para carregar as informações armazenadas no AsyncStorage
  const loadUserInfo = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@user_info');
      if (jsonValue !== null) {
        // Converter a string JSON de volta para objeto
        setUserInfo(JSON.parse(jsonValue));
      }
    } catch (e) {
      console.log(e);
    }
  };

  // Usar useEffect para carregar as informações ao iniciar o aplicativo
  useEffect(() => {
    loadUserInfo();
  }, []);

  return (
    <View style={{ padding: 20 }}>
      {userInfo ? (
        <View>
          <Text>Nome: {userInfo.name}</Text>
          <Text>Idade: {userInfo.age}</Text>
          <Text>Email: {userInfo.email}</Text>
        </View>
      ) : (
        <Text>Nenhuma informação armazenada.</Text>
      )}
      <TextInput
        placeholder="Digite seu nome"
        value={name}
        onChangeText={setName}
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
          marginVertical: 10,
          padding: 10,
        }}
      />
      <TextInput
        placeholder="Digite sua idade"
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
          marginVertical: 10,
          padding: 10,
        }}
      />
      <TextInput
        placeholder="Digite seu e-mail"
        value={email}
        onChangeText={setEmail}
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
          marginVertical: 10,
          padding: 10,
        }}
      />
      <Button title="Salvar Informações" onPress={saveUserInfo} />
    </View>
  );
};

export default App;