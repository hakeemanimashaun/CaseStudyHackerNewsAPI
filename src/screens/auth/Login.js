import {View, Text, StyleSheet} from 'react-native';
import React, {useState, useEffect} from 'react';
import {TextInput, Button} from 'react-native-paper';
import {database} from '../../data/sqliteStorage/database';
import {createTable} from '../../data/sqliteStorage/database';
import {useSelector, useDispatch} from 'react-redux';
import {setUserEmail, setUserPassword} from '../../data/redux/actions';

export default function Login({navigation}) {
  const {email, password} = useSelector(state => state.userReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    checkData();
    createTable();
  }, []);

  const loginValidation = () => {
    if (!email) {
      alert('Please fill email');
      return;
    }
    if (!password || isNaN(password)) {
      alert('Please enter password digits');
      return;
    }
    navigate();
  };

  const navigate = async () => {
    try {
      await database.transaction(async tx => {
        tx.executeSql(
          'INSERT INTO Users (email, password) VALUES (?,?)',
          [email, password],
          (tx, results) => {
            console.log('Results', results.rowsAffected);
            console.log('Results', email);
          },
        );
      });
      navigation.navigate('Home');
    } catch (error) {
      console.log(error);
    }
  };

  const checkData = async () => {
    await database.transaction(tx => {
      tx.executeSql('SELECT email, password FROM Users', [], (tx, result) => {
        var len = result.rows.length;
        if (len > 0) {
          navigation.navigate('Home');
        }
      });
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        label="Email"
        keyboardType="email-address"
        value={email}
        mode="outlined"
        onChangeText={text => dispatch(setUserEmail(text))}
        placeholder="type email"
      />
      <TextInput
        style={styles.input}
        label="Password"
        keyboardType="visible-password"
        value={password}
        onChangeText={text => dispatch(setUserPassword(text))}
        mode="outlined"
        placeholder="enter password"
      />
      <Button style={styles.button} mode="contained" onPress={() => navigate()}>
        Log-in press
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 10,
  },
  title: {
    textAlign: 'center',
    margin: 10,
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    margin: 10,
  },
  button: {
    margin: 10,
  },
});
