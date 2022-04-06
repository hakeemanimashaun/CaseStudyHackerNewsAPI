import {View, Text, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import {TextInput, Button} from 'react-native-paper';
import {database} from '../../data/sqliteStorage/database';
import {createTable} from '../../data/sqliteStorage/database';
import {useSelector, useDispatch} from 'react-redux';
import {setUserEmail, setUserPassword} from '../../data/redux/actions';
import { QUERIES,ERRORS } from '../../utils/contants/CONSTANTS';

export default function Login({navigation}) {
  //redux state
  const {email, password} = useSelector(state => state.userReducer);
  const dispatch = useDispatch();

// executes when page first loads
  useEffect(() => {
    checkData();
    createTable();
  }, []);

  //this function validates in tecxt input and navigates to home if all conditions are passed
  const loginValidation = () => {
    if (!email) {
      alert(ERRORS.emailError);
      return;
    }
    if (!password || isNaN(password)) {
      alert(ERRORS.passwordError);
      return;
    }
    navigateHomeSaveDb();
  };

  // this function handles home navigation and saves data in the database
  const navigateHomeSaveDb = async () => {
    try {
      await database.transaction(async tx => {
        tx.executeSql(
          QUERIES.insertLogin,
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
  
  // this function checks for saved data in the database, if present it navigates to home
  const checkData = async () => {
    await database.transaction(tx => {
      tx.executeSql(QUERIES.selectLogin, [], (tx, result) => {
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
      <Button style={styles.button} mode="contained" onPress={() => navigateHomeSaveDb()}>
        Log-in
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
