import {openDatabase} from "react-native-sqlite-storage";

//SQlite.enablePromise(true);

 export const database = openDatabase(
    {
        name: 'hackerNewsDb',
    }  
) 

export const createTable = () => {
    database.transaction((tx) => {
        tx.executeSql(
            `CREATE TABLE IF NOT EXISTS Users (ID INTEGER PRIMARY KEY AUTOINCREMENT,email TEXT, password INTEGER)`,
            [],
            (sqlTx, res)=>{
                console.log(" table created succesfully")
            },
            error => {console.log("failed:" + error.message)}
        )
    }

    )
}
