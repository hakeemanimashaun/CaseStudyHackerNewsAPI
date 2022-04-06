import SQlite from 'react-native-sqlite-storage';

export const database = SQlite.openDatabase(
  {
    name: 'hackerNewsDb',
    location: 'default',
  },
  () => {},
  error => {
    console.log(error);
  },
);

export const createTable = () => {
  database.transaction((tx) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS "
      +"Users"
      +"(ID INTEGER PRIMARY KEY AUTOINCREMENT, email varChar(20), password varChar(20));",
    );
  });
};
