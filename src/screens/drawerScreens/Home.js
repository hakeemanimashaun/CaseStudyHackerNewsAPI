import {View, Text, StyleSheet, FlatList, RefreshControl} from 'react-native';
import React, {useState, useEffect, useCallback} from 'react';
import {Button, ActivityIndicator} from 'react-native-paper';
import {database} from '../../data/sqliteStorage/database';
import axios from 'axios';
import {useSelector} from 'react-redux';
import {NewsDisplayComponent} from '../../components/NewsDisplayComponent';
import {CONSTANTS} from '../../utils/contants/CONSTANTS';
import {COLORS} from '../../utils/colors/COLORS';

export default function Home({navigation}) {
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [dbEmail, setDbEmail] = useState('');
  const [news, setNews] = useState([]);
  const [page, setPage] = useState(0);
  const {email, password} = useSelector(state => state.userReducer);

  const getUser = async () => {
    await database.transaction(tx => {
      tx.executeSql('SELECT email, password FROM Users', [], (tx, result) => {
        var len = result.rows.length;
        if (len > 0) {
          let emailSelected = result.rows.item(0).Email;
          let passwordSelected = result.rows.item(0).Password;
          setDbEmail(emailSelected);
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
            console.log(CONSTANTS.deleteMessage);
            alert(CONSTANTS.deleteMessage);
            navigation.navigate('Login');
          },
          error => {
            console.log(error);
            alert(error);
          },
        );
      });
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  const fetchNews = async () => {
    try {
      const url = `${CONSTANTS.hackerNewsURL}${page}`;
      const response = await axios.get(url);
      if (response) {
        setNews(response.data.hits);
        setIsLoading(false);
      }
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    getUser();
    fetchNews();
  }, []);

  const wait = timeout => new Promise(resolve => setTimeout(resolve, timeout));
  const pullToRefresh = useCallback(() => {
    setIsRefreshing(true);
    fetchNews();
    wait(2000).then(() => setIsRefreshing(false));
  },[]);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to HackerNews</Text>
      <Text style={styles.titleName}>{email ? email : dbEmail}</Text>

      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={news}
          onEndReachedThreshold={0.7}
          onEndReached={() => setPage(page + 1)}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={pullToRefresh}
              tintColor={COLORS.white}
            />
          }
          renderItem={({item}) => {
            return (
              <View>
                <NewsDisplayComponent
                  heading={item.title}
                  url={item.url}
                  author={
                    item.author.charAt(0).toUpperCase() + item.author.slice(1)
                  }
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
    fontSize: 25,
    color: COLORS.black,
    fontWeight: 'bold',
  },
  titleName: {
    fontSize: 15,
    color: COLORS.black,
    fontWeight: 'normal',
    fontStyle: 'italic',
  },
  button: {
    marginTop: 5,
    backgroundColor: COLORS.black,
  },
});
