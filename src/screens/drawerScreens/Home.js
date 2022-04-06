import {View, Text, StyleSheet, FlatList, Linking} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Button, ActivityIndicator} from 'react-native-paper';
import {database} from '../../data/sqliteStorage/database';
import axios from 'axios';
import {useSelector} from 'react-redux';
import {NewsDisplayComponent} from '../../components/NewsDisplayComponent';

export default function Home({navigation}) {
  const [isLoading, setIsLoading] = useState(true);
  const [news, setNews] = useState([]);
  const [page, setPage] = useState(0);
  const {email, password} = useSelector(state => state.userReducer);

  const getUser = async () => {
    await database.transaction(tx => {
      tx.executeSql('SELECT email, password FROM Users', [], (tx, result) => {
        var len = result.rows.length;
        console.log(len);
        console.log(result.rows);
        if (len > 0) {
          let emailSelected = result.rows.item(0).Email;
          let passwordSelected = result.rows.item(0).Password;
          console.log(emailSelected);
          console.log('jhg', passwordSelected);
        }
      });
    });
  };
  const deleteDB = () => {
    try {
      database.transaction(tx => {
        tx.executeSql(
          'DELETE FROM Users',
          [],
          () => {
            console.log('delete successful');
            navigation.navigate('Login');
          },
          error => {
            console.log(error);
          },
        );
      });
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUser = async () => {
    try {
      const url = `https://hn.algolia.com/api/v1/search_by_date?numericFilters=points%3E250&page=${page}`;
      const response = await axios.get(url);
      if (response) {
        // console.log(response.data.hits);
        setNews(response.data.hits);
        setIsLoading(false);
      }
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    getUser();
    fetchUser();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to HackerNews</Text>
      <Text style={styles.title}>{email}</Text>

      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={news}
          onEndReachedThreshold={0.7}
          onEndReached={() => setPage(page + 1)}
          renderItem={({item}) => {
            return (
              <View>
                <NewsDisplayComponent
                  heading={item.title}
                  url={item.url}
                  author={item.author}
                  points={item.points}
                />
              </View>
            );
          }}
        />
      )}

      <Button style={styles.button} mode="contained" onPress={() => deleteDB()}>
        Log-out
      </Button>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  title: {
    fontSize: 20,
  },
  button: {
    marginBottom: 20,
  },
});
